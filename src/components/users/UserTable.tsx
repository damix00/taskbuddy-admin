"use client";

import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { CustomTable } from "../data/CustomTable";
import { Skeleton } from "../ui/skeleton";
import { DisplayUser, UserRow } from "./types";
import { Card } from "@/components/ui/card";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "../ui/context-menu";
import Link from "next/link";
import { copyText } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useControl } from "@/hooks/use_shift";
import { ExternalLink } from "lucide-react";

function UUIDCell({ cell }: { cell: any }) {
    return <div className="max-w-20 truncate">{cell.row.original.uuid}</div>;
}

const columns: ColumnDef<DisplayUser>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "uuid",
        header: "UUID",
        cell: UUIDCell,
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "first_name",
        header: "First Name",
    },
    {
        accessorKey: "last_name",
        header: "Last Name",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
    },
];

function RowWrapper({ row, children }: { row: any; children: any }) {
    const controlHeld = useControl();

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuLabel>@{row.original.username}</ContextMenuLabel>
                <ContextMenuSeparator />
                <ContextMenuItem asChild>
                    <div className="flex">
                        <Link
                            className="mr-2"
                            href={`/dashboard/users/${row.original.uuid}`}>
                            View profile
                        </Link>
                        {controlHeld && (
                            <ExternalLink className="w-4 h-4 text-primary/50" />
                        )}
                    </div>
                </ContextMenuItem>
                <ContextMenuSub>
                    <ContextMenuSubTrigger>Copy...</ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                        <ContextMenuItem
                            onClick={() => {
                                copyText(row.original.uuid);
                            }}>
                            UUID
                        </ContextMenuItem>
                        <ContextMenuItem
                            onClick={() => {
                                copyText(row.original.username);
                            }}>
                            Username
                        </ContextMenuItem>
                        <ContextMenuItem
                            onClick={() => {
                                copyText(row.original.email);
                            }}>
                            Email
                        </ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
            </ContextMenuContent>
        </ContextMenu>
    );
}

export default function UserTable({
    loading = false,
    users = [],
    page = 1,
}: {
    loading?: boolean;
    users?: UserRow[];
    page?: number;
}) {
    const table = useReactTable({
        data: users.map((user) => ({
            ...user.user,
            created_at: user.user.created_at.toDateString(),
            updated_at: user.user.updated_at.toDateString(),
        })),
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (loading) {
        return (
            <Card>
                <Skeleton className="h-96 w-96" />
            </Card>
        );
    }

    return (
        <Card>
            <CustomTable
                rowWrapper={RowWrapper}
                columns={columns}
                table={table}
            />
        </Card>
    );
}
