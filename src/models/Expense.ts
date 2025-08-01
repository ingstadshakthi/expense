import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  description?: string;
  category: mongoose.Types.ObjectId;
  paymentMethod: mongoose.Types.ObjectId;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "ExpenseType",
      required: true,
    },
    paymentMethod: {
      type: Schema.Types.ObjectId,
      ref: "PaymentMethod",
      required: true,
    },
  },
  { timestamps: true }
);
ExpenseSchema.index({ userId: 1, date: -1 });

export const Expense =
  mongoose.models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);
