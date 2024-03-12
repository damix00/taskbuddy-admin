"use client";

import { Column } from "@tanstack/react-table";
import { DisplayUser, getDefaultParams, getParamValues } from "../types";
import { Button } from "@/components/ui/button";
import { ArrowDownUp, MoveDown, MoveUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortableHeader({
    column,
    title,
    columnKey,
}: {
    column: Column<DisplayUser, any>;
    title: string;
    columnKey: string;
}) {
    const params = useSearchParams();
    const router = useRouter();

    const vals = getParamValues(params);

    return (
        <Button
            variant={vals.sort_by == columnKey ? "secondary" : "ghost"}
            onClick={() => {
                if (vals.sort_by == columnKey) {
                    router.push(
                        `/dashboard/users?${getDefaultParams(params, {
                            search: vals.search,
                            sort_order:
                                vals.sort_order == "desc" ? "asc" : "desc",
                            sort_by: columnKey,
                        })}`
                    );
                } else {
                    router.push(
                        `/dashboard/users?${getDefaultParams(params, {
                            search: vals.search,
                            sort_order: "asc",
                            sort_by: columnKey,
                        })}`
                    );
                }
            }}>
            {title}
            {columnKey != vals.sort_by ? (
                <ArrowDownUp className="ml-2 w-4 h-4" />
            ) : vals.sort_order == "desc" ? (
                <MoveDown className="ml-2 w-4 h-4" />
            ) : (
                <MoveUp className="ml-2 w-4 h-4" />
            )}
        </Button>
    );
}
