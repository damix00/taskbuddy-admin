"use client";

import { useEffect, useRef, useState } from "react";
import { Review, ReviewFilter, ReviewType } from "./types";
import { getReviewsForUser } from "@/actions/reviews";
import ReviewCard from "@/components/display/review/ReviewCard";

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

    useEffect(() => {
        if (fetched.current && fetchedType.current == type) {
            return;
        }

        if (fetched.current && fetchedType.current != type) {
            fetched.current = false;
        }

        if (fetched.current) {
            return;
        }

        fetched.current = true;
        fetchedType.current = type;

        fetchReviews();
    }, [type]);

    const fetchReviews = async () => {
        const data = await getReviewsForUser({
            userUuid,
            type: type != ReviewFilter.ALL ? type : undefined,
        });

        console.log(data);

        setReviews((prev) => [...prev, ...data]);
    };

    return (
        <div>
            {reviews.map((review) => (
                <ReviewCard key={review.uuid} review={review} />
            ))}
        </div>
    );
}
