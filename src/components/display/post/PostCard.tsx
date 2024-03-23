import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Post } from "@/components/user_page/posts/types";
import { bigintToInt, timeAgo } from "@/utils/utils";
import { Bookmark, Eye, Heart, MessageSquare, Share } from "lucide-react";
import Link from "next/link";

function Interaction({ icon, count }: { icon: any; count: any }) {
    return (
        <div className="flex gap-1 flex-col items-center">
            {icon}
            <div className="text-xs text-muted-foreground">
                {bigintToInt(count)}
            </div>
        </div>
    );
}

export default function PostCard({ post }: { post: Post }) {
    return (
        <Link href={`/dashboard/posts/${post.uuid}`}>
            <Card className="lg:w-[400px] md:w-96 w-full">
                <CardHeader className="w-full">
                    <div className="text-xs text-muted-foreground">
                        @{post.user.username} · {timeAgo(post.created_at)}
                    </div>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription className="whitespace-pre-line">
                        {post.description}
                    </CardDescription>
                    <div className="flex gap-2 w-full flex-wrap">
                        {post.post_removals.removed && (
                            <Badge variant="destructive">Removed</Badge>
                        )}
                        {post.post_removals.shadow_banned && (
                            <Badge variant="destructive">Shadow banned</Badge>
                        )}
                        {post.post_removals.flagged && (
                            <Badge variant="destructive">Flagged</Badge>
                        )}
                        {post.urgent && <Badge variant="default">Urgent</Badge>}
                        {post.tags.map((tag) => (
                            <Badge variant="outline" key={tag.tag_id}>
                                {tag.translations.en}
                            </Badge>
                        ))}
                    </div>
                </CardHeader>
                {/* @ts-ignore */}
                <CardContent className="gap-2 flex flex-col">
                    <img className="rounded-md" src={post.media[0].media} />
                </CardContent>
                <CardFooter>
                    <ScrollArea className="w-full">
                        <ScrollBar
                            orientation="horizontal"
                            className="w-full"
                        />
                        <div className="flex justify-between w-full gap-2">
                            <Interaction
                                icon={<Heart className="w-4 h-4" />}
                                count={post.post_interactions.likes}
                            />
                            <Interaction
                                icon={<MessageSquare className="w-4 h-4" />}
                                count={post.post_interactions.comments}
                            />
                            <Interaction
                                icon={<Bookmark className="w-4 h-4" />}
                                count={post.post_interactions.bookmarks}
                            />
                            <Interaction
                                icon={<Share className="w-4 h-4" />}
                                count={post.post_interactions.shares}
                            />
                            <Interaction
                                icon={<Eye className="w-4 h-4" />}
                                count={post.post_interactions.impressions}
                            />
                        </div>
                    </ScrollArea>
                </CardFooter>
            </Card>
        </Link>
    );
}
