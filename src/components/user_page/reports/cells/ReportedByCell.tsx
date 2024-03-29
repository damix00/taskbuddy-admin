import { CellContext } from "@tanstack/react-table";
import { Report } from "../types";
import Link from "next/link";

export default function ReportedByCell({ row }: CellContext<Report, any>) {
    return row.original.created_by_user ? (
        <Link
            className="link"
            href={`/dashboard/users/${row.original.created_by_user.uuid}`}>
            @{row.original.created_by_user.username}
        </Link>
    ) : (
        <div>N/A</div>
    );
}
