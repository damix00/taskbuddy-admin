import LocationDisplay from "@/components/display/LocationDisplay";
import { UserCookie } from "@/hooks/use_user";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/database/prisma";

async function getData({ uuid }: { uuid: string }): Promise<{
    lat: number;
    lon: number;
    time: Date;
} | null> {
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

        const data = await db.scroll_sessions.findFirst({
            orderBy: { created_at: "desc" },
            where: {
                lat: {
                    not: null,
                },
                user_id: {
                    equals: uid.id,
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

        if (!data) {
            return null;
        }

        if (!data.lat || !data.lon) {
            return null;
        }

        return {
            lat: data.lat,
            lon: data.lon,
            time: data.created_at,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function LastLocation({ uuid }: { uuid: string }) {
    const data = await getData({ uuid });

    if (!data) {
        return <div>No data</div>;
    }

    return (
        <div>
            <LocationDisplay
                height="500px"
                width="500px"
                lat={data!.lat}
                lon={data!.lon}
                name=""
            />
        </div>
    );
}
