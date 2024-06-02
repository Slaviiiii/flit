"use server";

import { signIn as signin } from "@/lib/auth";
import { SignInSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
    const validatedFields = SignInSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    try {
        return await signin("credentials", {
            email,
            password,
            redirect: false,
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
