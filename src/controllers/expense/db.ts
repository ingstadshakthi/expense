import mongoose from "mongoose";
import { Expense, IExpense } from "@/models/Expense";
import { ExpenseData, UserExpenseData } from "@/types/expense";
import { PaymentType } from "@/models/PaymentMethod";
import { ExpenseType } from "@/models/ExpenseType";

export const ExpenseDB = {
  async readByMonth(
    userId: mongoose.Types.ObjectId,
    year: number,
    month: number,
    page = 1,
    limit = 25,
    expenseTypes?: string[],
    paymentTypes?: string[]
  ): Promise<{ records: IExpense[]; total: number; page: number; totalPages: number }> {
    const start = new Date(year, month - 1, 1, 0, 0, 0);
    const end = new Date(year, month, 0, 23, 59, 59);

    type Query = {
      userId: mongoose.Types.ObjectId;
      date: { $gte: Date; $lte: Date };
      expenseType?: { $in: string[] };
      paymentType?: { $in: string[] };
    };

    const query: Query = {
      userId,
      date: { $gte: start, $lte: end },
    };

    // ✅ Resolve expenseType names → ObjectIds
    if (expenseTypes?.length && !expenseTypes.includes("All")) {
      const expenseTypeDocs = await ExpenseType.find({
        user: userId,
        name: { $in: expenseTypes },
      })
        .select("_id")
        .lean();
      query.expenseType = { $in: expenseTypeDocs.map(doc => doc._id as string) };
    }

    // ✅ Resolve paymentType names → ObjectIds
    if (paymentTypes?.length && !paymentTypes.includes("All")) {
      const paymentTypeDocs = await PaymentType.find({
        user: userId,
        name: { $in: paymentTypes },
      })
        .select("_id")
        .lean();
      query.paymentType = { $in: paymentTypeDocs.map(doc => doc._id as string) };
    }

    const total = await Expense.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    const records = await Expense.find(query)
      .populate("expenseType", "name")
      .populate("paymentType", "name")
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    return { records, total, page, totalPages };
  },

  async readOne(userId: mongoose.Types.ObjectId, id: string): Promise<IExpense | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return await Expense.findOne({ _id: objectId, userId }).exec();
  },

  async create(data: UserExpenseData): Promise<IExpense> {
    const expense = new Expense({ ...data });
    return await expense.save();
  },

  async update(
    userId: mongoose.Types.ObjectId,
    id: string,
    data: ExpenseData
  ): Promise<IExpense | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return await Expense.findOneAndUpdate(
      { _id: objectId, userId },
      { $set: data },
      { new: true }
    ).exec();
  },

  async remove(userId: mongoose.Types.ObjectId, id: string): Promise<{ deleted: boolean }> {
    const objectId = new mongoose.Types.ObjectId(id);
    const res = await Expense.deleteOne({ _id: objectId, userId }).exec();
    return { deleted: res.deletedCount === 1 };
  },
};
