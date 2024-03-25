import { CellContext } from "@tanstack/react-table";
import { Report } from "../types";

export function CreatedAtCell({ row }: CellContext<Report, any>) {
    return <div>{row.original.created_at.toDateString()}</div>;
}

export function UpdatedAtCell({ row }: CellContext<Report, any>) {
    return <div>{row.original.updated_at.toDateString()}</div>;
}
