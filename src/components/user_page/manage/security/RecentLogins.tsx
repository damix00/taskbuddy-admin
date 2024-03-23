import { db } from "@/lib/database/prisma";
import { bigintToInt } from "@/utils/utils";
import { RecentLogin } from "./types";
import RecentLoginData from "./RecentLoginData";

async function loadData(uuid: string): Promise<RecentLogin[]> {
    try {
        const found = await db.users.findUnique({
            where: {
                uuid,
            },
            select: {
                id: true,
            },
        });

        if (!found?.id) return [];

        const id = bigintToInt(found.id);

        const logins = await db.logins.findMany({
            where: {
                user_id: id,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        return logins.map((login) => ({
            ip: login.ip_address,
            userAgent: login.user_agent,
            date: login.created_at,
            id: bigintToInt(login.id),
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function SecurityRecentLogins({ uuid }: { uuid: string }) {
    const logins = await loadData(uuid);

    return <RecentLoginData logins={logins} />;
}
