"use server";

import { db } from "@/lib/database/prisma";

export async function updateVerifications({
    id,
    data,
}: {
    id: number;
    data: {
        email: boolean;
        phone: boolean;
    };
}): Promise<boolean> {
    try {
        await db.users.update({
            where: { id },
            data: {
                email_verified: data.email,
                phone_number_verified: data.phone,
            },
            select: {
                id: true,
            },
        });

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}
