import { conditionQuestions } from "./conditionQuestions";
import { followUpQuestions } from "./followUpQuestions";
import { injuryQuestions } from "./injuryQuestions";
import { otherQuestions } from "./otherQuestions";
import { symptomQuestions } from "./symptomQuestions";
import type { ConsultationCategory, Question } from "./types";

export { consultationCategories } from "./categories";
export * from "./types";

const questionsByCategory: Record<ConsultationCategory, Question[]> = {
  injury: injuryQuestions,
  symptoms: symptomQuestions,
  "existing-condition": conditionQuestions,
  "follow-up": followUpQuestions,
  other: otherQuestions,
};

export function getQuestionsForCategory(category: ConsultationCategory) {
  return questionsByCategory[category];
}
