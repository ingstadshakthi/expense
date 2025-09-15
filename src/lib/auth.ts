import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth?.user;
    },

    async signIn({ user }) {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
