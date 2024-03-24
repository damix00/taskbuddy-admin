"use client";

import { CellContext } from "@tanstack/react-table";
import { UserSession } from "../types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLink, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/context/user_context";

export default function ActionsCell({ row }: CellContext<UserSession, any>) {
    const context = useContext(UserContext);

    if (!context || !context.user) {
        return <></>;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="iconSm">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Manage session</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link
                            href={`/dashboard/users/${
                                context!.user!.user.uuid
                            }/sessions/${row.original.id}`}>
                            View
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        View location
                        <DropdownMenuShortcut>
                            <ExternalLink className="w-4 h-4" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
