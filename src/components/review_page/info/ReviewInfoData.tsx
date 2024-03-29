"use client";

import { getUserUuid } from "@/actions/management/user/users";
import { Button } from "@/components/ui/button";
import { ReviewContext } from "@/context/review_context";
import Link from "next/link";
import { useContext } from "react";

export default function ReviewInfoData() {
    const context = useContext(ReviewContext);

    if (!context || !context.review) {
        return <></>;
    }

    const review = context.review;

    return (
        <div className="flex flex-col p-8 gap-2">
            <Link
                className="text-xs text-muted-foreground link"
                href={`/dashboard/users/${review.reviewed_by_user.uuid}`}>
                @{review.reviewed_by_user.username}
            </Link>
            <div className="flex flex-col">
                {/* Title */}
                <div className="text-xl font-bold">{review.title}</div>
                {/* Description */}
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {review.description}
                </div>
            </div>
            {/* Rating */}
            <div className="flex flex-row gap-2 text-sm flex-wrap">
                <div>{review.rating}/5</div>·
                <div className="text-muted-foreground">
                    {review.type == 0 ? "Was the employer" : "Was the employee"}
                </div>
                ·
                <div className="text-muted-foreground">
                    {review.created_at.toDateString()}
                </div>
            </div>
            <Button
                variant="outline"
                onClick={async () => {
                    const uuid = await getUserUuid({
                        id: review.rating_for_id,
                    });

                    if (!uuid) {
                        return;
                    }

                    window.open(`/dashboard/users/${uuid}`, "_blank");
                }}>
                Open user
            </Button>
        </div>
    );
}
