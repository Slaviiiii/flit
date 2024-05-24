"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignInSchema = z.object({
    email: z.string().email({
        message: "Email is not valid."
    }),
    password: z.string().min(1, {
        message: "Password is required."
    })
})

export const SignInForm = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof SignInSchema>) {
        console.log(values);
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
                                    <Input placeholder="john.doe@gmail.com" {...field} />
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

                    <Button type="submit" className="w-full">Sign In</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}