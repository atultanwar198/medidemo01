import type { ConsultationCategory } from "@/data/consultation";

export type DemoPatientRecord = {
  patientId: string;
  userId: string;
  name: string;
  dateOfBirth: Date;
  gender: "female" | "male" | "other" | "prefer_not_to_say";
  phone: string;
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
};

export type LegacyConsultation = {
  legacyRecordKey: string;
  language: "en" | "hi";
  status: "completed" | "doctor_review";
  consultationCategory: ConsultationCategory;
  chiefComplaint: string;
  history: { questionId: string; question: string; answer: string }[];
  clinicalSummary: string;
  doctorNotes: string;
  createdAt: Date;
};

export const demoPatientRecords: DemoPatientRecord[] = [
  {
    patientId: "patient-001",
    userId: "patient-001",
    name: "Rahul Sharma",
    dateOfBirth: new Date("1991-06-18"),
    gender: "male",
    phone: "+91 98765 43210",
    bloodGroup: "B+",
    allergies: [],
    chronicConditions: [],
    currentMedications: [],
  },
  {
    patientId: "patient-002",
    userId: "patient-002",
    name: "Ananya Verma",
    dateOfBirth: new Date("1988-11-04"),
    gender: "female",
    phone: "+91 98111 22003",
    bloodGroup: "O+",
    allergies: ["Penicillin"],
    chronicConditions: ["Hypothyroidism"],
    currentMedications: ["Levothyroxine 50 mcg once daily"],
  },
];

export const legacyConsultations: LegacyConsultation[] = [
  {
    legacyRecordKey: "ananya-2025-01-17",
    language: "en",
    status: "doctor_review",
    consultationCategory: "existing-condition",
    chiefComplaint: "Review of thyroid medication and recent tiredness.",
    history: [
      { questionId: "legacy-1", question: "How long have you felt tired?", answer: "About three weeks." },
      { questionId: "legacy-2", question: "Are you taking your thyroid medicine regularly?", answer: "Yes, every morning before breakfast." },
    ],
    clinicalSummary: "Symptoms consistent with a routine thyroid follow-up. Thyroid function tests requested.",
    doctorNotes: "Continue levothyroxine 50 mcg pending test results. Follow up in 6 weeks.",
    createdAt: new Date("2025-01-17T09:30:00.000Z"),
  },
  {
    legacyRecordKey: "ananya-2024-08-23",
    language: "en",
    status: "completed",
    consultationCategory: "symptoms",
    chiefComplaint: "Sore throat, fever, and cough for two days.",
    history: [
      { questionId: "legacy-3", question: "What temperature did you record?", answer: "100.4°F at home." },
      { questionId: "legacy-4", question: "Do you have trouble breathing?", answer: "No." },
    ],
    clinicalSummary: "Likely uncomplicated upper respiratory infection; no breathing red flags reported.",
    doctorNotes: "Supportive care advised. Return if fever persists beyond three days or breathing symptoms begin.",
    createdAt: new Date("2024-08-23T11:00:00.000Z"),
  },
];
