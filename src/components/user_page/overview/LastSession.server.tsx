import LocationDisplay from "@/components/display/LocationDisplay";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { UserCookie } from "@/hooks/use_user";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/database/prisma";
import { LastSession } from "./types";
import LastSessionData from "./LastSessionData";

// Returns information about the last session of a user
async function getData({
    uuid,
}: {
    uuid: string;
}): Promise<LastSession | null> {
    try {
        const uid = await db.users.findFirst({
            where: {
                uuid: uuid,
            },
            select: {
                id: true,
            },
        });

        if (!uid) {
            return null;
        }

        const lastSession = await db.scroll_sessions.findFirst({
            orderBy: { created_at: "desc" },
            where: {
                user_id: {
                    equals: uid.id,
                },
            },
        });

        const lastLocation = await db.scroll_sessions.findFirst({
            orderBy: { created_at: "desc" },
            where: {
                user_id: {
                    equals: uid.id,
                },
                lat: {
                    not: null,
                },
                OR: [
                    {
                        lat: {
                            not: 1000,
                        },
                    },
                ],
            },
        });

        const sessionCount = await db.scroll_sessions.count({
            where: {
                user_id: {
                    equals: uid.id,
                },
            },
        });

        if (!lastSession || !lastLocation) {
            return null;
        }

        return {
            lat: lastLocation.lat,
            lon: lastLocation.lon,
            time: lastSession.updated_at,
            session_count: sessionCount,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function LastSession({ uuid }: { uuid: string }) {
    const data = await getData({ uuid });

    if (!data) {
        return (
            <Card className="w-fit">
                <CardHeader>
                    <CardTitle>No data</CardTitle>
                    <CardDescription>
                        There is currently no session data available.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return <LastSessionData data={data} />;
}
