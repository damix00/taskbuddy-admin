import { CellContext } from "@tanstack/react-table";
import { Report } from "../types";

export default function ReviewedCell({ row }: CellContext<Report, any>) {
    return row.original.reviewed ? <span>Yes</span> : <span>No</span>;
}
