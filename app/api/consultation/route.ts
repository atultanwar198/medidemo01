import { NextResponse } from "next/server";

import {
  getQuestionsForCategory,
  type ConsultationCategory,
} from "@/data/consultation";
import { connectDB } from "@/lib/mongodb";
import { ensureDemoPatient } from "@/lib/demo-patients";
import Consultation from "@/models/Consultation";
import { getPatientSession } from "@/lib/auth";

const validCategories: ConsultationCategory[] = ["injury", "symptoms", "existing-condition", "follow-up", "other"];

type ConsultationBody = {
  language?: unknown;
  consultationCategory?: unknown;
  chiefComplaint?: unknown;
  history?: unknown;
  consent?: unknown;
};

function invalidRequest(message: string) {
  return NextResponse.json({ success: false, message }, { status: 400 });
}

export async function POST(request: Request) {
  let body: ConsultationBody;

  try {
    body = await request.json();
  } catch {
    return invalidRequest("Request body must be valid JSON");
  }

  const { language, consultationCategory, chiefComplaint, history, consent } = body;

  const session = await getPatientSession();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Please sign in as a patient" },
      { status: 401 },
    );
  }

  if (language !== "en" && language !== "hi") return invalidRequest("Valid language is required");
  if (typeof chiefComplaint !== "string" || !chiefComplaint.trim()) return invalidRequest("Chief complaint is required");
  if (consent !== true) return invalidRequest("Consent is required");

  if (!validCategories.includes(consultationCategory as ConsultationCategory)) {
    return invalidRequest("Invalid consultation category");
  }

  const expectedQuestions = getQuestionsForCategory(
    consultationCategory as ConsultationCategory,
  );

  if (!Array.isArray(history) || history.length !== expectedQuestions.length) {
    return invalidRequest("A complete consultation history is required");
  }

  const validHistory = history.every((entry, index) => {
    if (!entry || typeof entry !== "object") return false;
    const answer = entry as Record<string, unknown>;
    return answer.questionId === expectedQuestions[index].id && typeof answer.question === "string" && answer.question.trim().length > 0 && typeof answer.answer === "string" && answer.answer.trim().length > 0;
  });

  if (!validHistory) return invalidRequest("Consultation history contains invalid answers");

  try {
    await connectDB();

    const patient = await ensureDemoPatient(session.id);

    if (!patient) {
      return invalidRequest("Patient not found");
    }

    const consultation = await Consultation.create({
      patientId: session.id,
      language,
      status: "completed",
      consultationCategory,
      chiefComplaint: chiefComplaint.trim(),
      history,
      consent: true,
      redFlags: {
        detected: false,
        items: [],
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Consultation saved successfully",
        consultation,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Unable to save consultation", error instanceof Error ? error.name : "Unknown error");

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save consultation",
      },
      {
        status: 500,
      }
    );
  }
}
