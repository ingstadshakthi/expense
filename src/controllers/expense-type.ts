"use server";

import { connectDB } from "@/lib/db";
import { ExpenseType, IExpenseType } from "@/models/ExpenseType";
import { Types } from "mongoose";
import { getUser } from "./user";
import { getStatusMessage, getSuccessResponse } from "./utils";

interface ReturnType {
  status: number;
  message: string;
}

export async function getAllExpenseTypes(): Promise<IExpenseType[]> {
  await connectDB();
  return ExpenseType.find({ userId: null }).sort({ createdAt: -1 });
}

export async function getExpense(userId: string): Promise<string[]> {
  await connectDB();
  return ExpenseType.find({ userId: new Types.ObjectId(userId) }).sort({
    createdAt: -1,
    userId: -1,
  });
}

export async function createExpenseType(name: string): Promise<ReturnType> {
  const user = await getUser();
  if (!user) return getStatusMessage(401);

  await ExpenseType.create({ name, userId: user.id });

  return getSuccessResponse(`${name} expense created successfully`);
}

export async function updateExpenseType(
  id: string,
  name: string,
  userId: string
): Promise<IExpenseType | null> {
  await connectDB();
  return ExpenseType.findOneAndUpdate(
    { _id: id, userId },
    { name },
    { new: true }
  );
}

export async function deleteExpenseType(
  id: string,
  userId: string
): Promise<IExpenseType | null> {
  await connectDB();
  return ExpenseType.findOneAndDelete({ _id: id, userId });
}
