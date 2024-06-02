"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
    const onSocialClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: "/"
        });
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size={"lg"}
                variant={"outline"}
                className="w-full"
                onClick={() => onSocialClick("google")}
            >
                <FcGoogle size={20} />
            </Button>
            <Button
                size={"lg"}
                variant={"outline"}
                className="w-full"
                onClick={() => onSocialClick("github")}
            >
                <FaGithub size={20} />
            </Button>
        </div>
    )
}