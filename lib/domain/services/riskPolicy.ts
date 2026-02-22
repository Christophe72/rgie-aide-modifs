import type { NonConformite } from "../model/diagnostic";

export type RiskLevel = "FAIBLE" | "MOYEN" | "ELEVÉ" | "CRITIQUE";

// ─── Port Strategy ────────────────────────────────────────────────────────────

export interface RiskPolicy {
  compute(nonConformites: NonConformite[]): RiskLevel;
}

// ─── Politique par défaut ─────────────────────────────────────────────────────

/**
 * ≥2 bloquants → CRITIQUE
 *  1 bloquant  → ELEVÉ
 * ≥2 majeurs   → MOYEN
 *  sinon       → FAIBLE
 *
 * Aligné "chantier" : un bloquant = danger immédiat ou conformité impossible.
 */
export class DefaultRiskPolicy implements RiskPolicy {
  compute(nonConformites: NonConformite[]): RiskLevel {
    const bloquants = nonConformites.filter(nc => nc.niveau === "BLOQUANT").length;
    const majeurs   = nonConformites.filter(nc => nc.niveau === "MAJEUR").length;

    if (bloquants >= 2) return "CRITIQUE";
    if (bloquants >= 1) return "ELEVÉ";
    if (majeurs   >= 2) return "MOYEN";
    return "FAIBLE";
  }
}
