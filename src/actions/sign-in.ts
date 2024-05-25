"use server";

import { SignInSchema } from "@/schemas";
import * as z from "zod";
import { signIn as signin } from "@/lib/auth";
import { AuthError } from "next-auth";

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
    const validatedFields = SignInSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    try {
        await signin("credentials", {
            email,
            password,
            redirectTo: "/",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": {
                    return { error: "Invalid Credentials!" };
                }
                default:
                    return { error: "Something went wrong!" };
            }
        }
    }
};
