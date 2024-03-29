import ReviewReports from "@/components/review_page/reports/ReviewReports_server";

export default function ReviewReportsPage({
    params,
    searchParams,
}: {
    params: {
        uuid: string;
    };
    searchParams: Record<string, string | undefined>;
}) {
    return (
        <div className="p-4">
            <ReviewReports
                reviewUuid={params.uuid}
                page={parseInt((searchParams.page as string) || "1")}
            />
        </div>
    );
}
