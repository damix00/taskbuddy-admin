import { Avatar } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Review } from "@/components/user_page/reviews/types";
import Link from "next/link";

export default function ReviewCard({ review }: { review: Review }) {
    return (
        <Link href={`/dashboard/reviews/${review.uuid}`}>
            <Card className="lg:w-[400px] md:w-96 w-full">
                <CardHeader>
                    <div className="text-muted-foreground text-sm">
                        @{review.reviewed_by_user.username}
                        {" · "}
                        {review.created_at.toDateString()}
                    </div>
                    <div className="py-2 space-y-1">
                        <CardTitle>{review.title}</CardTitle>
                        <CardDescription className="whitespace-pre-wrap">
                            {review.description}
                        </CardDescription>
                    </div>
                    <div className="flex items-center text-sm">
                        <div className="mr-2">{review.rating}/5</div>
                        <div className="text-muted-foreground">Rating</div>
                    </div>
                </CardHeader>
            </Card>
        </Link>
    );
}
