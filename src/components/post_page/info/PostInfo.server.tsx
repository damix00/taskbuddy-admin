import { Post } from "@/components/user_page/posts/types";
import PostInfoData from "./PostInfoData";
import { notFound } from "next/navigation";
import { getPosts } from "@/actions/posts";

async function getData({ uuid }: { uuid: string }): Promise<Post | null> {
    try {
        const post = await getPosts({
            postUuid: uuid,
        });

        if (!post) {
            return null;
        }

        return post[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function PostInfo({ uuid }: { uuid: string }) {
    const post = await getData({ uuid });

    if (!post) {
        return notFound();
    }

    return <PostInfoData post={post} />;
}
