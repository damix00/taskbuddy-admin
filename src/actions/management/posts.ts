"use server";

import { db } from "@/lib/database/prisma";

export async function shadowBanPost({
    uuid,
    ban,
}: {
    uuid: string;
    ban: boolean;
}): Promise<boolean> {
    try {
        const post = await db.posts.findUnique({
            where: {
                uuid,
            },
        });

        if (!post) {
            return false;
        }

        const res = await db.post_removals.update({
            where: {
                id: post.removals_id,
            },
            data: {
                shadow_banned: ban,
            },
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function removePost({
    uuid,
    removed,
    reason,
}: {
    uuid: string;
    removed: boolean;
    reason?: string;
}): Promise<boolean> {
    try {
        const post = await db.posts.findUnique({
            where: {
                uuid,
            },
        });

        if (!post) {
            return false;
        }

        const res = await db.post_removals.update({
            where: {
                id: post.removals_id,
            },
            data: {
                removed: removed,
                removal_reason: reason,
            },
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function flagPost({
    uuid,
    flagged,
    reason,
}: {
    uuid: string;
    flagged: boolean;
    reason?: string;
}): Promise<boolean> {
    try {
        const post = await db.posts.findUnique({
            where: {
                uuid,
            },
        });

        if (!post) {
            return false;
        }

        const res = await db.post_removals.update({
            where: {
                id: post.removals_id,
            },
            data: {
                flagged: flagged,
                flagged_reason: reason,
            },
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function updatePostInfo({
    uuid,
    title,
    description,
}: {
    uuid: string;
    title: string;
    description: string;
}): Promise<boolean> {
    try {
        const post = await db.posts.update({
            where: {
                uuid,
            },
            data: {
                title,
                description,
            },
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
