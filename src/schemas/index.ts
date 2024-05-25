import * as z from "zod";

export const SignInSchema = z.object({
    email: z.string().email({
        message: "Email is not valid.",
    }),
    password: z.string().min(1, {
        message: "Password is required.",
    }),
});

export const SignUpSchema = z.object({
    name: z.string().min(1, {
        message: "Name is reqired.",
    }),
    email: z.string().email({
        message: "Email is not valid.",
    }),
    password: z
        .string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/,
            "Password should be 6 to 20 characters long with at least 1 numeric, 1 lowercase and 1 uppercase letter."
        ),
});
