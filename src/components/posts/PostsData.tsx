"use client";

import { bigintToInt } from "@/utils/utils";
import CardSkeleton from "../display/CardSkeleton";
import PostCard from "../display/post/PostCard";
import { Button } from "../ui/button";
import { getPosts } from "@/actions/posts";
import { useEffect, useRef, useState } from "react";

export default function PostsData({
    searchParams,
}: {
    searchParams: Record<string, string | undefined>;
}) {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const lastId = useRef<number | null>(null);
    const loaded = useRef(false);
    const fetchedQuery = useRef(searchParams.search);

    const take = 3;

    const loadPosts = async () => {
        setLoading(true);

        const data = await getPosts({
            last: lastId.current ?? 0,
            take,
            search: searchParams.search,
        });

        if (data) {
            setPosts((prev) => [...prev, ...data]);
            setLoading(false);
            setHasMore(data.length >= take);
            if (data.length > 0) {
                lastId.current = bigintToInt(data[data.length - 1].id);
            }
        }
    };

    useEffect(() => {
        if (loaded.current && fetchedQuery.current == searchParams.search) {
            return;
        }

        if (loaded.current && fetchedQuery.current != searchParams.search) {
            loaded.current = false;
            fetchedQuery.current = searchParams.search;
            setPosts([]);
        }

        if (loaded.current) {
            return;
        }

        lastId.current = null;

        loaded.current = true;
        loadPosts();
    }, [searchParams]);

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
                    Could not find any posts.
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
