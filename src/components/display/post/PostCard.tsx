import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Post } from "@/components/user_page/posts/types";
import { timeAgo } from "@/utils/utils";
import Link from "next/link";

export default function PostCard({ post }: { post: Post }) {
    return (
        <Link href={`/dashboard/posts/${post.uuid}`}>
            <Card className="lg:w-[400px] md:w-96 w-full">
                <CardHeader className="w-full">
                    <div className="text-xs text-muted-foreground">
                        @{post.user.username} · {timeAgo(post.created_at)}
                    </div>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.description}</CardDescription>
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
                <Separator />
            </Card>
        </Link>
    );
}
