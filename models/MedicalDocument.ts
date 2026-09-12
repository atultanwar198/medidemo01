import mongoose, { Document, Schema } from "mongoose";

export interface IMedicalDocument extends Document {
  patientId: string;
  uploadedBy?: string;
  name: string;
  url: string;
  mimeType: string;
  createdAt: Date;
  updatedAt: Date;
}

const MedicalDocumentSchema = new Schema<IMedicalDocument>(
  {
    patientId: { type: String, required: true, trim: true },
    uploadedBy: { type: String, trim: true },
    name: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    mimeType: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export default mongoose.models.MedicalDocument ||
  mongoose.model<IMedicalDocument>("MedicalDocument", MedicalDocumentSchema);
