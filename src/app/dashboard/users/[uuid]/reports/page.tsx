import CardSkeleton from "@/components/display/CardSkeleton";
import UserReports from "@/components/user_page/reports/UserReports.server";
import { Suspense } from "react";

export default function UserReportsPage({
    params,
    searchParams,
    ...props
}: {
    params: { uuid: string };
    searchParams: Record<string, string | undefined>;
}) {
    return (
        <div className="p-4">
            <Suspense fallback={<CardSkeleton />}>
                <UserReports
                    uuid={params.uuid}
                    page={parseInt((searchParams.page as string) || "1")}
                />
            </Suspense>
        </div>
    );
}
