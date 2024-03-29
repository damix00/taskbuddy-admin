"use server";

import { ReportContentType } from "./types";
import UserReportsTable from "./UserReportsTable";
import { ReportProps, getReports } from "@/actions/reports";

export default async function UserReports({
    userUuid,
    page = 1,
    itemsPerPage = 10,
}: ReportProps) {
    const reports = await getReports({
        userUuid: userUuid,
        page,
        itemsPerPage,
        contentType: ReportContentType.ACCOUNT,
    });

    return (
        <UserReportsTable
            reports={reports?.reports || []}
            pages={reports?.pages || 1}
            page={page}
            uuid={userUuid!}
        />
    );
}
