"use server";

import { ExpenseType } from "@/models/ExpenseType";
import { getUser } from "./user";
import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export interface ExpenseType {
  id: string;
  name: string;
  color: string;
}

export async function getUserExpenseTypes(): Promise<ExpenseType[]> {
  const user = await getUser();
  if (!user) return [];
  const expenseTypes = await ExpenseType.find({ user: user._id }).lean();
  return expenseTypes.map(({ _id, name, color }) => ({
    id: _id.toString(),
    name,
    color,
  }));
}

export async function onExpenseTypeDelete(id: string) {
  try {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    const objectId = new mongoose.Types.ObjectId(id);

    const deleted = await ExpenseType.findOneAndDelete({
      _id: objectId,
      user: user._id,
    });

    if (!deleted) {
      return {
        success: false,
        message: "Expense type not found or not owned by user",
      };
    }
    revalidatePath("/profile/expense");

    return {
      success: true,
      message: "Deleted Successfully",
    };
  } catch (error) {
    logger.error(
      `Expense Type Deletion failed ${id}: ${getErrorMessage(error)}`,
    );
    return {
      success: false,
      message: "Expense Type, Deletion failed",
    };
  }
}

export async function onExpenseUpdate(expense: unknown, id?: string) {
  console.log("onUpdate", expense, id);
}
