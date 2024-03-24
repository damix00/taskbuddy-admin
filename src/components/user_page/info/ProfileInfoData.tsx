"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserContext } from "@/context/user_context";
import { BadgeCheck } from "lucide-react";
import { useContext } from "react";
import ProfileLocation from "./Location";
import { Separator } from "@/components/ui/separator";
import AccountInformation from "./AccountInformation";
import JobInformation from "./JobInformation";
import Biography from "./Biography";
import ProfileSection from "./ProfileSection";

export default function ProfileInfoData() {
    const context = useContext(UserContext);

    if (!context || !context.user) {
        return <></>;
    }

    const user = context.user!;
    const suspended = user.user.limited_access.includes("suspended");

    return (
        <>
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
                {suspended && (
                    <Badge className="mt-2" variant="destructive">
                        Suspended
                    </Badge>
                )}
            </div>
            {user.profile.bio.length != 0 && <Biography user={user} />}
            {user.profile.location.lat && user.profile.location.lat != 1000 && (
                <ProfileLocation user={user} />
            )}
            <Separator className="my-4" />
            <AccountInformation user={user} />
            <Separator className="my-4" />
            <JobInformation user={user} />
        </>
    );
}
