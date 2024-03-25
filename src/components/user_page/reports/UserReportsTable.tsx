"use client";

import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Report } from "./types";
import memoize from "@/hooks/custom_memo";
import { CustomTable, PaginateTable } from "@/components/data/CustomTable";
import ReviewedCell from "./cells/ReviewedCell";
import ReviewedByCell from "./cells/ReviewedByCell";
import ContentTypeCell from "./cells/ContentTypeCell";
import { CreatedAtCell, UpdatedAtCell } from "./cells/DateCell";
import ReportedByCell from "./cells/ReportedByCell";
import { Card } from "@/components/ui/card";
import VerdictCell from "./cells/VerdictCell";
import ReasonCell from "./cells/ReasonCell";
import ActionsCell from "./cells/ActionsCell";

const columns: ColumnDef<Report>[] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Reported By",
        accessorKey: "reported_by",
        cell: ReportedByCell,
    },
    {
        header: "Content Type",
        accessorKey: "content_type",
        cell: ContentTypeCell,
    },
    {
        header: "Reason",
        accessorKey: "reason",
        cell: ReasonCell,
    },
    {
        header: "Reviewed",
        accessorKey: "reviewed",
        cell: ReviewedCell,
    },
    {
        header: "Reviewed By",
        accessorKey: "reviewed_by",
        cell: ReviewedByCell,
    },
    {
        header: "Verdict",
        accessorKey: "verdict",
        cell: VerdictCell,
    },
    {
        header: "Created At",
        accessorKey: "created_at",
        cell: CreatedAtCell,
    },
    {
        header: "Updated At",
        accessorKey: "updated_at",
        cell: UpdatedAtCell,
    },
    {
        id: "actions",
        cell: ActionsCell,
    },
];

export default function UserReportsTable({
    reports,
    pages,
    page,
    uuid,
}: {
    reports: Report[];
    pages: number;
    page: number;
    uuid: string;
}) {
    const getPageLink = (page: number) =>
        `/dashboard/users/${uuid}/reports/?page=${page}`;

    const table = memoize(
        () =>
            useReactTable({
                columns,
                data: reports,
                getCoreRowModel: getCoreRowModel(),
            }),
        [reports]
    );

    return (
        <Card>
            <CustomTable columns={columns} table={table} />
            {pages > 1 && (
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
