"use client";

import ReportsTable from "@/components/reports/ReportsTable";
import { ReportResponse } from "@/components/user_page/reports/types";

export default function ReviewReportsData({
    data,
    page,
    reviewUuid,
}: {
    data?: ReportResponse | null;
    page: number;
    reviewUuid: string;
}) {
    return (
        <ReportsTable
            reports={data?.reports || []}
            pages={data?.pages || 1}
            page={page}
            getPageLink={(page) =>
                `/dashboard/reviews/${reviewUuid}/reports/?page=${page}`
            }
        />
    );
}
