import type { HypothesisRepository } from "../application/ports";
import type { Hypothese } from "../domain/model/diagnostic";
import hypothesesData from "../../resources/rgie/hypotheses.json";

export class JsonHypothesisRepository implements HypothesisRepository {
  async getHypotheses(): Promise<Hypothese[]> {
    return hypothesesData as unknown as Hypothese[];
  }
}
