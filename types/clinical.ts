export interface ClinicalHistory {
  chiefComplaint?: string;

  historyOfPresentIllness?: {
    onset?: string;
    duration?: string;
    location?: string;
    severity?: string;
    progression?: string;
    associatedSymptoms?: string[];
    aggravatingFactors?: string[];
    relievingFactors?: string[];
  };

  pastMedicalHistory?: string[];

  pastSurgicalHistory?: string[];

  medications?: {
    name: string;
    dosage?: string;
    frequency?: string;
  }[];

  allergies?: string[];

  familyHistory?: string[];

  personalHistory?: {
    diet?: string;
    sleep?: string;
    smoking?: boolean;
    alcohol?: boolean;
  };

  investigations?: {
    test: string;
    value?: string;
    unit?: string;
    abnormal?: boolean;
  }[];
}