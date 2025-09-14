"server-only";

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExpenseType {
  name: string;
  color: string;
}

export interface IUser extends Document {
  name: string | null;
  email: string | null;
  image: string | null;
  expenseType: IExpenseType[];
}

const DEFAULT_EXPENSE_TYPES: IExpenseType[] = [
  { name: "Transport", color: "#3b82f6" },
  { name: "Food", color: "#22c55e" },
  { name: "Snacks", color: "#f97316" },
  { name: "Groceries", color: "#a855f7" },
  { name: "Shopping", color: "#ec4899" },
  { name: "Health", color: "#ef4444" },
  { name: "Entertainment", color: "#eab308" },
  { name: "Travel", color: "#06b6d4" },
  { name: "Bills", color: "#64748b" },
  { name: "Others", color: "#9ca3af" },
];

const ExpenseTypeSchema = new Schema<IExpenseType>(
  {
    name: { type: String, required: true },
    color: { type: String, default: "#9ca3af" },
  },
  { _id: false }
);

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, default: null },
    email: { type: String, required: true, unique: true, index: true },
    image: { type: String, default: null },
    expenseType: {
      type: [ExpenseTypeSchema],
      default: DEFAULT_EXPENSE_TYPES,
    },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
