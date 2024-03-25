"use server";

import { db } from "@/lib/database/prisma";

export async function deleteSession({
    session_id,
}: {
    session_id: number;
}): Promise<boolean> {
    try {
        await db.session_posts.deleteMany({
            where: {
                scroll_session_id: session_id,
            },
        });

        await db.scroll_sessions.delete({
            where: {
                id: session_id,
            },
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
