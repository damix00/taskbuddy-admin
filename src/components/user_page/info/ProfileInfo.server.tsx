import { db } from "@/lib/database/prisma";
import { UserRow, getUserResponse } from "../../users/types";

async function getUser(uuid: string): Promise<UserRow | null> {
    try {
        const user = await db.users.findUnique({
            where: {
                uuid,
            },
            include: {
                profiles: true,
            },
        });

        if (!user) {
            return null;
        }

        const profile = user.profiles[0];

        if (!profile) {
            return null;
        }

        return getUserResponse(user, profile);
    } catch (e) {
        return null;
    }
}

export default async function ProfileInfoData({ uuid }: { uuid: string }) {
    const user = await getUser(uuid);

    return <div>{user?.user.username}</div>;
}
