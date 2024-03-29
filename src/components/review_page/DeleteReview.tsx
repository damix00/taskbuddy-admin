"use client";

import { useContext, useState } from "react";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { ReviewContext } from "@/context/review_context";
import { Button } from "../ui/button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { deleteReview } from "@/actions/reviews";
import { useToast } from "../ui/use-toast";

export default function DeleteReview() {
    const context = useContext(ReviewContext);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    if (!context || !context.review) {
        return <></>;
    }

    return (
        <Card className="w-fit h-fit">
            <CardHeader>
                <CardTitle>Delete review</CardTitle>
                <CardDescription>
                    Delete this review permanently.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                            Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete review</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete this review?
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                                disabled={loading}
                                variant="destructive"
                                onClick={async () => {
                                    setLoading(true);

                                    const r = await deleteReview({
                                        reviewId: context.review!.id,
                                    });

                                    setLoading(false);
                                    setOpen(false);

                                    if (!r) {
                                        toast({
                                            title: "Failed to delete review",
                                            description:
                                                "Something went wrong while deleting the review.",
                                            variant: "destructive",
                                        });
                                        return;
                                    }

                                    toast({
                                        title: "Review deleted",
                                        description:
                                            "The review has been deleted.",
                                    });
                                }}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
}
