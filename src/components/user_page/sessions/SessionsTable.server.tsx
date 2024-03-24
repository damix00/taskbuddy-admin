import { db } from "@/lib/database/prisma";
import { SessionsData } from "./types";
import { bigintToInt } from "@/utils/utils";
import SessionsContent from "./SessionsContent";

async function fetchData({
    uuid,
    page = 1,
    lastId,
    itemsPerPage = 20,
}: {
    uuid: string;
    page?: number;
    lastId?: number;
    itemsPerPage?: number;
}): Promise<SessionsData | null> {
    try {
        const user = await db.users.findFirst({
            where: {
                uuid: {
                    equals: uuid,
                },
            },
        });

        if (!user || !user.id) {
            return null;
        }

        const uid = user.id;

        const sessions = await db.scroll_sessions.findMany({
            where: {
                user_id: {
                    equals: uid,
                },
            },
            orderBy: {
                created_at: "desc",
            },
            take: itemsPerPage,
            skip: (page - 1) * itemsPerPage,
            cursor: lastId ? { id: lastId } : undefined,
        });

        const count = await db.scroll_sessions.count({
            where: {
                user_id: {
                    equals: uid,
                },
            },
        });

        const pages = Math.ceil(count / itemsPerPage);

        const s = sessions.map((session) => ({
            id: bigintToInt(session.id),
            user_id: bigintToInt(session.user_id),
            ip_address: session.ip_address,
            lat: session.lat,
            lon: session.lon,
            filters: session.filters,
            created_at: session.created_at,
        }));

        return {
            sessions: s,
            pages,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function SessionsTable({
    uuid,
    page = 1,
    lastId,
}: {
    uuid: string;
    page?: number;
    lastId?: number;
}) {
    const data = await fetchData({ uuid, page, lastId, itemsPerPage: 10 });

    if (!data) {
        return (
            <div className="text-muted-foreground">Error fetching data.</div>
        );
    }

    return (
        <SessionsContent uuid={uuid} data={data} page={page} lastId={lastId} />
    );
}
