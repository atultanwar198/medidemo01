import type { ConsultationCategory } from "./consultation";

export type PortalRole = "patient" | "doctor" | "admin";

export type DemoPatient = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  bloodGroup: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  emergencyContact: string;
};

export type DemoConsultation = {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  category: ConsultationCategory;
  status: "completed" | "doctor_review";
  chiefComplaint: string;
  summary: string;
  doctorNotes: string;
};

export type DemoMedicalRecord = {
  id: string;
  patientId: string;
  date: string;
  type: "lab result" | "prescription" | "vaccination";
  title: string;
  details: string;
};

export const demoPatients: DemoPatient[] = [
  {
    id: "patient-001",
    name: "Rahul Sharma",
    dateOfBirth: "1991-06-18",
    gender: "Male",
    phone: "+91 98765 43210",
    bloodGroup: "B+",
    allergies: ["No known allergies"],
    conditions: [],
    medications: [],
    emergencyContact: "Neha Sharma — +91 98765 43211",
  },
  {
    id: "patient-002",
    name: "Ananya Verma",
    dateOfBirth: "1988-11-04",
    gender: "Female",
    phone: "+91 98111 22003",
    bloodGroup: "O+",
    allergies: ["Penicillin"],
    conditions: ["Hypothyroidism"],
    medications: ["Levothyroxine 50 mcg once daily"],
    emergencyContact: "Amit Verma — +91 98111 22004",
  },
];

export const demoConsultations: DemoConsultation[] = [
  {
    id: "consultation-001",
    patientId: "patient-002",
    doctorId: "doctor-001",
    date: "2026-08-20",
    category: "existing-condition",
    status: "doctor_review",
    chiefComplaint: "Review of thyroid medication and recent tiredness.",
    summary: "Routine thyroid follow-up. Thyroid function tests were requested.",
    doctorNotes: "Continue current medication until test results are available. Follow up in six weeks.",
  },
  {
    id: "consultation-002",
    patientId: "patient-002",
    doctorId: "doctor-001",
    date: "2026-04-12",
    category: "symptoms",
    status: "completed",
    chiefComplaint: "Sore throat, fever, and cough for two days.",
    summary: "No breathing red flags were reported.",
    doctorNotes: "Supportive care. Return if fever continues or breathing symptoms begin.",
  },
];

export const demoMedicalRecords: DemoMedicalRecord[] = [
  {
    id: "record-001",
    patientId: "patient-002",
    date: "2026-08-20",
    type: "lab result",
    title: "Thyroid function test",
    details: "TSH result pending.",
  },
  {
    id: "record-002",
    patientId: "patient-002",
    date: "2026-01-08",
    type: "prescription",
    title: "Levothyroxine prescription",
    details: "50 mcg once daily before breakfast.",
  },
  {
    id: "record-003",
    patientId: "patient-001",
    date: "2025-10-14",
    type: "vaccination",
    title: "Influenza vaccine",
    details: "Annual influenza dose recorded.",
  },
];

export const demoDoctor = {
  id: "doctor-001",
  name: "Dr. Priya Singh",
  specialty: "General Medicine",
};

export function getDemoPatient(patientId: string) {
  return demoPatients.find((patient) => patient.id === patientId);
}

export function getPatientConsultations(patientId: string) {
  return demoConsultations.filter((consultation) => consultation.patientId === patientId);
}

export function getPatientMedicalRecords(patientId: string) {
  return demoMedicalRecords.filter((record) => record.patientId === patientId);
}
