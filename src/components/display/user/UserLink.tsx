import { Profile, User } from "@/components/users/types";
import Link from "next/link";

export default function UserLink({
    user,
    profile,
}: {
    user: User;
    profile: Profile;
}) {
    return (
        <Link href={`/dashboard/users/${user.uuid}`}>
            <div className="link">@{user.username}</div>
        </Link>
    );
}
