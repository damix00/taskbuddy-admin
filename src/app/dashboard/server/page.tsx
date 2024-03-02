import { PageContent, TopBar, TopBarTitle } from "@/components/nav/TopBar";
import { Suspense } from "react";
import KillswitchData from "@/components/killswitches/KillswitchData";
import Killswitches from "@/components/killswitches/Killswitches";

export default function ServerPage() {
    return (
        <div className="w-full">
            <TopBar>
                <TopBarTitle>Server Configuration</TopBarTitle>
            </TopBar>
            <PageContent>
                <Suspense fallback={<KillswitchData loading />}>
                    <Killswitches />
                </Suspense>
            </PageContent>
        </div>
    );
}
