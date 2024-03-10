import { CellContext } from "@tanstack/react-table";
import { DisplayUser } from "../types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { copyText } from "@/utils/utils";
import { MoreVertical } from "lucide-react";

export default function ActionsCell({ row }: CellContext<DisplayUser, any>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="iconSm">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>@{row.original.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/users/${row.original.uuid}`}>
                        View profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Copy</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem
                            onClick={() => {
                                copyText(row.original.uuid);
                            }}>
                            UUID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                copyText(row.original.username);
                            }}>
                            Username
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                copyText(row.original.email);
                            }}>
                            Email
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
