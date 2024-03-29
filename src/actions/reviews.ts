"use server";

import { Review, ReviewType } from "@/components/user_page/reviews/types";
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

export async function getReview({
    reviewUuid,
}: {
    reviewUuid: string;
}): Promise<Review | null> {
    try {
        const review = await db.reviews.findUnique({
            where: {
                uuid: reviewUuid,
            },
        });

        if (!review) {
            return null;
        }

        const reviewedBy = await db.users.findUnique({
            where: {
                id: review.user_id!,
            },
        });

        if (!reviewedBy) {
            return null;
        }

        return {
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
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateReview({
    reviewId,
    title,
    description,
    rating,
}: {
    reviewId: number;
    title: string;
    description: string;
    rating: number;
}): Promise<boolean> {
    try {
        const review = await db.reviews.findUnique({
            where: {
                id: reviewId,
            },
        });

        if (!review) {
            return false;
        }

        const profile = await db.profiles.findFirst({
            where: {
                user_id: review.rating_for_id,
            },
        });

        if (!profile) {
            return false;
        }

        let sum: number;

        if (review.type == ReviewType.EMPLOYEE) {
            sum = profile.rating_sum_employer - review.rating + rating;
        } else {
            sum = profile.rating_sum_employee - review.rating + rating;
        }

        let newRating: number;

        if (review.type == ReviewType.EMPLOYEE) {
            newRating = profile.rating_count_employer
                ? sum / profile.rating_count_employer
                : 0;
        } else {
            newRating = profile.rating_count_employee
                ? sum / profile.rating_count_employee
                : 0;
        }

        await db.reviews.update({
            where: {
                id: reviewId,
            },
            data: {
                title,
                description,
                rating,
            },
        });

        await db.profiles.updateMany({
            where: {
                user_id: review.rating_for_id!,
            },
            data: {
                rating_sum_employer:
                    review.type == ReviewType.EMPLOYEE ? sum : undefined,
                rating_sum_employee:
                    review.type == ReviewType.EMPLOYER ? sum : undefined,
                rating_employer:
                    review.type == ReviewType.EMPLOYEE ? newRating : undefined,
                rating_employee:
                    review.type == ReviewType.EMPLOYER ? newRating : undefined,
            },
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function deleteReview({
    reviewId,
}: {
    reviewId: number;
}): Promise<boolean> {
    try {
        const review = await db.reviews.findUnique({
            where: {
                id: reviewId,
            },
        });

        if (!review) {
            return false;
        }

        const profile = await db.profiles.findFirst({
            where: {
                user_id: review.rating_for_id,
            },
        });

        if (!profile) {
            return false;
        }

        let sum: number;
        let newCount: number;

        if (review.type == ReviewType.EMPLOYEE) {
            sum = profile.rating_sum_employer - review.rating;
            newCount = profile.rating_count_employer - 1;
        } else {
            sum = profile.rating_sum_employee - review.rating;
            newCount = profile.rating_count_employee - 1;
        }

        let newRating = newCount ? sum / newCount : 0;

        await db.reviews.delete({
            where: {
                id: reviewId,
            },
        });

        await db.profiles.updateMany({
            where: {
                user_id: review.rating_for_id!,
            },
            data: {
                rating_sum_employer:
                    review.type == ReviewType.EMPLOYEE ? sum : undefined,
                rating_sum_employee:
                    review.type == ReviewType.EMPLOYER ? sum : undefined,
                rating_employer:
                    review.type == ReviewType.EMPLOYEE ? newRating : undefined,
                rating_employee:
                    review.type == ReviewType.EMPLOYER ? newRating : undefined,
            },
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
