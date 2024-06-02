"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search, X } from "lucide-react";
import { useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { UserButton } from "./auth/user-button";

export const Header = () => {
    const [searchBoxOpen, setSearchBoxOpen] = useState(false);
    const session = useSession();
    const user = session.data?.user;

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
                            className="absolute ml-3 text-primary/80"
                            size={22} />
                        <Input
                            placeholder="Search"
                            className="text-base border-none rounded-full pl-11 h-11 placeholder:text-primary/80 bg-secondary" />
                    </div>
                </div>
                <div className="flex items-center gap-x-5 max-md:gap-x-3">
                    <div
                        className={"hidden rounded-full p-3 bg-secondary max-sm:inline-flex"}
                        onClick={() => setSearchBoxOpen(isOpen => !isOpen)}>
                        {searchBoxOpen ?
                            <X className="h-[1.4rem] w-[1.4rem]" />
                            : <Search className="h-[1.4rem] w-[1.4rem]" />
                        }
                    </div>
                    <ModeToggle />

                    {user && <UserButton user={user} />}

                    {!user && session.status !== "loading" &&
                        <>
                            <Button
                                className="px-6 text-base rounded-full max-md:px-5"
                                size={"lg"}
                                asChild
                            >
                                <Link href={"/auth/sign-in"}>Sign In</Link>
                            </Button>
                            <Button
                                variant={"secondary"}
                                className="px-6 text-base rounded-full max-md:px-5 max-sm:hidden"
                                size={"lg"}
                                asChild
                            >
                                <Link href={"/auth/sign-up"}>Sign Up</Link>
                            </Button>
                        </>
                    }
                </div>
            </div>
            {
                searchBoxOpen ?
                    <div className="relative flex items-center mx-4 my-3.5">
                        <Search
                            className="absolute right-5 text-primary/80"
                            size={22} />
                        <Input
                            maxLength={35}
                            placeholder="Search"
                            className="h-12 pl-5 text-base border-none rounded-full placeholder:text-primary/80 bg-secondary" />
                    </div>
                    : null
            }
        </header >
    )
}