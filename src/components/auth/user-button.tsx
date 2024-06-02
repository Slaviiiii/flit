import {
    LayoutDashboard,
    LogOut,
    Settings,
    User2
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { signOut } from "next-auth/react";
import { User as UserT } from "next-auth";

import Image from "next/image";
import Link from "next/link";

export const UserButton = ({
    user
}: {
    user: {
        id: string;
        username: string;
    } & UserT
}) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {user?.image ?
                    <Image
                        src={user?.image as string}
                        width={50}
                        height={45}
                        alt="profile"
                        className="rounded-full cursor-pointer"
                    />
                    : <div className="p-3 rounded-full bg-secondary">
                        <User2 />
                    </div>
                }
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute right-0 min-w-36">
                <DropdownMenuLabel>@{user?.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href={`/profile/${user?.username}`}>
                        <DropdownMenuItem>
                            <User2 className="w-4 h-4 mr-2" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={"/dashboard"}>
                        <DropdownMenuItem>
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            <span>Dashboard</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={"/settings"}>
                        <DropdownMenuItem>
                            <Settings className="w-4 h-4 mr-2" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => signOut({
                        callbackUrl: "/auth/sign-in"
                    })}>
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}