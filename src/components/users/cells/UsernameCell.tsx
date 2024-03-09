import { CellContext } from "@tanstack/react-table";
import { DisplayUser } from "../types";
import Link from "next/link";

export default function UsernameCell({ row }: CellContext<DisplayUser, any>) {
    return (
        <Link className="link" href={`/dashboard/users/${row.original.uuid}`}>
            @
            {row.original.username.length > 20
                ? row.original.username.slice(0, 20) + "..."
                : row.original.username}
        </Link>
    );
}
