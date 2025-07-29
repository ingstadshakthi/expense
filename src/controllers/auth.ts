import "server-only";

import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { User as UserType } from "next-auth";

export async function storeUserIfNeeded(user: UserType) {
  await connectDB();

  const existing = await User.findOne({ email: user.email });
  if (!existing) {
    await User.create({
      name: user.name,
      email: user.email,
      image: user.image,
    });
  }
}
