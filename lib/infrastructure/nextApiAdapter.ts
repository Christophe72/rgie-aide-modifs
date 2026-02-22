import { DiagnosticUseCase }           from "../application/diagnosticUseCase";
import { JsonRuleRepository }           from "./jsonRuleRepository";
import { JsonHypothesisRepository }     from "./jsonHypothesisRepository";
import { JsonQuestionRepository }       from "./jsonQuestionRepository";

/**
 * Factory — instancie le DiagnosticUseCase avec les repositories JSON.
 * Point d'injection unique : pour les tests, passer des mocks à la place.
 *
 * Usage :
 *   const useCase = createDiagnosticUseCase();
 *   const result  = await useCase.execute(input);
 */
export function createDiagnosticUseCase(): DiagnosticUseCase {
  return new DiagnosticUseCase(
    new JsonRuleRepository(),
    new JsonHypothesisRepository(),
    new JsonQuestionRepository(),
  );
}
