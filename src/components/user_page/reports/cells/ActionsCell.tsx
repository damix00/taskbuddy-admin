"use client";

import { CellContext } from "@tanstack/react-table";
import { Report, ReportContentType } from "../types";
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
                {row.original.content_type != ReportContentType.ACCOUNT && (
                    <DropdownMenuItem
                        className="gap-4"
                        onClick={async () => {
                            const type = row.original.content_type;

                            if (type == ReportContentType.POST) {
                                const uuid = await getPostUuid(
                                    row.original.content_id
                                );

                                if (uuid) {
                                    window.open(
                                        `/dashboard/posts/${uuid}`,
                                        "_blank"
                                    );
                                }
                            } else if (type == ReportContentType.REVIEW) {
                                const reviewUuid = await getReviewUuid(
                                    row.original.content_id
                                );

                                if (reviewUuid) {
                                    window.open(
                                        `/dashboard/reviews/${reviewUuid}`,
                                        "_blank"
                                    );
                                }
                            }
                        }}>
                        Open content
                        <DropdownMenuShortcut>
                            <ExternalLink className="w-4 h-4" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/reports/${row.original.id}`}>
                        View report
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
