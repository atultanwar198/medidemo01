import type { Question } from "./types";

export const otherQuestions: Question[] = [
  {
    id: "other-details",
    category: "other",
    en: "Please describe what you would like help with today.",
    hi: "कृपया बताएं कि आज आपको किस समस्या में सहायता चाहिए।",
    responseType: "text",
  },
  {
    id: "other-duration",
    category: "other",
    en: "When did this concern begin?",
    hi: "यह चिंता कब शुरू हुई?",
    responseType: "text",
  },
  {
    id: "other-impact",
    category: "other",
    en: "How is it affecting your daily activities?",
    hi: "इसका आपकी रोजमर्रा की गतिविधियों पर क्या असर पड़ रहा है?",
    responseType: "text",
  },
];
