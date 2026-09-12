import { yesNoOptions } from "./commonQuestions";
import type { Question } from "./types";

export const conditionQuestions: Question[] = [
  {
    id: "condition-diagnosis",
    category: "existing-condition",
    en: "What health condition are you being treated for?",
    hi: "आपका किस स्वास्थ्य समस्या का इलाज चल रहा है?",
    responseType: "text",
  },
  {
    id: "condition-treatment",
    category: "existing-condition",
    en: "What medicines or treatment are you currently using?",
    hi: "आप अभी कौन सी दवाएं या उपचार ले रहे हैं?",
    responseType: "text",
  },
  {
    id: "condition-control",
    category: "existing-condition",
    en: "Has the condition changed or become difficult to control recently?",
    hi: "क्या हाल में यह समस्या बदली है या नियंत्रित करना कठिन हुआ है?",
    responseType: "choice",
    options: yesNoOptions,
  },
];
