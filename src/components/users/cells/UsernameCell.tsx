import { CellContext } from "@tanstack/react-table";
import { DisplayUser } from "../types";
import UserLink from "@/components/display/user/UserLink";

export default function UsernameCell({ row }: CellContext<DisplayUser, any>) {
    return <UserLink user={row.original} profile={row.original.profile} />;
}
