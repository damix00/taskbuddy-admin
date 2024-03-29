"use client";

import { ReportResponse } from "../user_page/reports/types";
import ReportsTable from "./ReportsTable";

export default function ReportsData({
    data,
    page,
}: {
    data: ReportResponse;
    page: number;
}) {
    return (
        <ReportsTable
            reports={data.reports}
            pages={data.pages}
            page={page}
            getPageLink={(page: number) => `/dashboard/reports?page=${page}`}
        />
    );
}
