"use client";

import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { CustomTable, PaginateTable } from "../data/CustomTable";
import { Skeleton } from "../ui/skeleton";
import { DisplayUser, UserRow, getDefaultParams } from "./types";
import { Card } from "@/components/ui/card";
import UUIDCell from "./cells/UUIDCell";
import UsernameCell from "./cells/UsernameCell";
import useMaxWidth from "@/hooks/use_max_width";
import ActionsCell from "./cells/ActionsCell";
import RoleCell from "./cells/RoleCell";
import memoize from "@/hooks/custom_memo";
import { useRouter, useSearchParams } from "next/navigation";
import SortableHeader from "./cells/SortableHeader";

const columns: ColumnDef<DisplayUser>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <SortableHeader columnKey="id" column={column} title="ID" />
        ),
    },
    {
        accessorKey: "uuid",
        header: ({ column }) => (
            <SortableHeader columnKey="uuid" column={column} title="UUID" />
        ),
        cell: UUIDCell,
    },
    {
        accessorKey: "username",
        header: ({ column }) => (
            <SortableHeader
                columnKey="username"
                column={column}
                title="Username"
            />
        ),
        cell: UsernameCell,
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <SortableHeader columnKey="email" column={column} title="Email" />
        ),
    },
    {
        accessorKey: "first_name",
        header: ({ column }) => (
            <SortableHeader
                columnKey="first_name"
                column={column}
                title="First Name"
            />
        ),
    },
    {
        accessorKey: "last_name",
        header: ({ column }) => (
            <SortableHeader
                columnKey="last_name"
                column={column}
                title="Last Name"
            />
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: RoleCell,
    },
    {
        accessorKey: "created_at_display",
        header: ({ column }) => (
            <SortableHeader
                columnKey="created_at"
                column={column}
                title="Created At"
            />
        ),
    },
    {
        id: "actions",
        cell: ActionsCell,
    },
];

function TableContent({
    table,
    page,
    pages,
    lastId,
}: {
    table: any;
    page: number;
    pages: number;
    lastId?: number;
}) {
    const maxWidth = useMaxWidth();
    const params = useSearchParams();

    const getPageLink = (page: number) => {
        return `/dashboard/users?${getDefaultParams(params, {
            page: page.toString(),
            search: params.get("search") || "",
        })}`;
    };

    return (
        <Card
            style={{
                maxWidth: `${maxWidth}px`,
            }}>
            <CustomTable columns={columns} table={table} />
            {pages != 1 && (
                <PaginateTable
                    pages={pages}
                    page={page}
                    nextHref={getPageLink(page + 1)}
                    prevHref={getPageLink(page - 1)}
                    currentHref={getPageLink(page)}
                    lastHref={getPageLink(pages)}
                    firstHref={getPageLink(1)}
                />
            )}
        </Card>
    );
}

export default function UserTable({
    loading = false,
    users,
    page = 1,
    pages = 1,
    search = "",
}: {
    loading?: boolean;
    users?: UserRow[];
    page?: number;
    pages?: number;
    search?: string;
}) {
    const table = memoize(
        () =>
            useReactTable({
                data:
                    users?.map((user) => ({
                        ...user.user,
                        created_at_display: user.user.created_at.toDateString(),
                        updated_at_display: user.user.updated_at.toDateString(),
                        profile: user.profile,
                    })) || [],
                columns,
                getCoreRowModel: getCoreRowModel(),
            }),
        [users]
    );

    if (loading) {
        return (
            <Card>
                <Skeleton className="h-96 w-full" />
            </Card>
        );
    }

    return <TableContent page={page} pages={pages} table={table} />;
}
