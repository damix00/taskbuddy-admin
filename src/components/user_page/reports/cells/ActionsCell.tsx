"use client";

import { CellContext } from "@tanstack/react-table";
import { Report, ReportContentType, openReportContent } from "../types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ExternalLink, MoreVertical } from "lucide-react";
import { getPostUuid } from "@/actions/posts";
import { getReviewUuid } from "@/actions/reviews";
import Link from "next/link";
import { getUserUuid } from "@/actions/management/user/users";

export default function ActionsCell({ row }: CellContext<Report, any>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="iconSm" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Report</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/reports/${row.original.id}`}>
                        View report
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="gap-4"
                    onClick={async () => {
                        await openReportContent(
                            row.original.content_type,
                            row.original.content_id
                        );
                    }}>
                    Open content
                    <DropdownMenuShortcut>
                        <ExternalLink className="w-4 h-4" />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
