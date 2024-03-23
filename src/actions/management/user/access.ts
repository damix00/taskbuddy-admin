"use server";

import { db } from "@/lib/database/prisma";

export async function updateRole({
    userId,
    role,
}: {
    userId: number;
    role: string;
}): Promise<boolean> {
    try {
        const res = await db.users.update({
            where: {
                id: userId,
            },
            data: {
                role,
            },
            select: {
                id: true,
            },
        });

        if (!res || !res.id) {
            return false;
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function updateLimitedAccess({
    userId,
    limitedAccess,
}: {
    userId: number;
    limitedAccess: string[];
}): Promise<boolean> {
    try {
        const res = await db.users.update({
            where: {
                id: userId,
            },
            data: {
                limited_access: limitedAccess,
            },
            select: {
                id: true,
            },
        });

        if (!res || !res.id) {
            return false;
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
