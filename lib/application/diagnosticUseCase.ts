import type { RuleRepository, HypothesisRepository, QuestionRepository } from "./ports";
import type { DiagnosticInput, DiagnosticOutput, ActionCorrection } from "../domain/model/diagnostic";
import { evaluateRules }         from "../domain/services/ruleEvaluator";
import { DefaultScoringPolicy }  from "../domain/services/scoringPolicy";
import { DefaultRiskPolicy }     from "../domain/services/riskPolicy";
import { scoreHypotheses, generateNextQuestions } from "../domain/services/diagnosisEngine";

/**
 * Use Case principal — orchestration pure.
 * Ne connaît pas Next.js, ni JSON, ni filesystem.
 *
 * Étapes :
 *  1. Valider l'entrée (date obligatoire)
 *  2. Charger RuleSet + Hypothèses + Questions via ports
 *  3. Évaluer les règles applicables → non_conformites[]
 *  4. Calculer score conformité + risque global
 *  5. Scorer les hypothèses, extraire top 3
 *  6. Générer questions suivantes (déduplication, max 5)
 *  7. Assembler plan de correction (RGIE bloquants → majeurs → diagnostic)
 *  8. Retourner DiagnosticOutput
 */
export class DiagnosticUseCase {
  private readonly scoring = new DefaultScoringPolicy();
  private readonly risk    = new DefaultRiskPolicy();

  constructor(
    private readonly ruleRepo:       RuleRepository,
    private readonly hypothesisRepo: HypothesisRepository,
    private readonly questionRepo:   QuestionRepository,
  ) {}

  async execute(input: DiagnosticInput): Promise<DiagnosticOutput> {
    // 1. Validation minimale
    if (!input.date_realisation) {
      throw new Error("date_realisation est obligatoire (format ISO : YYYY-MM-DD)");
    }

    // 2. Chargement parallèle des référentiels
    const [ruleSet, hypotheses, questionBank] = await Promise.all([
      this.ruleRepo.getRuleSet(),
      this.hypothesisRepo.getHypotheses(),
      this.questionRepo.getQuestionBank(),
    ]);

    // 3. Évaluation des règles
    const nonConformites = evaluateRules(ruleSet, input);

    // 4. Score + risque
    const score_conformite = this.scoring.compute(nonConformites);
    const risque           = this.risk.compute(nonConformites);
    const resultat_global: DiagnosticOutput["resultat_global"] =
      nonConformites.some(nc => nc.niveau === "BLOQUANT") || score_conformite < 60
        ? "NON_CONFORME"
        : "CONFORME";

    // 5. Diagnostic hypothèses
    const top_causes_probables = scoreHypotheses(hypotheses, nonConformites, input);

    // 6. Questions suivantes
    const questions_suivantes = generateNextQuestions(
      top_causes_probables,
      hypotheses,
      questionBank,
    );

    // 7. Plan de correction
    const plan_correction: ActionCorrection[] = [];
    let priorite = 1;

    // RGIE — bloquants en premier (danger immédiat)
    for (const nc of nonConformites.filter(nc => nc.niveau === "BLOQUANT")) {
      if (nc.correction) {
        plan_correction.push({
          priorite: priorite++,
          action:   nc.correction,
          origine:  "RGIE",
          refs:     [nc.code],
        });
      }
    }

    // RGIE — majeurs
    for (const nc of nonConformites.filter(nc => nc.niveau === "MAJEUR")) {
      if (nc.correction) {
        plan_correction.push({
          priorite: priorite++,
          action:   nc.correction,
          origine:  "RGIE",
          refs:     [nc.code],
        });
      }
    }

    // Diagnostic — 1-2 corrections par hypothèse active
    const hypMap = new Map(hypotheses.map(h => [h.id, h]));
    for (const cause of top_causes_probables) {
      const hyp = hypMap.get(cause.hypothese_id);
      if (!hyp) continue;
      for (const correction of hyp.corrections.slice().sort((a, b) => a.priorite - b.priorite).slice(0, 2)) {
        plan_correction.push({
          priorite: priorite++,
          action:   correction.action,
          origine:  "DIAGNOSTIC",
          refs:     [cause.hypothese_id],
        });
      }
    }

    return {
      resultat_global,
      score_conformite,
      risque,
      non_conformites:       nonConformites,
      top_causes_probables,
      questions_suivantes,
      plan_correction,
    };
  }
}
