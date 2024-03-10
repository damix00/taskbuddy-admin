import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { Profile, User } from "@/components/users/types";
import Link from "next/link";
import UserHoverCard from "./UserHoverCard";

export default function UserLink({
    user,
    profile,
}: {
    user: User;
    profile: Profile;
}) {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <Link className="link" href={`/dashboard/users/${user.uuid}`}>
                    @{user.username}
                </Link>
            </HoverCardTrigger>
            <UserHoverCard user={user} profile={profile} />
        </HoverCard>
    );
}
