import { connectDB } from "@/lib/db";
import { PaymentMethod, IPaymentMethod } from "@/models/PaymentMethod";
import { Types } from "mongoose";

type PaymentType = "Bank" | "Card" | "UPI" | "Cash";

export async function getAllPaymentMethods(): Promise<IPaymentMethod[]> {
  await connectDB();
  return PaymentMethod.find({}).sort({ createdAt: -1 });
}

export async function getPayment(userId: string): Promise<string[]> {
  await connectDB();
  return PaymentMethod.find({ userId: new Types.ObjectId(userId) }).sort({
    createdAt: -1,
    userId: -1,
  });
}

export async function createPaymentMethod(
  name: string,
  type: PaymentType,
  userId: string
): Promise<IPaymentMethod> {
  await connectDB();
  return PaymentMethod.create({ name, type, userId });
}

export async function updatePaymentMethod(
  id: string,
  updates: Partial<{ name: string; type: PaymentType }>,
  userId: string
): Promise<IPaymentMethod | null> {
  await connectDB();
  return PaymentMethod.findOneAndUpdate({ _id: id, userId }, updates, {
    new: true,
  });
}

export async function deletePaymentMethod(
  id: string,
  userId: string
): Promise<IPaymentMethod | null> {
  await connectDB();
  return PaymentMethod.findOneAndDelete({ _id: id, userId });
}
