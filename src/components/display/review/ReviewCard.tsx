import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Review } from "@/components/user_page/reviews/types";

export default function ReviewCard({ review }: { review: Review }) {
    return (
        <Card className="w-fit">
            <CardHeader>
                <div className="text-muted-foreground text-sm">
                    @{review.reviewed_by_user.username}
                    {" · "}
                    {review.created_at.toDateString()}
                </div>
            </CardHeader>
            <CardContent>
                <CardTitle>{review.title}</CardTitle>
                <CardDescription className="whitespace-pre-wrap">
                    {review.description}
                </CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col justify-start items-start">
                <div className="flex items-center text-sm">
                    <div className="mr-2">{review.rating}/5</div>
                    <div className="text-muted-foreground">Rating</div>
                </div>
            </CardFooter>
        </Card>
    );
}
