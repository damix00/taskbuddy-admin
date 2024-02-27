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

export default function ProfileData() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
                <div className="flex items-center border rounded-md px-2 py-2">
                    <img
                        src="https://picsum.photos/200/200"
                        alt="Profile picture"
                        className="w-6 h-6 rounded-full"
                    />
                    <div className="flex flex-col items-start ml-2">
                        <p className="font-semibold text-sm">John Doe</p>
                    </div>
                    <ChevronDown className="w-4 h-4 ml-auto" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="flex justify-between"
                    onClick={async () => {
                        await logout();
                    }}>
                    Log out
                    <LogOutIcon className="w-4 h-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
