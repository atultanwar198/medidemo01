import type { ConsultationCategoryOption } from "./types";

export const consultationCategories: ConsultationCategoryOption[] = [
  { value: "injury", en: "Injury", hi: "चोट" },
  {
    value: "symptoms",
    en: "Feeling unwell or having symptoms",
    hi: "अस्वस्थ महसूस करना या लक्षण होना",
  },
  {
    value: "existing-condition",
    en: "Existing health condition",
    hi: "पहले से मौजूद स्वास्थ्य समस्या",
  },
  {
    value: "follow-up",
    en: "Follow-up or routine visit",
    hi: "फॉलो-अप या नियमित जांच",
  },
  { value: "other", en: "Other", hi: "अन्य" },
];
