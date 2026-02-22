import type { RuleSet } from "../domain/model/rgie";
import type { Hypothese, Question } from "../domain/model/diagnostic";

/**
 * Ports Hexagonaux — le domain ne connaît pas l'implémentation concrète.
 * Aujourd'hui : JSON statique. Demain : DB, API distante, cache.
 */

export interface RuleRepository {
  getRuleSet(): Promise<RuleSet>;
}

export interface HypothesisRepository {
  getHypotheses(): Promise<Hypothese[]>;
}

export interface QuestionRepository {
  getQuestionBank(): Promise<Record<string, Question>>;
}
