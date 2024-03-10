import { HoverCardContent } from "@/components/ui/hover-card";
import { Profile, User } from "../../users/types";
import { CardDescription, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";

export default function UserHoverCard({
    user,
    profile,
}: {
    user: User;
    profile: Profile;
}) {
    return (
        <HoverCardContent className="truncate">
            <Link href={`/dashboard/users/${user.uuid}`}>
                <div className="flex flex-row items-start justify-start gap-2">
                    <Avatar>
                        <AvatarImage src={profile.profile_picture} />
                        <AvatarFallback>
                            {user.first_name[0]}
                            {user.last_name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-start items-start truncate">
                        <div className="font-bold text-base truncate">
                            {user.first_name} {user.last_name}
                        </div>
                        <div className="text-xs truncate">@{user.username}</div>
                    </div>
                </div>
            </Link>
        </HoverCardContent>
    );
}
