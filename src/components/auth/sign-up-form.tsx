"use client";

import { signUp } from "@/actions/sign-up";

import { AuthError } from "@/components/auth/auth-error";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { SignUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SignUpForm = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof SignUpSchema>) {
        setError("");

        startTransition(() => {
            signUp(values)
                .then((data) => {
                    setError(data?.error);
                })
        })
    }

    return (
        <CardWrapper
            title="Join us today"
            label="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/sign-in"
            showSocials
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        placeholder="John Doe"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        placeholder="john.doe@gmail.com"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative flex">
                                        <Input
                                            disabled={isPending}
                                            type={passwordVisibility ? "text" : "password"}
                                            placeholder="******"
                                            {...field} />
                                        {passwordVisibility ?
                                            <EyeOff
                                                size={20}
                                                className="absolute right-2.5 top-2.5 cursor-pointer"
                                                onClick={() => setPasswordVisibility(false)}
                                            />
                                            :
                                            <Eye
                                                size={20}
                                                className="absolute right-2.5 top-2.5 cursor-pointer"
                                                onClick={() => setPasswordVisibility(true)}
                                            />
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <AuthError message={error} />

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Sign Up
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}