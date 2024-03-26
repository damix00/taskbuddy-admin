"use server";

import { Review } from "@/components/user_page/reviews/types";
import { db } from "@/lib/database/prisma";
import { bigintToInt } from "@/utils/utils";

export async function getReviewUuid(reviewId: number): Promise<string | null> {
    try {
        const review = await db.reviews.findUnique({
            where: {
                id: reviewId,
            },
            select: {
                uuid: true,
            },
        });

        if (!review) {
            return null;
        }

        return review.uuid;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getReviewsForUser({
    userUuid,
    type,
    limit = 10,
    offset = 0,
}: {
    userUuid: string;
    type?: number;
    limit?: number;
    offset?: number;
}): Promise<Review[]> {
    try {
        const user = await db.users.findUnique({
            where: {
                uuid: userUuid,
            },
            select: {
                id: true,
            },
        });

        if (!user) {
            return [];
        }

        const userId = user.id;

        const reviews = await db.reviews.findMany({
            where: {
                rating_for_id: userId,
                type,
            },
            orderBy: {
                created_at: "desc",
            },
            take: limit,
            skip: offset,
        });

        const res: Review[] = [];

        for (const review of reviews) {
            const reviewedBy = await db.users.findUnique({
                where: {
                    id: review.user_id,
                },
            });

            if (!reviewedBy) {
                continue;
            }

            res.push({
                ...review,
                type: review.type as any,
                id: bigintToInt(review.id),
                user_id: bigintToInt(review.user_id),
                rating_for_id: bigintToInt(review.rating_for_id),
                post_id: bigintToInt(review.post_id),
                reviewed_by_user: {
                    ...reviewedBy,
                    id: bigintToInt(reviewedBy.id),
                    token_version: bigintToInt(reviewedBy.token_version),
                },
            });
        }

        return res;
    } catch (error) {
        console.error(error);
        return [];
    }
}
