import { db } from "@/lib/database/prisma";

async function getUserPosts({ uuid }: { uuid: string }) {
    try {
        const user = await db.users.findUnique({
            where: {
                uuid,
            },
        });

        if (!user) {
            return [];
        }

        const posts = await db.posts.findMany({
            where: {
                user_id: {
                    equals: user.id,
                },
            },
            include: {
                post_interactions: true,
                post_location: true,
                post_removals: true,
            },
        });

        return posts;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function UserPosts({ uuid }: { uuid: string }) {
    const posts = await getUserPosts({ uuid });

    if (!posts.length) {
        return null;
    }

    return posts.map((post) => (
        <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
        </div>
    ));
}
