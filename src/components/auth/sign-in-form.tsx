"use client";

import { signIn } from "@/actions/sign-in";
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

import { SignInSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SignInForm = () => {
    const [passwordVisibility, setPasswordVisibility] = useState<boolean | undefined>(false);
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const router = useRouter();

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with a different provider!"
        : "";

    function onSubmit(values: z.infer<typeof SignInSchema>) {
        startTransition(() => {
            signIn(values)
                .then((data) => {
                    setError(data?.error);
                    if (!data.error) return router.push("/");
                })
        })
    }

    return (
        <CardWrapper
            title="Welcome back"
            label="Sign into an account"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/sign-up"
            showSocials
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
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

                    <AuthError message={error || urlError} />

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        Sign In
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}