import mongoose, { Schema, Document } from "mongoose";

export interface IExpenseType extends Document {
  userId?: mongoose.Types.ObjectId;
  name: string;
}

const ExpenseTypeSchema = new Schema<IExpenseType>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const ExpenseType =
  mongoose.models.ExpenseType ||
  mongoose.model<IExpenseType>("ExpenseType", ExpenseTypeSchema);
