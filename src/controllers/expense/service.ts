import mongoose from "mongoose";
import { ExpenseDB } from "./db";
import { IExpense } from "@/models/Expense";
import { ActionResponse } from "@/types/response";
import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";
import { ExpenseData, UserExpenseData } from "@/types/expense";

export interface ExpenseDTO {
  id: string;
  shortName: string;
  description?: string;
  amount: number;
  expenseType: string;
  paymentType: string;
  date: Date;
}

function extractName(data: unknown) {
  if (typeof data === "object" && data && "name" in data) {
    if (typeof data.name === "string") return data.name;
  }
  return "";
}

function extractDocId(data: unknown) {
  if (typeof data === "object" && data && "_id" in data) {
    if (data._id) return data._id.toString();
  }
  return "";
}

function toExpenseDTO(doc: IExpense): ExpenseDTO {
  return {
    id: extractDocId(doc),
    shortName: doc.shortName,
    description: doc.description,
    amount: doc.amount,
    expenseType: extractName(doc.expenseType),
    paymentType: extractName(doc.paymentType),
    date: doc.date,
  };
}

/**
 * Get expenses by month with pagination
 */
export async function getUserExpensesByMonth(
  userId: mongoose.Types.ObjectId,
  year: number,
  month: number,
  page = 1,
  limit = 25
): Promise<{ records: ExpenseDTO[]; total: number; page: number; totalPages: number }> {
  const {
    records,
    total,
    page: currentPage,
    totalPages,
  } = await ExpenseDB.readByMonth(userId, year, month, page, limit);

  return {
    records: records.map(toExpenseDTO),
    total,
    page: currentPage,
    totalPages,
  };
}

/**
 * Get a single expense
 */
export async function getExpenseById(
  userId: mongoose.Types.ObjectId,
  recordId: string
): Promise<ExpenseDTO | null> {
  const expense = await ExpenseDB.readOne(userId, recordId);
  return expense ? toExpenseDTO(expense) : null;
}

/**
 * Create a new expense
 */
export async function createExpense(data: UserExpenseData): Promise<ActionResponse> {
  try {
    const created = await ExpenseDB.create(data);
    return created
      ? { success: true, message: "Expense created successfully" }
      : { success: false, message: "Failed to create expense" };
  } catch (err) {
    logger.log(`Expense Creation Failed: ${getErrorMessage(err)}`);
    return { success: false, message: "Error while creating expense" };
  }
}

/**
 * Update an expense
 */
export async function updateExpense(
  userId: mongoose.Types.ObjectId,
  recordId: string,
  data: ExpenseData
): Promise<ActionResponse> {
  const updated = await ExpenseDB.update(userId, recordId, data);

  if (!updated) {
    return { success: false, message: "Not found or unauthorized" };
  }
  return { success: true, message: "Expense updated successfully" };
}

/**
 * Delete an expense
 */
export async function deleteExpense(
  userId: mongoose.Types.ObjectId,
  recordId: string
): Promise<ActionResponse> {
  const { deleted } = await ExpenseDB.remove(userId, recordId);

  if (!deleted) {
    return { success: false, message: "Not found or unauthorized" };
  }
  return { success: true, message: "Expense deleted successfully" };
}
