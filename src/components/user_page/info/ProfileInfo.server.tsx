import { db } from "@/lib/database/prisma";
import { UserRow, getUserResponse } from "../../users/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notFound } from "next/navigation";
import Biography from "./Biography";
import ProfileLocation from "./Location";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";
import AccountInformation from "./AccountInformation";
import ProfileInformation from "./ProfileInformation";

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

    if (!user) {
        console.error("User not found");
        return notFound();
    }

    return (
        <div className="flex flex-col px-8 py-8 md:py-12 items-start">
            <div className="flex flex-col items-center w-full">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={user.profile.profile_picture} />
                    <AvatarFallback>
                        {user.user.first_name?.[0] || ""}
                        {user.user.last_name?.[0] || ""}
                    </AvatarFallback>
                </Avatar>
                <div className="text-md font-bold mt-2 whitespace-nowrap text-center">
                    {user.user.first_name} {user.user.last_name}
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <div className="text-muted-foreground text-sm text-center">
                        @{user.user.username}
                    </div>
                    {user.user.verified && (
                        <BadgeCheck size={16} color="var(--color-primary)" />
                    )}
                </div>
            </div>
            {user.profile.bio.length != 0 && <Biography user={user} />}
            {user.profile.location.lat && user.profile.location.lat != 1000 && (
                <ProfileLocation user={user} />
            )}
            <Separator className="my-4" />
            <AccountInformation user={user} />
            <Separator className="my-4" />
            <ProfileInformation user={user} />
        </div>
    );
}
