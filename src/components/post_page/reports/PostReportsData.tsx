"use client";

import ReportsTable from "@/components/reports/ReportsTable";
import { Report, ReportResponse } from "@/components/user_page/reports/types";

export default function PostReportsData({
    data,
    page,
    postUuid,
}: {
    data?: ReportResponse | null;
    page: number;
    postUuid: string;
}) {
    return (
        <ReportsTable
            reports={data?.reports || []}
            pages={data?.pages || 1}
            page={page}
            uuid={postUuid}
            getPageLink={(page) =>
                `/dashboard/posts/${postUuid}/reports/?page=${page}`
            }
        />
    );
}
