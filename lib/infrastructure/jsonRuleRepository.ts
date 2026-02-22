import type { RuleRepository } from "../application/ports";
import type { RuleSet } from "../domain/model/rgie";
import ruleSetData from "../../resources/rgie/ruleset_2020_2023_2025.json";

/**
 * Adapter JSON statique pour RuleRepository.
 * Import statique → bundle-friendly, Vercel Edge-compatible.
 * Pour basculer sur une DB : remplacer cette classe, l'interface reste identique.
 */
export class JsonRuleRepository implements RuleRepository {
  async getRuleSet(): Promise<RuleSet> {
    return ruleSetData as unknown as RuleSet;
  }
}
