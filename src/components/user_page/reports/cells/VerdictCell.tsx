import { CellContext } from "@tanstack/react-table";
import { Report } from "../types";

export default function VerdictCell({ row }: CellContext<Report, any>) {
    return row.original.verdict ? <div>Yes</div> : <div>No</div>;
}
