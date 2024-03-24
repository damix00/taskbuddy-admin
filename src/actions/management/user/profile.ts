"use server";

import { db } from "@/lib/database/prisma";

export async function updatePublicProfile({
    user_id,
    profile_id,
    first_name,
    last_name,
    username,
    bio,
    profile_picture,
}: {
    first_name: string;
    last_name: string;
    username: string;
    bio: string;
    profile_picture: string;
    user_id: number;
    profile_id: number;
}): Promise<boolean> {
    try {
        const res = await db.profiles.update({
            where: {
                id: profile_id,
            },
            data: {
                bio,
                profile_picture,
            },
        });

        if (!res) {
            return false;
        }

        const usersRes = await db.users.update({
            where: {
                id: user_id,
            },
            data: {
                first_name,
                last_name,
                username,
            },
        });

        if (!usersRes) {
            return false;
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
