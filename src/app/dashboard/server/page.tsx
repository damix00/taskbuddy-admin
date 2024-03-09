import { PageContent, TopBar, TopBarTitle } from "@/components/nav/TopBar";
import { Suspense } from "react";
import KillswitchData from "@/components/server/killswitches/KillswitchData";
import Killswitches from "@/components/server/killswitches/Killswitches.server";
import ServerData, { ServerCard } from "../../../components/server/ServerData";
import RemoteConfig from "@/components/server/remote_config/RemoteConfig.server";
import { Separator } from "@/components/ui/separator";
import RemoteConfigData from "@/components/server/remote_config/RemoteConfigData";

export default function ServerPage() {
    return (
        <div className="w-full">
            <TopBar>
                <TopBarTitle>Server Configuration</TopBarTitle>
            </TopBar>
            <PageContent>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                        <Suspense fallback={<ServerCard loading />}>
                            <ServerData />
                        </Suspense>
                    </div>
                    <Separator />
                    <div className="flex flex-row flex-wrap gap-4">
                        <Suspense fallback={<KillswitchData loading />}>
                            <Killswitches />
                        </Suspense>
                        <Suspense fallback={<RemoteConfigData loading />}>
                            <RemoteConfig />
                        </Suspense>
                    </div>
                </div>
            </PageContent>
        </div>
    );
}
