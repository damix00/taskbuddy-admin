"use server";

import { getReports } from "@/actions/reports";
import { ReportContextCreator } from "@/context/report_context";
import { notFound } from "next/navigation";

export default async function ReportServer({ id }: { id: number }) {
    const data = await getReports({
        reportId: id,
        page: 1,
    });

    if (!data) {
        return notFound();
    }

    return <ReportContextCreator report={data.reports[0]} />;
}
