import { AuthHeader } from "@/components/auth/auth-header";
import { BackButton } from "@/components/auth/back-button";
import { Social } from "@/components/auth/social";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";

type CardWrapperProps = {
    children: ReactNode;
    label: string;
    title: string;
    backButtonHref: string;
    backButtonLabel: string;
    showSocials: boolean;
}

export const CardWrapper = (
    {
        children,
        label,
        title,
        backButtonHref,
        backButtonLabel,
        showSocials
    }: CardWrapperProps) => {
    return (
        <Card className="w-[450px] shadow-lg">
            <CardHeader>
                <AuthHeader title={title} label={label} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocials &&
                <CardFooter>
                    <Social />
                </CardFooter>
            }
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    )
}