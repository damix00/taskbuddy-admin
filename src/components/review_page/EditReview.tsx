"use client";

import { useContext, useState } from "react";
import InputCard, { InputType } from "../user_page/manage/InputCard";
import { ReviewContext } from "@/context/review_context";
import { updateReview } from "@/actions/reviews";
import { useToast } from "../ui/use-toast";

export default function EditReview() {
    const context = useContext(ReviewContext);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    if (!context || !context.review) {
        return null;
    }

    return (
        <InputCard
            title="Edit review"
            description="You can update this review here."
            inputs={[
                {
                    label: "Title",
                    type: "text",
                    placeholder: "Title",
                    initialValue: context.review.title,
                },
                {
                    label: "Description",
                    type: "text",
                    inputType: InputType.TEXTAREA,
                    placeholder: "Description",
                    initialValue: context.review.description,
                },
                {
                    label: "Rating",
                    type: "number",
                    placeholder: "Rating",
                    initialValue: context.review.rating,
                },
            ]}
            btnDisabled={loading}
            onClick={async (data) => {
                setLoading(true);

                const r = await updateReview({
                    reviewId: context.review!.id,
                    title: data[0],
                    description: data[1],
                    rating: parseFloat(data[2]),
                });

                setLoading(false);

                if (!r) {
                    toast({
                        title: "Failed to update review",
                        description:
                            "Something went wrong while updating the review.",
                        variant: "destructive",
                    });
                    return;
                }

                toast({
                    title: "Review updated",
                    description: "The review has been updated successfully.",
                });
            }}
        />
    );
}
