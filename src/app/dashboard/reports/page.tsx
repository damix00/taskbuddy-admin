import CardSkeleton from "@/components/display/CardSkeleton";
import { PageContent, TopBar, TopBarTitle } from "@/components/nav/TopBar";
import Reports from "@/components/reports/Reports_server";
import { Suspense } from "react";

export default function ReportsPage({
    searchParams,
}: {
    searchParams: Record<string, string | undefined>;
}) {
    return (
        <div className="w-full">
            <TopBar>
                <TopBarTitle>Reports</TopBarTitle>
            </TopBar>
            <PageContent>
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
            </PageContent>
        </div>
    );
}
