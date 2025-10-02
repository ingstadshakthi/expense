import { type Schema } from "mongoose";

export interface ExpenseData {
  id?: string;
  shortName: string;
  description?: string;
  amount: number;
  expenseType: string;
  paymentType: string;
  date: Date;
}

export interface UserExpenseData extends ExpenseData {
  userId: Schema.Types.ObjectId;
}
