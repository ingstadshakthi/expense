"use server";

import { getUser } from "@/controllers/user";
import { revalidatePath } from "next/cache";
import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";
import {
  getUserExpenseTypes as getUserExpenseTypesService,
  deleteExpenseType,
  upsertExpenseType,
  getUserPaymentTypes as getUserPaymentTypesService,
  deletePaymentType,
  upsertPaymentType,
} from "./service";
import { ActionResponse } from "@/types/response";

export async function getUserExpenseTypes() {
  const user = await getUser();
  if (!user) return [];
  return getUserExpenseTypesService(user.id);
}

export async function onExpenseTypeDelete(id: string): Promise<ActionResponse> {
  try {
    const user = await getUser();
    if (!user) return { success: false, message: "Unauthorized" };

    const result = await deleteExpenseType(id, user.id);
    if (result.success) revalidatePath("/profile/expense");

    return result;
  } catch (error) {
    logger.error(`Delete failed: ${getErrorMessage(error)}`);
    return { success: false, message: "Expense type deletion failed" };
  }
}

export async function onExpenseTypeUpsert(
  data: { name: string; color: string },
  id?: string
): Promise<ActionResponse> {
  try {
    const user = await getUser();
    if (!user) return { success: false, message: "Unauthorized" };

    const result = await upsertExpenseType(user.id, data, id);
    if (result.success) revalidatePath("/profile/expense");

    return result;
  } catch (error) {
    logger.error(`Upsert failed: ${getErrorMessage(error)}`);
    return { success: false, message: "Expense type upsert failed" };
  }
}

export async function getUserPaymentTypes() {
  const user = await getUser();
  if (!user) return [];
  return getUserPaymentTypesService(user.id);
}

export async function onPaymentTypeDelete(id: string): Promise<ActionResponse> {
  try {
    const user = await getUser();
    if (!user) return { success: false, message: "Unauthorized" };

    const result = await deletePaymentType(id, user.id);
    if (result.success) revalidatePath("/profile/payment");

    return result;
  } catch (error) {
    logger.error(`Delete failed: ${getErrorMessage(error)}`);
    return { success: false, message: "Payment type deletion failed" };
  }
}

export async function onPaymentTypeUpsert(
  data: { name: string; color: string },
  id?: string
): Promise<ActionResponse> {
  try {
    const user = await getUser();
    if (!user) return { success: false, message: "Unauthorized" };

    const result = await upsertPaymentType(user.id, data, id);
    if (result.success) revalidatePath("/profile/payment");

    return result;
  } catch (error) {
    logger.error(`Upsert failed: ${getErrorMessage(error)}`);
    return { success: false, message: "Payment type upsert failed" };
  }
}
