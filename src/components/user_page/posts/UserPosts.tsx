"use client";

import { getUserPosts } from "@/actions/posts";
import CardSkeleton from "@/components/display/CardSkeleton";
import PostCard from "@/components/display/post/PostCard";
import { Button } from "@/components/ui/button";
import { bigintToInt } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";

export default function UserPosts({ uuid }: { uuid: string }) {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const loaded = useRef(false);
    const take = 10;

    const loadPosts = async () => {
        setLoading(true);

        const data = await getUserPosts({
            uuid,
            last:
                posts.length > 0 ? bigintToInt(posts[posts.length - 1].id) : 0,
            take,
        });

        if (data) {
            setPosts((prev) => [...prev, ...data]);
            setLoading(false);
            setHasMore(data.length >= take);
        }
    };

    useEffect(() => {
        if (loaded.current) {
            return;
        }

        loaded.current = true;
        loadPosts();
    }, []);

    return (
        <div className="flex flex-col items-center gap-4">
            {posts.map((post) => (
                <PostCard key={`${post.id}-${post.created_at}`} post={post} />
            ))}
            {loading && (
                <CardSkeleton
                    center
                    randomWidth={false}
                    count={5}
                    gap={16}
                    flex={false}
                />
            )}
            {!loading && posts.length === 0 && (
                <div className="text-muted-foreground">
                    This user has not posted anything yet.
                </div>
            )}
            {posts.length && hasMore ? (
                <Button onClick={loadPosts} disabled={loading}>
                    Load more
                </Button>
            ) : (
                <></>
            )}
        </div>
    );
}
