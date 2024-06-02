import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";

export const Providers = async ({
    children
}: {
    children: React.ReactNode
}) => {
    return (

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SessionProvider>
                <Header />
                {children}
            </SessionProvider>
        </ThemeProvider>
    )
}