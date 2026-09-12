import mongoose, { Document, Schema } from "mongoose";

export interface IPatient extends Document {
  patientId: string;
  userId?: string;
  name: string;
  dateOfBirth?: Date;
  gender?: "female" | "male" | "other" | "prefer_not_to_say";
  phone?: string;
  bloodGroup?: string;
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema = new Schema<IPatient>(
  {
    patientId: { type: String, required: true, unique: true, trim: true },
    userId: { type: String, trim: true },
    name: { type: String, required: true, trim: true },
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ["female", "male", "other", "prefer_not_to_say"],
    },
    phone: { type: String, trim: true },
    bloodGroup: { type: String, trim: true },
    allergies: { type: [String], default: [] },
    chronicConditions: { type: [String], default: [] },
    currentMedications: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default mongoose.models.Patient || mongoose.model<IPatient>("Patient", PatientSchema);
