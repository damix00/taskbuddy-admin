"use server";

import { ReportProps, getReports } from "@/actions/reports";
import ReportsTable from "@/components/reports/ReportsTable";
import { ReportContentType } from "@/components/user_page/reports/types";
import ReviewReportsData from "./ReviewReportsData";

export default async function ReviewReports(props: ReportProps) {
    const data = await getReports({
        ...props,
        contentType: ReportContentType.REVIEW,
    });

    if (!data) {
        return <>No data</>;
    }

    return (
        <ReviewReportsData
            reviewUuid={props.reviewUuid!}
            page={props.page}
            data={data}
        />
    );
}
