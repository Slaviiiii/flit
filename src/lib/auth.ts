import { getUserByEmail, getUserById } from "@/data-access/user";
import { db } from "@/db/index";

import { SignInSchema } from "@/schemas";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";

import NextAuth, { type DefaultSession } from "next-auth";
import { Adapter } from "next-auth/adapters";

import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
        } & DefaultSession["user"];
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/sign-in",
        newUser: "/auth/sign-up",
        error: "/auth/error",
    },
    trustHost: true,
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.username && session.user) {
                session.user.username = token.username as string;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser: any = await getUserById(token.sub);

            if (!existingUser) return token;

            token.username = existingUser.username;

            if (!existingUser.username) {
                token.username = existingUser.name.trim().split(" ")[0];
            }

            return token;
        },
    },
    adapter: DrizzleAdapter(db) as Adapter,
    session: { strategy: "jwt" },
    providers: [
        Google,
        Github,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const validatedFields = SignInSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user: any = await getUserByEmail(email);

                    if (!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (passwordMatch) return user;
                }

                return null;
            },
        }),
    ],
});
