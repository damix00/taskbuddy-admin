"use client";

import {
    CellContext,
    ColumnDef,
    Row,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import TableCard, { CustomTable } from "../data/CustomTable";
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
import React from "react";
import UUIDCell from "./cells/UUIDCell";
import UsernameCell from "./cells/UsernameCell";
import useMaxWidth from "@/hooks/use_max_width";

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
        cell: UsernameCell,
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
        accessorKey: "created_at_display",
        header: "Created At",
    },
];

function RowWrapper({
    row,
    children,
}: {
    row: Row<DisplayUser>;
    children: React.ReactNode;
}) {
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuLabel>@{row.original.username}</ContextMenuLabel>
                <ContextMenuSeparator />
                <ContextMenuItem asChild>
                    <Link href={`/dashboard/users/${row.original.uuid}`}>
                        View profile
                    </Link>
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
    pages = 1,
}: {
    loading?: boolean;
    users?: UserRow[];
    page?: number;
    pages?: number;
}) {
    const table = useReactTable({
        data: users.map((user) => ({
            ...user.user,
            created_at_display: user.user.created_at.toDateString(),
            updated_at_display: user.user.updated_at.toDateString(),
            profile: user.profile,
        })),
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const maxWidth = useMaxWidth();

    if (loading) {
        return (
            <Card>
                <Skeleton className="h-96 w-full" />
            </Card>
        );
    }

    return (
        <Card
            style={{
                maxWidth: `${maxWidth}px`,
            }}>
            <CustomTable
                rowWrapper={RowWrapper}
                columns={columns}
                table={table}
            />
        </Card>
    );
}
