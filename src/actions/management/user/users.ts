"use server";

import { db } from "@/lib/database/prisma";

export async function getUserUuid({
    id,
}: {
    id: number;
}): Promise<string | null> {
    try {
        const u = await db.users.findUnique({
            where: {
                id,
            },
        });

        return u?.uuid ?? null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
