import { PortalNavigation } from "@/components/portal/navigation";
import { PatientRecord } from "@/components/portal/patient-record";
import { demoPatients, getPatientConsultations, getPatientMedicalRecords } from "@/data/portal-demo";
import { requireRole } from "@/lib/require-role";

export default async function DoctorPatientsPage() {
  await requireRole("doctor");
  return <main><PortalNavigation role="doctor" /><h1>Patients</h1><p>Review patient details, older consultations, and medical records.</p>
    {demoPatients.map((patient) => { const consultations = getPatientConsultations(patient.id); const records = getPatientMedicalRecords(patient.id); return <article key={patient.id}><PatientRecord patient={patient} /><section><h2>Previous consultations</h2>{consultations.length ? <ul>{consultations.map((item) => <li key={item.id}>{item.date}: {item.chiefComplaint} ({item.status})<p>{item.summary}</p><p>Notes: {item.doctorNotes}</p></li>)}</ul> : <p>No previous consultations.</p>}</section><section><h2>Medical records</h2>{records.length ? <ul>{records.map((item) => <li key={item.id}>{item.date}: {item.title} — {item.details}</li>)}</ul> : <p>No medical records.</p>}</section></article>; })}
  </main>;
}
