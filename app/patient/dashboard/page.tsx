import Link from "next/link";
import { PortalNavigation } from "@/components/portal/navigation";
import { PatientRecord } from "@/components/portal/patient-record";
import {
  getDemoPatient,
  getPatientConsultations,
  getPatientMedicalRecords,
} from "@/data/portal-demo";
import { requireRole } from "@/lib/require-role";

export default async function PatientDashboardPage() {
  const user = await requireRole("patient");
  const patient = getDemoPatient(user.id);
  if (!patient)
    return (
      <main>
        <p>Patient record not found.</p>
      </main>
    );
  const consultations = getPatientConsultations(patient.id);
  const records = getPatientMedicalRecords(patient.id);
  return (
    <main>
      <PortalNavigation role="patient" />
      <h1>Welcome, {patient.name}</h1>
      <p>
        View your health information, submit a consultation, and review previous
        records.
      </p>
      <p>
        <Link href="/patient/consultation">Apply for a consultation</Link>
      </p>
      <PatientRecord patient={patient} />
      <section>
        <h2>Overview</h2>
        <p>Previous consultations: {consultations.length}</p>
        <p>Medical records: {records.length}</p>
        <Link href="/patient/history">View full medical history</Link>
      </section>
    </main>
  );
}
