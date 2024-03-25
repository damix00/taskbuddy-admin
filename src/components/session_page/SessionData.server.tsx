"use server";

import { db } from "@/lib/database/prisma";
import { UserSession } from "../user_page/sessions/types";
import { bigintToInt } from "@/utils/utils";
import { notFound } from "next/navigation";
import SessionUpdater from "./SessionUpdater";

async function getData({
    uuid,
    session_id,
}: {
    uuid: string;
    session_id: number;
}): Promise<UserSession | null> {
    try {
        const user = await db.users.findUnique({
            where: {
                uuid,
            },
        });

        if (!user) {
            return null;
        }

        const session = await db.scroll_sessions.findFirst({
            where: {
                id: session_id,
                user_id: user.id,
            },
        });

        if (!session) {
            return null;
        }

        return {
            ...session,
            id: bigintToInt(session.id),
            user_id: bigintToInt(session.user_id),
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function SessionData({
    uuid,
    session_id,
}: {
    uuid: string;
    session_id: number;
}) {
    const data = await getData({ uuid, session_id });

    if (!data) {
        return notFound();
    }

    return <SessionUpdater session={data} />;
}
