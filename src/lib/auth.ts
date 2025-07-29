import NextAuth, { User as UserType } from "next-auth";
import Google from "next-auth/providers/google";
import { NextRequest } from "next/server";
import { storeUserIfNeeded } from "@/controllers/auth";

interface Authorized {
  auth: {
    user: UserType | null;
  };
  request: NextRequest;
}

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    authorized({ auth, request }: Authorized) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: UserType }) {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            image: user.image,
          }),
        });

        if (!res.ok) {
          console.error("Failed to create user via API", await res.json());
          return false;
        }

        return true;
      } catch (err) {
        console.error("Error in signIn callback:", err);
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
