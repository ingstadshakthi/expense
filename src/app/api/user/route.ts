import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { DEFAULT_EXPENSE_TYPES } from "@/constants";
import { ExpenseType } from "@/models/ExpenseType";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, image } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const newUser = await User.create({ name, email, image });

      const expenses = DEFAULT_EXPENSE_TYPES.map((exp) => ({
        ...exp,
        user: newUser._id,
      }));

      await ExpenseType.insertMany(expenses);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
