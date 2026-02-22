/**
 * POST /api/rgie/diagnostic
 *
 * ─── EXEMPLE DE REQUÊTE ──────────────────────────────────────────────────────
 *
 * POST /api/rgie/diagnostic
 * Content-Type: application/json
 *
 * {
 *   "date_realisation": "2025-06-01",
 *   "terre_resistance_ohm": 45,
 *   "diff_general_present": true,
 *   "diff_general_mA": 300,
 *   "nombre_diff_30mA": 2,
 *   "sdb_presente": true,
 *   "sdb_protegee_30mA": false,
 *   "sdb_equipotentielle_ok": false,
 *   "max_prises_par_circuit": 10,
 *   "section_min_detectee_mm2": 1.5,
 *   "disjoncteur_max_detecte_A": 20,
 *   "borne_ve_presente": false,
 *   "symptomes": ["diff_declenche", "odeur_brule"]
 * }
 *
 * ─── EXEMPLE DE RÉPONSE ──────────────────────────────────────────────────────
 *
 * HTTP 200 OK
 * {
 *   "resultat_global": "NON_CONFORME",
 *   "score_conformite": 52,
 *   "risque": "ELEVÉ",
 *   "non_conformites": [
 *     {
 *       "code": "CABLE-001",
 *       "niveau": "BLOQUANT",
 *       "message": "Un câble de section 1,5 mm² est protégé par un disjoncteur de calibre supérieur à 16 A — risque d'incendie...",
 *       "correction": "Remplacer le disjoncteur par un 16 A maximum, ou recâbler en 2,5 mm²..."
 *     },
 *     {
 *       "code": "SDB-030-2025",
 *       "niveau": "BLOQUANT",
 *       "message": "La salle de bains doit être protégée par un différentiel 30mA dédié...",
 *       "correction": "Installer un différentiel 30mA dédié pour le circuit salle de bains."
 *     },
 *     {
 *       "code": "SDB-EQUI-001",
 *       "niveau": "MAJEUR",
 *       "message": "La liaison équipotentielle supplémentaire (LES) de la salle de bains est absente...",
 *       "correction": "Réaliser la LES en raccordant toutes les masses métalliques..."
 *     },
 *     {
 *       "code": "TERRE-001",
 *       "niveau": "MAJEUR",
 *       "message": "La résistance de terre dépasse 30 Ω...",
 *       "correction": "Améliorer la prise de terre jusqu'à ≤ 30 Ω..."
 *     },
 *     {
 *       "code": "PRISES-2023",
 *       "niveau": "MAJEUR",
 *       "message": "Plus de 8 prises de courant sont raccordées sur un même circuit...",
 *       "correction": "Diviser le circuit en plusieurs circuits de 8 prises maximum..."
 *     }
 *   ],
 *   "top_causes_probables": [
 *     {
 *       "hypothese_id": "HYP-DIFF-001",
 *       "probabilite": 0.953,
 *       "resume": "Fuite à la terre probable (déclenchements intempestifs du différentiel)",
 *       "actions_immediates": [
 *         "Identifier et isoler le circuit défaillant (test arc par arc...)",
 *         "Vérifier les appareils branchés pour défaut d'isolement"
 *       ]
 *     },
 *     {
 *       "hypothese_id": "HYP-SDB-001",
 *       "probabilite": 0.731,
 *       "resume": "Non-conformité salle de bains (30 mA / équipotentialité absente)",
 *       "actions_immediates": [
 *         "Installer un différentiel 30 mA dédié pour le circuit salle de bains",
 *         "Réaliser la liaison équipotentielle supplémentaire (LES)..."
 *       ]
 *     }
 *   ],
 *   "questions_suivantes": [
 *     { "id": "Q_DIFF_01", "texte": "Le différentiel déclenche-t-il immédiatement à la mise sous tension ?", "type": "OUI_NON" },
 *     { "id": "Q_DIFF_02", "texte": "Le déclenchement se produit-il lorsqu'un appareil spécifique est branché ?", "type": "OUI_NON" },
 *     { "id": "Q_TERRE_01", "texte": "Quel est le type de prise de terre installée ?", "type": "CHOIX", "choix": ["Boucle en fond de fouille", "Piquet(s) de terre", "Inconnu"] },
 *     { "id": "Q_SDB_01", "texte": "La salle de bains est-elle protégée par un différentiel 30 mA dédié ?", "type": "OUI_NON" }
 *   ],
 *   "plan_correction": [
 *     { "priorite": 1, "action": "Remplacer le disjoncteur par un 16 A maximum...", "origine": "RGIE", "refs": ["CABLE-001"] },
 *     { "priorite": 2, "action": "Installer un différentiel 30mA dédié pour le circuit salle de bains.", "origine": "RGIE", "refs": ["SDB-030-2025"] },
 *     { "priorite": 3, "action": "Réaliser la LES en raccordant toutes les masses métalliques...", "origine": "RGIE", "refs": ["SDB-EQUI-001"] },
 *     { "priorite": 4, "action": "Améliorer la prise de terre jusqu'à ≤ 30 Ω...", "origine": "RGIE", "refs": ["TERRE-001"] },
 *     { "priorite": 5, "action": "Diviser le circuit en plusieurs circuits de 8 prises maximum...", "origine": "RGIE", "refs": ["PRISES-2023"] },
 *     { "priorite": 6, "action": "Identifier et isoler le circuit défaillant...", "origine": "DIAGNOSTIC", "refs": ["HYP-DIFF-001"] },
 *     { "priorite": 7, "action": "Vérifier les appareils branchés pour défaut d'isolement", "origine": "DIAGNOSTIC", "refs": ["HYP-DIFF-001"] }
 *   ]
 * }
 *
 * ─── ERREUR 400 ──────────────────────────────────────────────────────────────
 *
 * { "error": "date_realisation est obligatoire (format ISO : YYYY-MM-DD)" }
 */

import { type NextRequest, NextResponse } from "next/server";
import type { DiagnosticInput } from "@/lib/domain/model/diagnostic";
import { createDiagnosticUseCase } from "@/lib/infrastructure/nextApiAdapter";

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de la requête invalide — JSON attendu" },
      { status: 400 },
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("date_realisation" in body) ||
    typeof (body as Record<string, unknown>).date_realisation !== "string"
  ) {
    return NextResponse.json(
      { error: "date_realisation est obligatoire (format ISO : YYYY-MM-DD)" },
      { status: 400 },
    );
  }

  try {
    const input   = body as DiagnosticInput;
    const useCase = createDiagnosticUseCase();
    const result  = await useCase.execute(input);

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur interne du moteur RGIE";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
