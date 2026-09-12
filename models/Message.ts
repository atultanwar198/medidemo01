import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  consultationId: mongoose.Types.ObjectId;

  role: "ai" | "patient";

  message: string;

  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    consultationId: {
      type: Schema.Types.ObjectId,
      ref: "Consultation",
      required: true,
    },

    role: {
      type: String,
      enum: ["ai", "patient"],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);
