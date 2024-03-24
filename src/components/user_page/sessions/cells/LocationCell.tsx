import { CellContext } from "@tanstack/react-table";
import { UserSession } from "../types";

export function LatCell({ row }: CellContext<UserSession, any>) {
    return (
        <div>
            {!row.original.lat || row.original.lat == 1000
                ? "N/A"
                : row.original.lat}
        </div>
    );
}

export function LonCell({ row }: CellContext<UserSession, any>) {
    return (
        <div>
            {!row.original.lon || row.original.lon == 1000
                ? "N/A"
                : row.original.lon}
        </div>
    );
}
