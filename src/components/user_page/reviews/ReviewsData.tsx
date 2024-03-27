"use client";

import { useEffect, useRef, useState } from "react";
import { Review, ReviewFilter, ReviewType } from "./types";
import { getReviewsForUser } from "@/actions/reviews";
import ReviewCard from "@/components/display/review/ReviewCard";
import { Button } from "@/components/ui/button";
import CardSkeleton from "@/components/display/CardSkeleton";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function ReviewsData({
    userUuid,
    type,
}: {
    userUuid: string;
    type: ReviewFilter;
}) {
    const fetched = useRef(false);
    const fetchedType = useRef(type);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const offset = useRef(0);
    const router = useRouter();

    const limit = 10;

    useEffect(() => {
        if (fetched.current && fetchedType.current == type) {
            return;
        }

        if (fetched.current && fetchedType.current != type) {
            fetched.current = false;
            fetchedType.current = type;
            setReviews([]);
            offset.current = 0;
        }

        if (fetched.current) {
            return;
        }

        fetched.current = true;
        fetchedType.current = type;

        fetchReviews();
    }, [type]);

    const fetchReviews = async () => {
        setLoading(true);

        const data = await getReviewsForUser({
            userUuid,
            type: type != ReviewFilter.ALL ? type : undefined,
            limit,
            offset: offset.current,
        });

        offset.current += data.length;

        setHasMore(data.length === limit);

        setLoading(false);
        setReviews((prev) => [...prev, ...data]);
    };

    return (
        <div className="flex flex-col w-full gap-2">
            <Select
                onValueChange={(v) => {
                    router.push(
                        `/dashboard/users/${userUuid}/reviews?type=${v}`
                    );
                }}
                defaultValue={type.toString()}>
                <SelectTrigger className="w-44">
                    <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value={ReviewFilter.ALL.toString()}>
                            All
                        </SelectItem>
                        <SelectItem value={ReviewFilter.EMPLOYER.toString()}>
                            As employee
                        </SelectItem>
                        <SelectItem value={ReviewFilter.EMPLOYEE.toString()}>
                            As employer
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className="flex flex-col items-center justify-start gap-4">
                {reviews.map((review) => (
                    <ReviewCard key={review.uuid} review={review} />
                ))}
                {!loading && reviews.length === 0 && (
                    <div className="text-muted-foreground">
                        This user doesn't have any reviews yet.
                    </div>
                )}
                {loading && (
                    <div className="flex flex-col items-center">
                        <CardSkeleton flex={false} count={3} />
                    </div>
                )}
                {reviews.length && hasMore ? (
                    <Button onClick={fetchReviews} disabled={loading}>
                        Load more
                    </Button>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
