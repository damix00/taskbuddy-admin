import { CellContext } from "@tanstack/react-table";
import { Report } from "../types";

export default function ReasonCell({ row }: CellContext<Report, any>) {
    return <div className="whitespace-pre-line">{row.original.reason}</div>;
}
