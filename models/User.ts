import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  userId: string;
  name: string;
  username: string;
  role: "patient" | "doctor" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    role: { type: String, required: true, enum: ["patient", "doctor", "admin"] },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
