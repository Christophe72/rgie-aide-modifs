import type { NonConformite } from "../model/diagnostic";

// ─── Port Strategy ────────────────────────────────────────────────────────────

export interface ScoringPolicy {
  compute(nonConformites: NonConformite[]): number;
}

// ─── Politique par défaut ─────────────────────────────────────────────────────

/**
 * Score = 100 − (bloquants × 20) − (majeurs × 8) − (avertissements × 2)
 * Clampé entre 0 et 100.
 */
export class DefaultScoringPolicy implements ScoringPolicy {
  compute(nonConformites: NonConformite[]): number {
    const bloquants      = nonConformites.filter(nc => nc.niveau === "BLOQUANT").length;
    const majeurs        = nonConformites.filter(nc => nc.niveau === "MAJEUR").length;
    const avertissements = nonConformites.filter(nc => nc.niveau === "AVERTISSEMENT").length;

    const raw = 100 - bloquants * 20 - majeurs * 8 - avertissements * 2;
    return Math.max(0, Math.min(100, raw));
  }
}
