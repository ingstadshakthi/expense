"use server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";
import { IUser, User } from "@/models/User";

export async function getUser(): Promise<IUser | null> {
  try {
    const [session] = await Promise.all([auth(), connectDB()]);
    if (!session?.user) return null;
    return User.findOne({ email: session.user.email }).select("-__v -createdAt -updatedAt");
  } catch (error) {
    logger.fatal(`Error in getting User: ${getErrorMessage(error)}`);
    return null;
  }
}

export async function updateUser(
  data: Partial<{ name: string; budget: number }>
): Promise<{ success: boolean; message: string }> {
  try {
    const [session] = await Promise.all([auth(), connectDB()]);
    if (!session?.user) {
      return { success: false, message: "Unauthorized" };
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.budget !== undefined && { budget: Math.max(0, data.budget) }),
      },
      { new: true }
    ).select("-__v -createdAt -updatedAt");

    if (!updatedUser) {
      return { success: false, message: "User not found" };
    }

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    logger.error(`Error updating user: ${getErrorMessage(error)}`);
    return { success: false, message: "Failed to update profile" };
  }
}
