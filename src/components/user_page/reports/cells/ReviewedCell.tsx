import { CellContext } from "@tanstack/react-table";
import { Report } from "../types";

export default function ReviewedCell({ row }: CellContext<Report, any>) {
    return row.original.reviewed ? <div>Yes</div> : <div>No</div>;
}
