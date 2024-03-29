import { getReports } from "@/actions/reports";
import ReportsData from "./ReportsData";

export default async function Reports({ page }: { page: number }) {
    const data = await getReports({ page });

    if (!data) {
        return <div className="text-muted-foreground">No reports found.</div>;
    }

    return <ReportsData page={page} data={data} />;
}
