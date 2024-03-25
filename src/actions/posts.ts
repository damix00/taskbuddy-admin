"use server";

import { Post } from "@/components/user_page/posts/types";
import { db } from "@/lib/database/prisma";

export async function getUserPosts({
    uuid,
    last,
    take = 10,
}: {
    uuid: string;
    last?: number;
    take?: number;
}): Promise<Post[] | null> {
    try {
        const userId = await db.users.findUnique({
            where: {
                uuid,
            },
            select: {
                id: true,
            },
        });

        if (!userId) {
            return null;
        }

        const posts = await db.posts.findMany({
            take,
            skip: last ? 1 : 0,
            where: {
                user_id: userId.id,
            },
            cursor: last
                ? {
                      id: last,
                  }
                : undefined,
            orderBy: {
                created_at: "desc",
            },
            include: {
                post_interactions: true,
                post_location: true,
                post_removals: true,
                users: true,
            },
        });

        const tags: any[] = [];
        const media: any[] = [];

        for (const post of posts) {
            const tag = (await db.$queryRaw`
                SELECT
                    post_tag_relationship.tag_id,
                    post_tags.translations
                FROM post_tag_relationship
                JOIN post_tags ON post_tag_relationship.tag_id = post_tags.tag_id
                WHERE post_id = ${post.id}`) as any[];

            tags.push(tag);

            const med = (await db.$queryRaw`
                SELECT
                    post_media.type,
                    post_media.media
                FROM posts
                JOIN post_media ON post_media.post_id = posts.id
                WHERE posts.id = ${post.id}`) as any[];

            media.push(med);
        }

        return posts.map((post, i) => {
            return {
                ...post,
                user: post.users,
                tags: tags[i],
                media: media[i],
            };
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getPostUuid(postId: number): Promise<string | null> {
    try {
        const post = await db.posts.findUnique({
            where: {
                id: postId,
            },
            select: {
                uuid: true,
            },
        });

        if (!post) {
            return null;
        }

        return post.uuid;
    } catch (error) {
        console.error(error);
        return null;
    }
}
