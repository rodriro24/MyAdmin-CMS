import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";

import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    id?: string;
  }
}

type User = {
  id: string;
  email: string;
  password: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "user@domain.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials || {};

        if (!email || !password) {
          throw new Error("Missing email or password");
        }

        const userFound = await prisma.user.findUnique({
          where: { email },
        });

        if (!userFound) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          userFound.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        // Convert id to string to match User type
        console.log("User authenticated:", userFound);
        return {
          email: userFound.email,
          name: userFound.name,
          id: userFound.id.toString(),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      return token
    }, async session({ session, user, token }) {
      if (token) {
        session.id = token.sub 
      }
      return session
    },
  } ,
  pages: {
    signIn: "/auth/login",
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
