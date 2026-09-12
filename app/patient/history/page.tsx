import { PortalNavigation } from "@/components/portal/navigation";
import { PatientRecord } from "@/components/portal/patient-record";
import {
  getDemoPatient,
  getPatientConsultations,
  getPatientMedicalRecords,
} from "@/data/portal-demo";
import { requireRole } from "@/lib/require-role";

export default async function PatientHistoryPage() {
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
      <h1>Medical history</h1>
      <PatientRecord patient={patient} />
      <section>
        <h2>Previous consultations</h2>
        {consultations.length === 0 ? (
          <p>No previous consultations.</p>
        ) : (
          <ul>
            {consultations.map((item) => (
              <li key={item.id}>
                <h3>{item.chiefComplaint}</h3>
                <p>Date: {item.date}</p>
                <p>Status: {item.status}</p>
                <p>Summary: {item.summary}</p>
                <p>Doctor notes: {item.doctorNotes}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2>Medical records</h2>
        {records.length === 0 ? (
          <p>No medical records.</p>
        ) : (
          <ul>
            {records.map((item) => (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <p>
                  {item.date} — {item.type}
                </p>
                <p>{item.details}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
