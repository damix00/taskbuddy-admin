import { CellContext } from "@tanstack/react-table";
import { DisplayUser } from "../types";
import Link from "next/link";

export default function UUIDCell({ row }: CellContext<DisplayUser, any>) {
    return (
        <Link
            className="link max-w-20"
            href={`/dashboard/users/${row.original.uuid}`}>
            <div className="max-w-20 truncate">{row.original.uuid}</div>
        </Link>
    );
}
