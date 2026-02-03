import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string | null;
  email: string | null;
  image: string | null;
  budget: number;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, default: null },
    email: { type: String, required: true, unique: true, index: true },
    image: { type: String, default: null },
    budget: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
