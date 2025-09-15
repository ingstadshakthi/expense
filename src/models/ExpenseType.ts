import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IExpenseType extends Document {
  user: Types.ObjectId;
  name: string;
  color: string;
}

const ExpenseTypeSchema = new Schema<IExpenseType>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    color: { type: String, default: "#9ca3af" },
  },
  { timestamps: true },
);

export const ExpenseType: Model<IExpenseType> =
  mongoose.models.ExpenseType ||
  mongoose.model<IExpenseType>("ExpenseType", ExpenseTypeSchema);
