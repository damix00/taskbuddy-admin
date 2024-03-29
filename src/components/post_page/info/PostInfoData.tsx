import { PostInteractions } from "@/components/display/post/PostCard";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Post } from "@/components/user_page/posts/types";
import Link from "next/link";

const categoryMap = {
    5: "general",
    6: "home_services",
    7: "technology",
    8: "errands_and_delivery",
    9: "creative_and_design",
    10: "fitness_and_health",
    11: "business",
    12: "education",
};

function InfoLabel({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="w-full flex flex-row justify-between gap-2">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="text-sm">{value}</div>
        </div>
    );
}

export default function PostInfoData({ post }: { post: Post }) {
    let postType = "one-time";

    switch (post.job_type) {
        case 1:
            postType = "part-time";
            break;
        case 2:
            postType = "full-time";
            break;
        default:
            postType = "one-time";
            break;
    }

    let postStatus = "open";

    switch (post.status) {
        case 1:
            postStatus = "closed";
            break;
        case 2:
            postStatus = "reserved";
            break;
        case 3:
            postStatus = "completed";
            break;
        case 4:
            postStatus = "cancelled";
            break;
        case 5:
            postStatus = "expired";
            break;
        default:
            postStatus = "open";
            break;
    }

    return (
        <div className="p-8 flex flex-col gap-2">
            {/* Username */}
            <Link
                className="text-xs text-muted-foreground link"
                href={`/dashboard/users/${post.user.uuid}`}>
                @{post.user.username}
            </Link>
            {/* Removals */}
            {(post.post_removals.removed ||
                post.post_removals.flagged ||
                post.post_removals.shadow_banned) && (
                <div className="flex flex-row gap-2 flex-wrap">
                    {post.post_removals.removed && (
                        <Badge variant="destructive">Removed</Badge>
                    )}
                    {post.post_removals.flagged && (
                        <Badge variant="outline">Flagged</Badge>
                    )}
                    {post.post_removals.shadow_banned && (
                        <Badge variant="outline">Shadow banned</Badge>
                    )}
                </div>
            )}
            <div className="flex flex-col">
                {/* Title */}
                <div className="text-xl font-bold">{post.title}</div>
                {/* Description */}
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {post.description}
                </div>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {post.urgent && <Badge>Urgent</Badge>}
                {post.tags.map((tag, index) => (
                    <Badge key={tag.tag_id} variant="outline">
                        {tag.translations.en}
                    </Badge>
                ))}
            </div>
            {/* Media */}
            <div className="w-full h-fit">
                <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {post.media.map((media, index) => (
                            <img
                                className="w-fit h-fit"
                                key={index}
                                src={media.media}
                            />
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="py-2">
                <PostInteractions post={post} />
            </div>
            <Separator />
            {/* Info */}
            <InfoLabel label="Post type" value={postType} />
            <InfoLabel label="Price" value={`€${post.price}`} />
            <InfoLabel
                label="Start date"
                value={post.start_date.toDateString()}
            />
            <InfoLabel label="End date" value={post.end_date.toDateString()} />
            <InfoLabel
                label="Created at"
                value={new Date(post.created_at).toDateString()}
            />
            <Separator />
            {/* Status */}
            <InfoLabel label="Reserved" value={post.reserved ? "Yes" : "No"} />
            <InfoLabel label="Status" value={postStatus} />
            <InfoLabel
                label="Category"
                // @ts-ignore
                value={categoryMap[post.classified_category]}
            />
        </div>
    );
}
