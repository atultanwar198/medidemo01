import type { DemoPatient } from "@/data/portal-demo";

export function PatientRecord({ patient }: { patient: DemoPatient }) {
  return (
    <section>
      <h2>Patient information</h2>
      <dl>
        <dt>Name</dt><dd>{patient.name}</dd>
        <dt>Date of birth</dt><dd>{patient.dateOfBirth}</dd>
        <dt>Gender</dt><dd>{patient.gender}</dd>
        <dt>Phone</dt><dd>{patient.phone}</dd>
        <dt>Blood group</dt><dd>{patient.bloodGroup}</dd>
        <dt>Allergies</dt><dd>{patient.allergies.join(", ") || "None"}</dd>
        <dt>Conditions</dt><dd>{patient.conditions.join(", ") || "None"}</dd>
        <dt>Current medicines</dt><dd>{patient.medications.join(", ") || "None"}</dd>
        <dt>Emergency contact</dt><dd>{patient.emergencyContact}</dd>
      </dl>
    </section>
  );
}
