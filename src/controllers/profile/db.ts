import { ExpenseType } from "@/models/ExpenseType";
import mongoose from "mongoose";

export async function findExpenseTypesByUser(userId: mongoose.Types.ObjectId) {
  return ExpenseType.find({ user: userId }).lean();
}

export async function deleteExpenseTypeById(
  id: string,
  userId: mongoose.Types.ObjectId,
) {
  const objectId = new mongoose.Types.ObjectId(id);
  return ExpenseType.findOneAndDelete({ _id: objectId, user: userId });
}

export async function updateExpenseTypeById(
  id: string,
  userId: mongoose.Types.ObjectId,
  data: { name: string; color: string },
) {
  const objectId = new mongoose.Types.ObjectId(id);
  return ExpenseType.findOneAndUpdate(
    { _id: objectId, user: userId },
    { $set: data },
    { new: true },
  );
}

export async function createExpenseType(
  userId: mongoose.Types.ObjectId,
  data: { name: string; color: string },
) {
  return ExpenseType.create({ ...data, user: userId });
}
