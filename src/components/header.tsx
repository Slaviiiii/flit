"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Search, X } from "lucide-react";

export const Header = () => {
    const [searchBoxOpen, setSearchBoxOpen] = useState(false);

    return (
        <header className="w-full border-b">
            <div className="flex items-center px-[4vw] justify-between  w-full py-2 border-b">
                <div className="flex items-center gap-x-8 max-xl:gap-x-5 max-lg:gap-x-1">
                    <Link href={"/"} className="duration-200 hover:opacity-80 hover:-rotate-12">
                        <Image src={"/dark-logo.png"} width={65} height={65} alt="Flit logo" className="block dark:hidden" />
                        <Image src={"/light-logo.png"} width={65} height={65} alt="Flit logo" className="hidden dark:block" />
                    </Link>
                    <div className="flex items-center max-sm:hidden">
                        <Search
                            className="absolute ml-3.5 text-primary/80"
                            size={19} />
                        <Input
                            placeholder="Search"
                            className="pl-10 border-none rounded-full h-11 placeholder:text-primary/80 bg-secondary" />
                    </div>
                </div>
                <div className="flex gap-x-5 max-md:gap-x-3">
                    <div
                        className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "hidden rounded-full max-sm:inline-flex")}
                        onClick={() => setSearchBoxOpen(isOpen => !isOpen)}>
                        {searchBoxOpen ?
                            <X className="h-[1.2rem] w-[1.2rem]" />
                            : <Search className="h-[1.2rem] w-[1.2rem]" />
                        }
                    </div>
                    <ModeToggle />
                    <Button className="px-6 text-base rounded-full max-md:px-5" asChild>
                        <Link href={"/auth/sign-in"}>Sign In</Link>
                    </Button>
                    <Button
                        variant={"secondary"}
                        className="px-6 text-base rounded-full max-md:px-5 max-sm:hidden"
                        asChild>
                        <Link href={"/auth/sign-up"}>Sign Up</Link>
                    </Button>
                </div>
            </div>
            {searchBoxOpen ?
                <div className="relative flex items-center mx-5 my-3.5">
                    <Search
                        className="absolute right-5 text-primary/80"
                        size={19} />
                    <Input
                        placeholder="Search"
                        className="h-12 pl-5 border-none rounded-full placeholder:text-primary/80 bg-secondary" />
                </div>
                : null}
        </header >
    )
}