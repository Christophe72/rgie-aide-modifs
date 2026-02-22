import type { Hypothese, Question, CauseProbable, QuestionSuivante, NonConformite, DiagnosticInput } from "../model/diagnostic";

// ─── Scoring probabiliste ─────────────────────────────────────────────────────

/** Fonction sigmoïde : mappe un score brut en probabilité 0..1 */
function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

/**
 * Score chaque hypothèse selon :
 *   - les erreurs RGIE déclenchées (poids_erreur)
 *   - les symptômes présents dans l'input (poids_symptome)
 *   - les tags de règles correspondants (poids_tag — extensible)
 *
 * Probabilité = sigmoid(score_brut − seuil_activation)
 * Retourne le top-3 avec probabilité ≥ 0.35, trié par score décroissant.
 */
export function scoreHypotheses(
  hypotheses: Hypothese[],
  nonConformites: NonConformite[],
  input: DiagnosticInput,
): CauseProbable[] {
  const erreurCodes = new Set(nonConformites.map(nc => nc.code));
  const symptomes   = new Set(input.symptomes ?? []);

  const scored = hypotheses.map(hyp => {
    const poids_erreur   = hyp.scoring.poids_erreur   ?? 3;
    const poids_symptome = hyp.scoring.poids_symptome ?? 2;
    const poids_tag      = hyp.scoring.poids_tag      ?? 1;
    const seuil          = hyp.scoring.seuil_activation ?? 2;

    let score = 0;

    for (const code of hyp.declencheurs.erreurs_rg ?? []) {
      if (erreurCodes.has(code)) score += poids_erreur;
    }

    for (const symptome of hyp.declencheurs.symptomes ?? []) {
      if (symptomes.has(symptome)) score += poids_symptome;
    }

    // Tags : extension future (ex: associer tags de règles aux hypothèses)
    void poids_tag; // déclaré dans la spec, réservé pour extension

    const probabilite = sigmoid(score - seuil);
    return { hyp, score, probabilite };
  });

  return scored
    .filter(s => s.probabilite >= 0.35)
    .sort((a, b) => b.probabilite - a.probabilite)
    .slice(0, 3)
    .map(s => ({
      hypothese_id:      s.hyp.id,
      probabilite:       Math.round(s.probabilite * 1000) / 1000,
      resume:            s.hyp.titre,
      actions_immediates: s.hyp.corrections
        .slice()
        .sort((a, b) => a.priorite - b.priorite)
        .slice(0, 2)
        .map(c => c.action),
    }));
}

// ─── Génération de questions ──────────────────────────────────────────────────

/**
 * Génère les questions suivantes à partir des hypothèses actives.
 * Déduplique et limite à maxQuestions (défaut 5).
 */
export function generateNextQuestions(
  topCauses: CauseProbable[],
  hypotheses: Hypothese[],
  questionBank: Record<string, Question>,
  maxQuestions = 5,
): QuestionSuivante[] {
  const seen      = new Set<string>();
  const questions: QuestionSuivante[] = [];
  const hypMap    = new Map(hypotheses.map(h => [h.id, h]));

  for (const cause of topCauses) {
    const hyp = hypMap.get(cause.hypothese_id);
    if (!hyp) continue;

    for (const qId of hyp.questions) {
      if (seen.has(qId)) continue;
      const q = questionBank[qId];
      if (!q) continue;

      seen.add(qId);
      questions.push({ id: q.id, texte: q.texte, type: q.type, choix: q.choix });

      if (questions.length >= maxQuestions) return questions;
    }
  }

  return questions;
}
