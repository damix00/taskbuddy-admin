"use server";

import { db } from "@/lib/database/prisma";

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
