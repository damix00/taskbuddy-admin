"use server";

import { db } from "@/lib/database/prisma";
import { UserRow, getUserResponse } from "../../users/types";
import { notFound } from "next/navigation";
import { UserContextCreator } from "@/context/user_context";
import ProfileInfoLayout from "@/app/dashboard/users/[uuid]/@info/page";
import ProfileInfoData from "./ProfileInfoData";

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

export default async function ProfileInfo({ uuid }: { uuid: string }) {
    const user = await getUser(uuid);

    if (!user) {
        console.error("User not found");
        return notFound();
    }

    return (
        <div className="flex flex-col px-8 py-8 lg:py-12 items-start">
            <UserContextCreator user={user} />
            <ProfileInfoData />
        </div>
    );
}
