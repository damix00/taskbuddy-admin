"use client";

import memoize from "@/hooks/custom_memo";
import { SessionsData, UserSession } from "./types";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { CustomTable, PaginateTable } from "@/components/data/CustomTable";
import CreatedAtCell from "./cells/CreatedAtCell";
import { LatCell, LonCell } from "./cells/LocationCell";
import { Card } from "@/components/ui/card";
import ActionsCell from "./cells/ActionsCell";

const columns: ColumnDef<UserSession>[] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "IP Address",
        accessorKey: "ip_address",
    },
    {
        header: "Latitude",
        accessorKey: "lat",
        cell: LatCell,
    },
    {
        header: "Longitude",
        accessorKey: "lon",
        cell: LonCell,
    },
    {
        header: "Created At",
        accessorKey: "created_at",
        cell: CreatedAtCell,
    },
    {
        id: "actions",
        cell: ActionsCell,
    },
];

export default function SessionsContent({
    uuid,
    data,
    page,
    lastId,
}: {
    data: SessionsData;
    page: number;
    uuid: string;
    lastId?: number;
}) {
    const table = memoize(
        () =>
            useReactTable({
                data: data.sessions,
                columns,
                getCoreRowModel: getCoreRowModel(),
            }),
        [data.sessions]
    );

    const getPageLink = (page: number) => {
        return `/dashboard/users/${uuid}/sessions?page=${page}`;
    };

    return (
        <Card>
            <CustomTable columns={columns} table={table} />
            {data.pages > 1 && (
                <PaginateTable
                    pages={data.pages}
                    page={page}
                    nextHref={getPageLink(page + 1)}
                    prevHref={getPageLink(page - 1)}
                    currentHref={getPageLink(page)}
                />
            )}
        </Card>
    );
}
