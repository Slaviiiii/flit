import { getUserByEmail } from "@/data-access/user";
import { db } from "@/db/index";

import { SignInSchema } from "@/schemas";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";

import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";

import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/sign-in",
        newUser: "/auth/sign-up",
    },
    trustHost: true,
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

                    const user = await getUserByEmail(email);

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
