"use server";

import mongoose from "mongoose";
import { getUser } from "@/controllers/user";
import { getUserExpensesByMonth } from "@/controllers/expense/service";
import { ExpenseType } from "@/models/ExpenseType";

export interface DashboardCategory {
  id: string;
  name: string;
  amount: number;
  count: number;
  percentage: number;
  color: string;
}

export interface DashboardExpense {
  id: string;
  shortName: string;
  amount: number;
  categoryName: string;
  categoryColor: string;
  date: Date;
}

export interface DashboardStats {
  currentMonthTotal: number;
  lastMonthTotal: number;
  dailyAverage: number;
  transactionCount: number;
  monthLabel: string;
  categoryBreakdown: DashboardCategory[];
  recentExpenses: DashboardExpense[];
  topCategories: DashboardCategory[];
  highestExpense: { name: string; amount: number; category: string; date: Date } | null;
  highestSpendingDay: { date: Date; amount: number; count: number } | null;
  averageExpense: number;
}

export async function getDashboardData(): Promise<DashboardStats | null> {
  try {
    const user = await getUser();
    if (!user) return null;

    const userId = new mongoose.Types.ObjectId(user.id);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    // Fetch current and last month expenses
    const currentMonthData = await getUserExpensesByMonth(
      userId,
      currentYear,
      currentMonth,
      1,
      1000
    );
    const lastMonthData = await getUserExpensesByMonth(userId, lastMonthYear, lastMonth, 1, 1000);

    const currentMonthTotal = currentMonthData.records.reduce((sum, e) => sum + e.amount, 0);
    const lastMonthTotal = lastMonthData.records.reduce((sum, e) => sum + e.amount, 0);

    // Fetch expense types with colors
    const expenseTypes = await ExpenseType.find({ user: userId }).select("_id name color").lean();

    // Create map: typeId -> { name, color }
    const typeColorMap = new Map(
      expenseTypes.map(t => [t._id.toString(), { name: t.name, color: t.color }])
    );

    // Aggregate by type ID (not name) - FIX: This prevents "Others" bug
    const categoryIdMap = new Map<string, { amount: number; count: number }>();

    currentMonthData.records.forEach(expense => {
      const typeId = expense.expenseType; // This is already a string from service
      const existing = categoryIdMap.get(typeId) || { amount: 0, count: 0 };
      categoryIdMap.set(typeId, {
        amount: existing.amount + expense.amount,
        count: existing.count + 1,
      });
    });

    // Build category breakdown with resolved names and colors
    const categoryBreakdown = Array.from(categoryIdMap.entries())
      .map(([typeId, data]) => {
        const typeInfo = typeColorMap.get(typeId);
        return {
          id: typeId,
          name: typeInfo?.name || "Unknown",
          amount: data.amount,
          count: data.count,
          percentage: currentMonthTotal > 0 ? (data.amount / currentMonthTotal) * 100 : 0,
          color: typeInfo?.color || "#9ca3af",
        };
      })
      .sort((a, b) => b.amount - a.amount);

    // Get top 5 categories
    const topCategories = categoryBreakdown.slice(0, 5);

    // Get recent expenses (last 5)
    const recentExpenses = currentMonthData.records
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
      .map(expense => {
        const typeInfo = typeColorMap.get(expense.expenseType);
        return {
          id: expense.id,
          shortName: expense.shortName,
          amount: expense.amount,
          categoryName: typeInfo?.name || "Unknown",
          categoryColor: typeInfo?.color || "#9ca3af",
          date: expense.date,
        };
      });

    // Calculate daily average
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const dailyAverage = currentMonthTotal / daysInMonth;
    const averageExpense =
      currentMonthData.records.length > 0 ? currentMonthTotal / currentMonthData.records.length : 0;

    // Find highest expense
    const highestExpense =
      currentMonthData.records.length > 0
        ? (() => {
            const highest = currentMonthData.records.reduce((prev, curr) =>
              prev.amount > curr.amount ? prev : curr
            );
            const typeInfo = typeColorMap.get(highest.expenseType);
            return {
              name: highest.shortName,
              amount: highest.amount,
              category: typeInfo?.name || "Unknown",
              date: highest.date,
            };
          })()
        : null;

    // Find highest spending day
    const daySpendingMap = new Map<string, { amount: number; count: number }>();
    currentMonthData.records.forEach(expense => {
      const dateKey = new Date(expense.date).toDateString();
      const existing = daySpendingMap.get(dateKey) || { amount: 0, count: 0 };
      daySpendingMap.set(dateKey, {
        amount: existing.amount + expense.amount,
        count: existing.count + 1,
      });
    });

    let highestSpendingDay: { date: Date; amount: number; count: number } | null = null;
    if (daySpendingMap.size > 0) {
      let maxSpending = 0;
      for (const [dateKey, data] of daySpendingMap.entries()) {
        if (data.amount > maxSpending) {
          maxSpending = data.amount;
          highestSpendingDay = {
            date: new Date(dateKey),
            amount: data.amount,
            count: data.count,
          };
        }
      }
    }

    const monthLabel = now.toLocaleString("default", { month: "long" });

    return {
      currentMonthTotal,
      lastMonthTotal,
      dailyAverage,
      transactionCount: currentMonthData.records.length,
      monthLabel,
      categoryBreakdown,
      recentExpenses,
      topCategories,
      highestExpense,
      highestSpendingDay,
      averageExpense,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
}
