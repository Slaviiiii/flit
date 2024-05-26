"use server";

import { getUserByEmail } from "@/data-access/user";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { SignUpSchema } from "@/schemas";

import bcrypt from "bcrypt";
import * as z from "zod";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
    const validatedFields = SignUpSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { name, email, password } = validatedFields.data;

    const hashedPass = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email is already taken!" };
    }

    const username = name.trim().split(" ")[0];

    await db
        .insert(users)
        .values({ name, email, password: hashedPass, username });
};
