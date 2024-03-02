import KillswitchData from "@/components/killswitches/KillswitchData";
import {
    KillswitchTypes,
    KillswitchesData,
} from "@/components/killswitches/types";
import { db } from "@/lib/database/prisma";
import { sleep } from "@/utils/utils";

async function getData(): Promise<KillswitchesData | null> {
    try {
        const killswitches = await db.killswitches.findMany({
            include: {
                users: true,
            },
        });

        const all_killswitches = [
            {
                key: KillswitchTypes.DISABLE_ALL,
                description: "Disable everything",
            },
            {
                key: KillswitchTypes.DISABLE_ROUTES,
                description: "Disable all routes",
            },
            {
                key: KillswitchTypes.DISABLE_AUTH,
                description: "Disable authentication",
            },
            {
                key: KillswitchTypes.DISABLE_REGISTRATION,
                description: "Disable registration",
            },
            {
                key: KillswitchTypes.DISABLE_LOGIN,
                description: "Disable login",
            },
            {
                key: KillswitchTypes.DISABLE_FAKE_DELAY,
                description: "Disable fake delay (during login)",
            },
            {
                key: KillswitchTypes.DISABLE_TWILIO,
                description: "Disable Twilio API",
            },
            {
                key: KillswitchTypes.DISABLE_POSTING,
                description: "Disable posting",
            },
            {
                key: KillswitchTypes.DISABLE_CHAT,
                description: "Disable chat",
            },
        ];

        return {
            killswitches: all_killswitches.map((killswitch) => {
                const killswitchData = killswitches.find(
                    (k) => k.type === killswitch.key
                );

                return {
                    ...killswitch,
                    enabled: killswitchData?.enabled || false,
                    added_by: killswitchData?.users?.username
                        ? `@${killswitchData?.users?.username}`
                        : "Unknown",
                    enabled_at: (
                        killswitchData?.updated_at || "-"
                    ).toLocaleString(),
                };
            }),
        };
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default async function Killswitches() {
    const data = await getData();

    return <KillswitchData data={data} loading={!data} />;
}
