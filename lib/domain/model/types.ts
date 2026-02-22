/**
 * DSL minimal pour les conditions de règles RGIE.
 * Évalué par un interpréteur pur — pas d'eval(), pas de Function().
 */

export type Operator = "EQ" | "NE" | "GT" | "GTE" | "LT" | "LTE" | "IN" | "NOT_IN";

export type LeafExpr = {
  op: Operator;
  /** Chemin vers la donnée dans DiagnosticInput (ex: "sdb_presente") */
  path: string;
  value: unknown;
};

export type AndExpr = {
  op: "AND";
  exprs: Expr[];
};

export type OrExpr = {
  op: "OR";
  exprs: Expr[];
};

export type NotExpr = {
  op: "NOT";
  expr: Expr;
};

export type Expr = LeafExpr | AndExpr | OrExpr | NotExpr;
