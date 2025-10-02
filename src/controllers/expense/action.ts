"use server";

import { getUser } from "@/controllers/user";
import { revalidatePath } from "next/cache";
import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";
import mongoose from "mongoose";
import {
  getUserExpensesByMonth,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} from "./service";
import { ActionResponse } from "@/types/response";
import { ExpenseDTO } from "./service";
import { ExpenseData } from "@/types/expense";

/**
 * Get paginated expenses by month for a user
 */
export async function getExpensesByMonth(
  year: number,
  month: number,
  page = 1,
  limit = 25
): Promise<{ records: ExpenseDTO[]; total: number; page: number; totalPages: number }> {
  const user = await getUser();
  if (!user) return { records: [], total: 0, page: 1, totalPages: 1 };

  return getUserExpensesByMonth(new mongoose.Types.ObjectId(user.id), year, month, page, limit);
}

/**
 * Get single expense by ID
 */
export async function getExpense(id: string): Promise<ExpenseDTO | null> {
  const user = await getUser();
  if (!user) return null;

  return getExpenseById(new mongoose.Types.ObjectId(user.id), id);
}

/**
 * Create expense
 */
export async function onExpenseCreate(data: {
  shortName: string;
  description?: string;
  amount: number;
  expenseType: string;
  paymentType: string;
  date: Date;
}): Promise<ActionResponse> {
  try {
    const user = await getUser();
    if (!user) return { success: false, message: "Unauthorized" };

    const result = await createExpense({ ...data, userId: user.id });

    if (result.success) {
      revalidatePath("/dashboard");
    }
    return result;
  } catch (error) {
    logger.error(`Create expense failed: ${getErrorMessage(error)}`);
    return { success: false, message: "Expense creation failed" };
  }
}

/**
 * Update expense
 */
export async function onExpenseUpdate(id: string, data: ExpenseData): Promise<ActionResponse> {
  try {
    const user = await getUser();
    if (!user) return { success: false, message: "Unauthorized" };

    const result = await updateExpense(user.id, id, data);

    if (result.success) {
      revalidatePath("/expenses");
    }
    return result;
  } catch (error) {
    logger.error(`Update expense failed: ${getErrorMessage(error)}`);
    return { success: false, message: "Expense update failed" };
  }
}

/**
 * Delete expense
 */
export async function onExpenseDelete(id: string): Promise<ActionResponse> {
  try {
    const user = await getUser();
    if (!user) return { success: false, message: "Unauthorized" };

    const result = await deleteExpense(new mongoose.Types.ObjectId(user.id), id);

    if (result.success) {
      revalidatePath("/expenses");
    }
    return result;
  } catch (error) {
    logger.error(`Delete expense failed: ${getErrorMessage(error)}`);
    return { success: false, message: "Expense deletion failed" };
  }
}
