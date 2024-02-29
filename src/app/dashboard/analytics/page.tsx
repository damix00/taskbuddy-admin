import { Suspense } from "react";
import Analytics from "./analytics";
import { PageContent, TopBar, TopBarTitle } from "@/components/nav/TopBar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserSkeleton } from "./data";

function AnalyticsSkeleton() {
    return (
        <div>
            <UserSkeleton />
        </div>
    );
}

export default function AnalyticsPage() {
    return (
        <div className="w-full">
            <TopBar>
                <TopBarTitle>Analytics</TopBarTitle>
            </TopBar>
            <PageContent>
                <Suspense fallback={<AnalyticsSkeleton />}>
                    <Analytics />
                </Suspense>
            </PageContent>
        </div>
    );
}
