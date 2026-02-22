import type { QuestionRepository } from "../application/ports";
import type { Question } from "../domain/model/diagnostic";
import questionBankData from "../../resources/rgie/question_bank.json";

export class JsonQuestionRepository implements QuestionRepository {
  async getQuestionBank(): Promise<Record<string, Question>> {
    return questionBankData as unknown as Record<string, Question>;
  }
}
