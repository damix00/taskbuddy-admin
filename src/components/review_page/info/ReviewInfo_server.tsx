"use server";

import { getReview } from "@/actions/reviews";
import { Review } from "@/components/user_page/reviews/types";
import { ReviewContextCreator } from "@/context/review_context";
import { notFound } from "next/navigation";
import ReviewInfoData from "./ReviewInfoData";

async function getData({ uuid }: { uuid: string }): Promise<Review | null> {
    try {
        const data = await getReview({ reviewUuid: uuid });

        if (!data) {
            return null;
        }

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function ReviewInfo({ uuid }: { uuid: string }) {
    const data = await getData({ uuid });

    if (!data) {
        return notFound();
    }

    return (
        <>
            <ReviewContextCreator review={data} />
            <ReviewInfoData />
        </>
    );
}
