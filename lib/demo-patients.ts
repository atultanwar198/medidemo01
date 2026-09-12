import { demoPatientRecords, legacyConsultations } from "@/data/patient-demo";
import Consultation from "@/models/Consultation";
import Patient from "@/models/Patient";

export async function ensureDemoPatient(patientId: string) {
  const patient = demoPatientRecords.find((record) => record.patientId === patientId);

  if (!patient) {
    return null;
  }

  await Patient.findOneAndUpdate(
    { patientId },
    { $setOnInsert: patient },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  if (patientId === "patient-002") {
    await Promise.all(
      legacyConsultations.map((consultation) =>
        Consultation.findOneAndUpdate(
          { legacyRecordKey: consultation.legacyRecordKey },
          {
            $setOnInsert: {
              ...consultation,
              patientId,
              consent: true,
              redFlags: { detected: false, items: [] },
            },
          },
          { new: true, upsert: true, setDefaultsOnInsert: true },
        ),
      ),
    );
  }

  return Patient.findOne({ patientId }).lean();
}
