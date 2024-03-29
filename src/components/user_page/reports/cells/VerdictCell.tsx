import { CellContext } from "@tanstack/react-table";
import { Report } from "../types";

export default function VerdictCell({ row }: CellContext<Report, any>) {
    if (!row.original.reviewed) {
        return <div className="text-muted-foreground">N/A</div>;
    }

    return row.original.verdict ? <div>Yes</div> : <div>No</div>;
}
