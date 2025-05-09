import { Suspense } from "react";
import Analytics from "./Analytics_server";
import { PageContent, TopBar, TopBarTitle } from "@/components/nav/TopBar";
import AnalyticsData from "./data";

export default function AnalyticsPage() {
    return (
        <div className="w-full">
            <TopBar>
                <TopBarTitle>Analytics</TopBarTitle>
            </TopBar>
            <PageContent>
                <Suspense fallback={<AnalyticsData loading />}>
                    <Analytics />
                </Suspense>
            </PageContent>
        </div>
    );
}
