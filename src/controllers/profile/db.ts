import { ExpenseType } from "@/models/ExpenseType";
import mongoose from "mongoose";
import { PaymentType } from "@/models/PaymentMethod";

export async function findExpenseTypesByUser(userId: mongoose.Types.ObjectId) {
  return ExpenseType.find({ user: userId }).lean();
}

export async function deleteExpenseTypeById(id: string, userId: mongoose.Types.ObjectId) {
  const objectId = new mongoose.Types.ObjectId(id);
  return ExpenseType.findOneAndDelete({ _id: objectId, user: userId });
}

export async function updateExpenseTypeById(
  id: string,
  userId: mongoose.Types.ObjectId,
  data: { name: string; color: string }
) {
  const objectId = new mongoose.Types.ObjectId(id);
  return ExpenseType.findOneAndUpdate(
    { _id: objectId, user: userId },
    { $set: data },
    { new: true }
  );
}

export async function createExpenseType(
  userId: mongoose.Types.ObjectId,
  data: { name: string; color: string }
) {
  return ExpenseType.create({ ...data, user: userId });
}

export async function findPaymentTypesByUser(userId: mongoose.Types.ObjectId) {
  return PaymentType.find({ user: userId }).lean();
}

export async function deletePaymentTypeById(id: string, userId: mongoose.Types.ObjectId) {
  const objectId = new mongoose.Types.ObjectId(id);
  return PaymentType.findOneAndDelete({ _id: objectId, user: userId });
}

export async function updatePaymentTypeById(
  id: string,
  userId: mongoose.Types.ObjectId,
  data: { name: string; color: string }
) {
  const objectId = new mongoose.Types.ObjectId(id);
  return PaymentType.findOneAndUpdate(
    { _id: objectId, user: userId },
    { $set: data },
    { new: true }
  );
}

export async function createPaymentType(
  userId: mongoose.Types.ObjectId,
  data: { name: string; color: string }
) {
  return PaymentType.create({ ...data, user: userId });
}
