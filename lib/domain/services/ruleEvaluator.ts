import type { Expr, LeafExpr } from "../model/types";
import type { Regle, RuleSet } from "../model/rgie";
import type { DiagnosticInput, NonConformite } from "../model/diagnostic";

// ─── Accès données ────────────────────────────────────────────────────────────

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current !== null && current !== undefined && typeof current === "object") {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

// ─── Évaluateur feuille ───────────────────────────────────────────────────────

function evalLeaf(expr: LeafExpr, data: Record<string, unknown>): boolean {
  const val = getNestedValue(data, expr.path);

  // Champ absent ou null ⟹ règle non déclenchée
  if (val === undefined || val === null) return false;

  switch (expr.op) {
    case "EQ":     return val === expr.value;
    case "NE":     return val !== expr.value;
    case "GT":     return typeof val === "number" && typeof expr.value === "number" && val > expr.value;
    case "GTE":    return typeof val === "number" && typeof expr.value === "number" && val >= expr.value;
    case "LT":     return typeof val === "number" && typeof expr.value === "number" && val < expr.value;
    case "LTE":    return typeof val === "number" && typeof expr.value === "number" && val <= expr.value;
    case "IN":     return Array.isArray(expr.value) && (expr.value as unknown[]).includes(val);
    case "NOT_IN": return Array.isArray(expr.value) && !(expr.value as unknown[]).includes(val);
    default:       return false;
  }
}

// ─── Évaluateur arbre ────────────────────────────────────────────────────────

function evalExpr(expr: Expr, data: Record<string, unknown>): boolean {
  switch (expr.op) {
    case "AND": return (expr as { op: "AND"; exprs: Expr[] }).exprs.every(e => evalExpr(e, data));
    case "OR":  return (expr as { op: "OR"; exprs: Expr[] }).exprs.some(e => evalExpr(e, data));
    case "NOT": return !evalExpr((expr as { op: "NOT"; expr: Expr }).expr, data);
    default:    return evalLeaf(expr as LeafExpr, data);
  }
}

// ─── Applicabilité temporelle ─────────────────────────────────────────────────

function isRuleApplicable(regle: Regle, date: Date): boolean {
  if (!regle.applicable) return true;
  const { from, to } = regle.applicable;
  if (from && date < new Date(from)) return false;
  if (to   && date >= new Date(to))  return false;
  return true;
}

// ─── Point d'entrée public ────────────────────────────────────────────────────

/**
 * Évalue toutes les règles du RuleSet applicables à la date de réalisation.
 * Retourne la liste des non-conformités détectées.
 * Aucun eval(), aucune exécution dynamique.
 */
export function evaluateRules(
  ruleSet: RuleSet,
  input: DiagnosticInput,
): NonConformite[] {
  const date = new Date(input.date_realisation);
  const data = input as unknown as Record<string, unknown>;
  const nonConformites: NonConformite[] = [];

  for (const regle of ruleSet.rules) {
    if (!isRuleApplicable(regle, date)) continue;

    try {
      if (evalExpr(regle.if, data)) {
        nonConformites.push({
          code:       regle.code,
          niveau:     regle.niveau,
          message:    regle.message,
          correction: regle.correction,
        });
      }
    } catch {
      // Règle mal formée → ignorée silencieusement (pas de crash)
    }
  }

  return nonConformites;
}
