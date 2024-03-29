import PostReports from "@/components/post_page/reports/PostReports_server";

export default function PostReportsPage({
    params,
    searchParams,
}: {
    searchParams: Record<string, string | undefined>;
    params: { uuid: string };
}) {
    return (
        <div className="p-4">
            <PostReports
                postUuid={params.uuid}
                page={parseInt((searchParams.page as string) || "1")}
            />
        </div>
    );
}
