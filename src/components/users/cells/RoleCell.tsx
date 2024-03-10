import { CellContext } from "@tanstack/react-table";
import { DisplayUser } from "../types";
import UserLink from "@/components/display/user/UserLink";
import { Badge } from "@/components/ui/badge";

export default function RoleCell({ row }: CellContext<DisplayUser, any>) {
    return <Badge variant="outline">{row.original.role}</Badge>;
}
