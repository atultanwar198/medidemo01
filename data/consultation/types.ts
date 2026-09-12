export type ConsultationCategory =
  | "injury"
  | "symptoms"
  | "existing-condition"
  | "follow-up"
  | "other";

export type QuestionResponseType = "text" | "choice" | "scale";

export interface QuestionOption {
  value: string;
  en: string;
  hi: string;
}

export interface Question {
  id: string;
  category: ConsultationCategory;
  en: string;
  hi: string;
  responseType: QuestionResponseType;
  options?: QuestionOption[];
}

export interface ConsultationCategoryOption {
  value: ConsultationCategory;
  en: string;
  hi: string;
}
