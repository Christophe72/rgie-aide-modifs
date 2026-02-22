import type { Expr } from "./types";

export type RuleLevel = "BLOQUANT" | "MAJEUR" | "AVERTISSEMENT";

export type Regle = {
  code: string;
  titre: string;
  /** Fenêtre de validité temporelle — absent = toujours applicable */
  applicable?: {
    from?: string; // ISO date string inclus
    to?: string;   // ISO date string exclus
  };
  /** Condition DSL — vraie ⟹ non-conformité */
  if: Expr;
  niveau: RuleLevel;
  message: string;
  correction?: string;
  tags?: string[];
};

export type RuleSet = {
  version: string;
  rules: Regle[];
};
