import CardSkeleton from "@/components/display/CardSkeleton";
import Reports from "@/components/reports/Reports.server";
import { Suspense } from "react";

export default function ReportsPage({
    searchParams,
}: {
    searchParams: Record<string, string | undefined>;
}) {
    return (
        <div className="p-4">
            <Suspense
                fallback={
                    <CardSkeleton
                        randomHeight={false}
                        randomWidth={false}
                        width={400}
                    />
                }>
                <Reports page={parseInt(searchParams.page ?? "1")} />
            </Suspense>
        </div>
    );
}
