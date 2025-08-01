"server-only";

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string | null;
  email: string | null;
  image: string | null;
  expenseTypes: string[];
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: null },
    expenseTypes: {
      type: [String],
      default: [
        "Food",
        "Transport",
        "Groceries",
        "Entertainment",
        "Shopping",
        "Bills",
        "Snacks",
        "Fuel",
        "Medical",
        "Others",
      ],
    },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
