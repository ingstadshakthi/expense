import {
  findExpenseTypesByUser,
  deleteExpenseTypeById,
  updateExpenseTypeById,
  createExpenseType,
  findPaymentTypesByUser,
  deletePaymentTypeById,
  updatePaymentTypeById,
  createPaymentType,
} from "./db";
import { ActionResponse } from "@/types/response";
import mongoose from "mongoose";

export interface ExpenseTypeDTO {
  id: string;
  name: string;
  color: string;
}

export async function getUserExpenseTypes(
  userId: mongoose.Types.ObjectId
): Promise<ExpenseTypeDTO[]> {
  const expenseTypes = await findExpenseTypesByUser(userId);
  return expenseTypes.map(({ _id, name, color }) => ({
    id: _id.toString(),
    name,
    color,
  }));
}

export async function deleteExpenseType(
  id: string,
  userId: mongoose.Types.ObjectId
): Promise<ActionResponse> {
  const deleted = await deleteExpenseTypeById(id, userId);
  if (!deleted) {
    return { success: false, message: "Not found or unauthorized" };
  }
  return { success: true, message: "Deleted successfully" };
}

export async function upsertExpenseType(
  userId: mongoose.Types.ObjectId,
  data: { name: string; color: string },
  id?: string
): Promise<ActionResponse> {
  if (id) {
    const updated = await updateExpenseTypeById(id, userId, data);
    if (!updated) {
      return { success: false, message: "Not found or unauthorized" };
    }
    return { success: true, message: "Updated successfully" };
  }

  await createExpenseType(userId, data);
  return { success: true, message: "Created successfully" };
}

export interface PaymentTypeDTO {
  id: string;
  name: string;
  color: string;
}

export async function getUserPaymentTypes(
  userId: mongoose.Types.ObjectId
): Promise<PaymentTypeDTO[]> {
  const paymentTypes = await findPaymentTypesByUser(userId);
  return paymentTypes.map(({ _id, name, color }) => ({
    id: _id.toString(),
    name,
    color,
  }));
}

export async function deletePaymentType(
  id: string,
  userId: mongoose.Types.ObjectId
): Promise<ActionResponse> {
  const deleted = await deletePaymentTypeById(id, userId);
  if (!deleted) {
    return { success: false, message: "Not found or unauthorized" };
  }
  return { success: true, message: "Deleted successfully" };
}

export async function upsertPaymentType(
  userId: mongoose.Types.ObjectId,
  data: { name: string; color: string },
  id?: string
): Promise<ActionResponse> {
  if (id) {
    const updated = await updatePaymentTypeById(id, userId, data);
    if (!updated) {
      return { success: false, message: "Not found or unauthorized" };
    }
    return { success: true, message: "Updated successfully" };
  }

  await createPaymentType(userId, data);
  return { success: true, message: "Created successfully" };
}
