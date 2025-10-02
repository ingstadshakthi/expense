import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExpense extends Document {
  userId: mongoose.Types.ObjectId;
  shortName: string;
  description?: string;
  amount: number;
  expenseType: mongoose.Types.ObjectId;
  paymentType: mongoose.Types.ObjectId;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema: Schema<IExpense> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    shortName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    expenseType: {
      type: Schema.Types.ObjectId,
      ref: "ExpenseType",
      required: true,
    },
    paymentType: {
      type: Schema.Types.ObjectId,
      ref: "PaymentType",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
      validate: {
        validator: function (value: Date) {
          return value <= new Date();
        },
        message: "Expense date cannot be in the future",
      },
    },
  },
  { timestamps: true }
);

export const Expense: Model<IExpense> =
  mongoose.models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);
