"use client";

import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import memoize from "@/hooks/custom_memo";
import { CustomTable, PaginateTable } from "@/components/data/CustomTable";
import ReportedByCell from "../user_page/reports/cells/ReportedByCell";
import ContentTypeCell from "../user_page/reports/cells/ContentTypeCell";
import ReasonCell from "../user_page/reports/cells/ReasonCell";
import ReviewedCell from "../user_page/reports/cells/ReviewedCell";
import { Report } from "../user_page/reports/types";
import ReviewedByCell from "../user_page/reports/cells/ReviewedByCell";
import VerdictCell from "../user_page/reports/cells/VerdictCell";
import {
    CreatedAtCell,
    UpdatedAtCell,
} from "../user_page/reports/cells/DateCell";
import ActionsCell from "../user_page/reports/cells/ActionsCell";
import { Card } from "../ui/card";

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

export default function ReportsTable({
    reports,
    pages,
    page,
    getPageLink,
}: {
    reports: Report[];
    pages: number;
    page: number;
    getPageLink: (page: number) => string;
}) {
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
