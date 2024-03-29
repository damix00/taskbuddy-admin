"use server";

import { ReportProps, getReports } from "@/actions/reports";
import ReportsTable from "@/components/reports/ReportsTable";
import { ReportContentType } from "@/components/user_page/reports/types";
import PostReportsData from "./PostReportsData";

export default async function PostReports(props: ReportProps) {
    const data = await getReports({
        ...props,
        contentType: ReportContentType.POST,
    });

    if (!data) {
        return <>No data</>;
    }

    return (
        <PostReportsData
            postUuid={props.postUuid!}
            page={props.page}
            data={data}
        />
    );
}
