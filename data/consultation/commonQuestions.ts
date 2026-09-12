import type { Question, QuestionOption } from "./types";

export const yesNoOptions: QuestionOption[] = [
  { value: "yes", en: "Yes", hi: "हां" },
  { value: "no", en: "No", hi: "नहीं" },
];

export const socratesQuestions: Question[] = [
  {
    id: "socrates-site",
    category: "symptoms",
    en: "Where exactly is the problem located?",
    hi: "समस्या ठीक किस स्थान पर है?",
    responseType: "text",
  },
  {
    id: "socrates-onset",
    category: "symptoms",
    en: "When did it start, and did it begin suddenly or gradually?",
    hi: "यह कब शुरू हुआ और अचानक या धीरे-धीरे शुरू हुआ?",
    responseType: "text",
  },
  {
    id: "socrates-character",
    category: "symptoms",
    en: "What does it feel like? For example, sharp, dull, burning, or throbbing.",
    hi: "यह कैसा महसूस होता है? जैसे तेज, हल्का, जलन या धड़कन जैसा।",
    responseType: "text",
  },
  {
    id: "socrates-radiation",
    category: "symptoms",
    en: "Does it move or spread anywhere else?",
    hi: "क्या यह कहीं और फैलता या जाता है?",
    responseType: "text",
  },
  {
    id: "socrates-associated",
    category: "symptoms",
    en: "What other symptoms are you experiencing?",
    hi: "आपको और कौन से लक्षण हो रहे हैं?",
    responseType: "text",
  },
  {
    id: "socrates-timing",
    category: "symptoms",
    en: "Is it constant or does it come and go? How long does it last each time?",
    hi: "क्या यह लगातार रहता है या आता-जाता है? हर बार कितनी देर रहता है?",
    responseType: "text",
  },
  {
    id: "socrates-exacerbating",
    category: "symptoms",
    en: "What makes it better or worse?",
    hi: "किस चीज से यह बेहतर या बदतर होता है?",
    responseType: "text",
  },
  {
    id: "socrates-severity",
    category: "symptoms",
    en: "How severe is it from 0 to 10?",
    hi: "0 से 10 के पैमाने पर यह कितना गंभीर है?",
    responseType: "scale",
  },
];
