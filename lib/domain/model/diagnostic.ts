// ─── Entrée (formulaire intelligent 10 questions) ────────────────────────────

export type DiagnosticInput = {
  date_realisation: string; // ISO obligatoire

  terre_resistance_ohm?: number;
  type_prise_terre?: "BOUCLE_FOUILLE" | "PIQUETS" | "INCONNU";

  diff_general_present?: boolean;
  diff_general_mA?: number;
  nombre_diff_30mA?: number;

  sdb_presente?: boolean;
  sdb_protegee_30mA?: boolean;
  sdb_equipotentielle_ok?: boolean;

  max_prises_par_circuit?: number;
  section_min_detectee_mm2?: number;
  disjoncteur_max_detecte_A?: number;

  borne_ve_presente?: boolean;
  type_diff_borne?: "A" | "B" | "AC" | "INCONNU";

  symptomes?: string[]; // ex: ["diff_declenche", "odeur_brule"]
};

// ─── Sortie (contrat stable) ──────────────────────────────────────────────────

export type NonConformite = {
  code: string;
  niveau: "BLOQUANT" | "MAJEUR" | "AVERTISSEMENT";
  message: string;
  correction?: string;
};

export type CauseProbable = {
  hypothese_id: string;
  probabilite: number; // 0..1
  resume: string;
  actions_immediates: string[];
};

export type QuestionSuivante = {
  id: string;
  texte: string;
  type: "OUI_NON" | "CHOIX" | "TEXTE";
  choix?: string[];
};

export type ActionCorrection = {
  priorite: number;
  action: string;
  origine: "RGIE" | "DIAGNOSTIC";
  refs?: string[];
};

export type DiagnosticOutput = {
  resultat_global: "CONFORME" | "NON_CONFORME";
  score_conformite: number; // 0..100
  risque: "FAIBLE" | "MOYEN" | "ELEVÉ" | "CRITIQUE";
  non_conformites: NonConformite[];
  top_causes_probables: CauseProbable[];
  questions_suivantes: QuestionSuivante[];
  plan_correction: ActionCorrection[];
};

// ─── Knowledge Base ───────────────────────────────────────────────────────────

export type Hypothese = {
  id: string;
  titre: string;
  gravite: "FAIBLE" | "MOYEN" | "ELEVÉ" | "CRITIQUE";
  risque: string[];

  declencheurs: {
    erreurs_rg?: string[];   // codes de règles RGIE
    symptomes?: string[];    // identifiants symptômes
    tags?: string[];         // tags de règles
  };

  scoring: {
    poids_erreur?: number;     // défaut 3
    poids_symptome?: number;   // défaut 2
    poids_tag?: number;        // défaut 1
    seuil_activation?: number; // défaut 2
  };

  questions: string[];         // IDs -> question_bank
  verifications: Array<{ action: string; cible: string; attendu?: string }>;
  corrections: Array<{ action: string; priorite: number }>;
};

export type Question = {
  id: string;
  texte: string;
  type: "OUI_NON" | "CHOIX" | "TEXTE";
  choix?: string[];
};
