"use server";

import { db } from "@/lib/database/prisma";

export async function updateRole({
    userId,
    role,
}: {
    userId: number;
    role: string;
}): Promise<boolean> {
    try {
        const res = await db.users.update({
            where: {
                id: userId,
            },
            data: {
                role,
            },
            select: {
                id: true,
            },
        });

        if (!res || !res.id) {
            return false;
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function updateLimitedAccess({
    userId,
    limitedAccess,
}: {
    userId: number;
    limitedAccess: string[];
}): Promise<boolean> {
    try {
        const res = await db.users.update({
            where: {
                id: userId,
            },
            data: {
                limited_access: limitedAccess,
            },
            select: {
                id: true,
            },
        });

        if (!res || !res.id) {
            return false;
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function deleteAccount({
    userId,
}: {
    userId: number;
}): Promise<boolean> {
    try {
        const user = await db.users.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return false;
        }

        if (user.role === "admin") {
            return false;
        }

        // Delete reviews
        await db.reviews.deleteMany({
            where: {
                user_id: userId,
                OR: [
                    {
                        rating_for_id: userId,
                    },
                ],
            },
        });

        // Delete interests
        await db.user_interests.deleteMany({
            where: {
                user_id: userId,
            },
        });

        // Delete reports
        await db.user_reports.deleteMany({
            where: {
                user_id: userId,
                OR: [
                    {
                        AND: [
                            {
                                content_type: 2,
                            },
                            {
                                content_id: userId,
                            },
                        ],
                    },
                ],
            },
        });

        // Delete channel completions
        await db.job_completions.deleteMany({
            where: {
                completed_by_id: userId,
                OR: [
                    {
                        completed_for_id: userId,
                    },
                ],
            },
        });

        // Delete channels and messages
        await db.channels.deleteMany({
            where: {
                created_by_id: userId,
                OR: [
                    {
                        recipient_id: userId,
                    },
                ],
            },
        });

        // Delete all posts
        await db.posts.deleteMany({
            where: {
                user_id: userId,
            },
        });

        // Delete all logins
        await db.logins.deleteMany({
            where: {
                user_id: userId,
            },
        });

        // Permanent delete the user
        await db.users.delete({
            where: {
                id: userId,
            },
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
