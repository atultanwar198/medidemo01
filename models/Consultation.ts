import mongoose, { Document, Schema } from "mongoose";
import type { ConsultationCategory } from "@/data/consultation";

export interface IConsultation extends Document {
  patientId: string;

  doctorId?: string;

  language: "en" | "hi";

  status:
    | "not_started"
    | "in_progress"
    | "completed"
    | "doctor_review";

  chiefComplaint: string;

  consultationCategory?: ConsultationCategory;

  history: {
    questionId: string;
    question: string;
    answer: string;
  }[];

  redFlags: {
    detected: boolean;
    items: string[];
  };

  clinicalSummary?: string;

  doctorNotes?: string;

  legacyRecordKey?: string;

  consent: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const ConsultationSchema = new Schema<IConsultation>(
  {
    patientId: {
      type: String,
      required: true,
    },

    doctorId: {
      type: String,
      required: false,
    },

    language: {
      type: String,
      enum: ["en", "hi"],
      required: true,
      default: "en",
    },

    status: {
      type: String,
      enum: [
        "not_started",
        "in_progress",
        "completed",
        "doctor_review",
      ],
      default: "not_started",
    },

    chiefComplaint: {
      type: String,
      required: true,
      trim: true,
    },

    consultationCategory: {
      type: String,
      enum: [
        "injury",
        "symptoms",
        "existing-condition",
        "follow-up",
        "other",
      ],
      required: false,
    },

    history: {
      type: [
      {
        questionId: {
          type: String,
          required: true,
        },

        question: {
          type: String,
          required: true,
        },

        answer: {
          type: String,
          required: true,
        },
      },
      ],
      required: true,
      validate: {
        validator: (history: IConsultation["history"]) => history.length > 0,
        message: "Consultation history is required",
      },
    },

    redFlags: {
      detected: {
        type: Boolean,
        default: false,
      },

      items: {
        type: [String],
        default: [],
      },
    },

    clinicalSummary: {
      type: String,
      default: "",
    },

    doctorNotes: {
      type: String,
      default: "",
    },

    legacyRecordKey: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    consent: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.models.Consultation ||
  mongoose.model<IConsultation>("Consultation", ConsultationSchema);
