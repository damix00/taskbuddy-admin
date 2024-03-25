import { CellContext } from "@tanstack/react-table";
import { Report } from "../types";
import Link from "next/link";

export default function ReviewedByCell({ row }: CellContext<Report, any>) {
    return row.original.reviewed ? (
        <Link
            className="link"
            href={`/dashboard/users/${row.original.reviewed_by_user!.uuid}`}>
            @{row.original.reviewed_by_user!.username}
        </Link>
    ) : (
        <span>N/A</span>
    );
}
