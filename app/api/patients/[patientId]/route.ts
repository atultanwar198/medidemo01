import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { ensureDemoPatient } from "@/lib/demo-patients";
import Consultation from "@/models/Consultation";
import { getPatientSession } from "@/lib/auth";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/patients/[patientId]">,
) {
  const { patientId } = await context.params;
  const session = await getPatientSession();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Please sign in as a patient" },
      { status: 401 },
    );
  }

  const requestedPatientId = patientId === "me" ? session.id : patientId;

  if (requestedPatientId !== session.id) {
    return NextResponse.json(
      { success: false, message: "You cannot access another patient's medical record" },
      { status: 403 },
    );
  }

  try {
    await connectDB();

    const patient = await ensureDemoPatient(requestedPatientId);

    if (!patient) {
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 },
      );
    }

    const consultations = await Consultation.find({ patientId: requestedPatientId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, patient, consultations });
  } catch (error) {
    console.error(
      "Unable to load patient history",
      error instanceof Error ? error.name : "Unknown error",
    );

    return NextResponse.json(
      { success: false, message: "Unable to load patient history" },
      { status: 500 },
    );
  }
}
