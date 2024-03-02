import { PageContent, TopBar, TopBarTitle } from "@/components/nav/TopBar";
import { Suspense } from "react";
import KillswitchData from "@/components/killswitches/KillswitchData";
import Killswitches from "@/components/killswitches/Killswitches";
import ServerData, { ServerCard } from "./ServerData";

export default function ServerPage() {
    return (
        <div className="w-full">
            <TopBar>
                <TopBarTitle>Server Configuration</TopBarTitle>
            </TopBar>
            <PageContent>
                <div className="flex flex-row flex-wrap gap-4">
                    <Suspense fallback={<KillswitchData loading />}>
                        <Killswitches />
                    </Suspense>
                    <Suspense fallback={<ServerCard loading />}>
                        <ServerData />
                    </Suspense>
                </div>
            </PageContent>
        </div>
    );
}
