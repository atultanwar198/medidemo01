import { yesNoOptions } from "./commonQuestions";
import type { Question } from "./types";

export const injuryQuestions: Question[] = [
  {
    id: "injury-mechanism",
    category: "injury",
    en: "How did the injury happen?",
    hi: "चोट कैसे लगी?",
    responseType: "text",
  },
  {
    id: "injury-when",
    category: "injury",
    en: "When did the injury happen?",
    hi: "चोट कब लगी?",
    responseType: "text",
  },
  {
    id: "injury-function",
    category: "injury",
    en: "Can you move the injured area normally?",
    hi: "क्या आप चोट वाले हिस्से को सामान्य रूप से हिला सकते हैं?",
    responseType: "choice",
    options: yesNoOptions,
  },
  {
    id: "injury-warning",
    category: "injury",
    en: "Is there severe bleeding, numbness, deformity, or loss of consciousness?",
    hi: "क्या बहुत खून बह रहा है, सुन्नपन, विकृति या बेहोशी हुई है?",
    responseType: "choice",
    options: yesNoOptions,
  },
];
