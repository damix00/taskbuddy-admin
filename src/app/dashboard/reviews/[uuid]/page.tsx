import DeleteReview from "@/components/review_page/DeleteReview";
import EditReview from "@/components/review_page/EditReview";

export default function ReviewPage() {
    return (
        <div className="flex flex-row gap-2 p-4 flex-wrap">
            <EditReview />
            <DeleteReview />
        </div>
    );
}
