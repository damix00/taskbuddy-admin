"use client";

import { LogOutIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logout } from "@/actions/auth";
import useUser from "@/hooks/use_user";

export default function ProfileData() {
    const user = useUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full h-full md:block flex justify-center items-center">
                <div className="flex items-center border md:rounded-md rounded-full md:px-2 md:py-2 px-[2px] py-[2px] overflow-hidden">
                    <img
                        src={user.profile?.profile_picture}
                        alt=""
                        className="w-6 h-6 rounded-full"
                    />
                    <div className="hidden md:flex flex-col items-start ml-2">
                        <p className="font-semibold inline-block relative text-sm overflow-ellipsis overflow-hidden whitespace-nowrap">
                            {user.user?.first_name}
                        </p>
                    </div>
                    <ChevronDown className="hidden md:flex w-4 h-4 ml-auto text-zinc-500" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="flex justify-between"
                    onClick={async () => {
                        await logout();
                        window.location.href = "/";
                    }}>
                    Log out
                    <LogOutIcon className="w-4 h-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
