"use server";

import getApp from "@/lib/database/firebase";
import { db } from "@/lib/database/prisma";

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

export async function sendNotification({
    userId,
    title,
    body,
    image,
}: {
    userId: number;
    title: string;
    body: string;
    image?: string;
}): Promise<boolean> {
    try {
        // Get FCM tokens
        const tokens = await db.notification_tokens.findMany({
            where: {
                user_id: userId,
            },
        });

        if (!tokens || tokens.length == 0) {
            console.error(`No tokens found for user ${userId}`);
            return false;
        }

        // Send notification
        const admin = getApp();

        const messaging = admin.messaging();

        const r = await messaging.sendEachForMulticast({
            data: {
                title,
                body,
            },
            notification: {
                title,
                body,
                imageUrl: image && image.length > 0 ? image : undefined,
            },
            android: {
                priority: "high",
            },
            tokens: tokens.map((t) => t.token),
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
