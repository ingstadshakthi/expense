"use server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { IUser, User } from "@/models/User";

export async function getUser(): Promise<IUser | null> {
  //   const session = await auth();
  const [session] = await Promise.all([auth(), connectDB()]);
  if (!session?.user) return null;
  //   console.log({ session });
  //   await connectDB();
  return User.findOne({ email: session.user.email });
}
