import type { Question } from "./types";

export const followUpQuestions: Question[] = [
  {
    id: "follow-up-reason",
    category: "follow-up",
    en: "What is the purpose of today's follow-up or routine visit?",
    hi: "आज के फॉलो-अप या नियमित जांच का उद्देश्य क्या है?",
    responseType: "text",
  },
  {
    id: "follow-up-change",
    category: "follow-up",
    en: "Since your last visit, have your symptoms improved, worsened, or stayed the same?",
    hi: "पिछली जांच के बाद आपके लक्षण बेहतर, बदतर या वैसे ही हैं?",
    responseType: "choice",
    options: [
      { value: "improved", en: "Improved", hi: "बेहतर हुए" },
      { value: "worsened", en: "Worsened", hi: "बदतर हुए" },
      { value: "same", en: "Stayed the same", hi: "वैसे ही हैं" },
    ],
  },
  {
    id: "follow-up-questions",
    category: "follow-up",
    en: "Do you have any new symptoms or concerns?",
    hi: "क्या आपको कोई नए लक्षण या चिंता है?",
    responseType: "text",
  },
];
