import { CellContext } from "@tanstack/react-table";
import { UserSession } from "../types";
import { timeAgo } from "@/utils/utils";

export default function CreatedAtCell({ row }: CellContext<UserSession, any>) {
    return (
        <div className="flex flex-row gap-4 items-center flex-wrap">
            <div>
                {row.original.created_at.toDateString()}{" "}
                {row.original.created_at.toLocaleTimeString()}
            </div>
            <div className="text-muted-foreground text-sm">
                {timeAgo(row.original.created_at)}
            </div>
        </div>
    );
}
