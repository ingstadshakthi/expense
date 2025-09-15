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
    return User.findOne({ email: session.user.email }).select(
      "-__v -createdAt -updatedAt",
    );
  } catch (error) {
    logger.fatal(`Error in getting User: ${getErrorMessage(error)}`);
    return null;
  }
}
