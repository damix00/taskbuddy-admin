"use client";

import { CellContext } from "@tanstack/react-table";
import { UserSession } from "../types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLink, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/context/user_context";
import { openGoogleMaps } from "@/utils/utils";

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
            <DropdownMenuContent className="min-w-52">
                <DropdownMenuLabel>Manage session</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link
                            href={`/dashboard/users/${
                                context!.user!.user.uuid
                            }/sessions/${row.original.id}`}>
                            View
                        </Link>
                    </DropdownMenuItem>
                    {row.original.lat && row.original.lat != 1000 && (
                        <DropdownMenuItem
                            onClick={() => {
                                openGoogleMaps(
                                    row.original.lat!,
                                    row.original.lon!
                                );
                            }}>
                            Open in Google Maps
                            <DropdownMenuShortcut>
                                <ExternalLink className="w-4 h-4" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
