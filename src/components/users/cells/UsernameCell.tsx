import { CellContext } from "@tanstack/react-table";
import { DisplayUser, User } from "../types";
import Link from "next/link";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import UserHoverCard from "@/components/display/user/UserHoverCard";

export default function UsernameCell({ row }: CellContext<DisplayUser, any>) {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <Link
                    className="link"
                    href={`/dashboard/users/${row.original.uuid}`}>
                    @
                    {row.original.username.length > 20
                        ? row.original.username.slice(0, 20) + "..."
                        : row.original.username}
                </Link>
            </HoverCardTrigger>
            <UserHoverCard user={row.original} profile={row.original.profile} />
        </HoverCard>
    );
}
