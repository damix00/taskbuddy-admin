"use client";

import { flagPost } from "@/actions/management/posts";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { PostContext } from "@/context/post_context";
import { useContext, useRef, useState } from "react";

export default function FlagPost() {
    const context = useContext(PostContext);
    const reason = useRef<HTMLTextAreaElement>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    if (!context || !context.post) {
        return null;
    }

    const removals = context.post.post_removals;

    return (
        <Card className="w-fit h-fit max-w-80">
            <CardHeader>
                <CardTitle>Flag post</CardTitle>
                <CardDescription>
                    A flagged post will still be visible on the platform, but it
                    will be marked as potentially inappropriate. This is usually
                    done by the algorithm.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-lg font-bold">Flag reason</div>
                <div className="text-sm text-muted-foreground">
                    {removals.flagged_reason || "No reason provided."}
                </div>
            </CardContent>
            <CardFooter>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant={
                                removals.flagged ? "default" : "destructive"
                            }
                            className="w-full">
                            {removals.flagged ? "Unflag" : "Flag"}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {removals.flagged ? "Unflag post" : "Flag post"}
                            </DialogTitle>
                            <DialogDescription>
                                Are you sure you want to{" "}
                                {removals.flagged ? "unflag" : "flag"} this
                                post?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-1 5">
                            <Label htmlFor="flag-reason">Reason</Label>
                            <Textarea
                                ref={reason}
                                id="removal-reason"
                                placeholder="e.g. spam"
                                defaultValue={removals.flagged_reason || ""}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setOpen(false);
                                }}>
                                Cancel
                            </Button>
                            <Button
                                variant={
                                    removals.flagged ? "default" : "destructive"
                                }
                                onClick={async () => {
                                    setLoading(true);

                                    const shouldFlag = !removals.flagged;

                                    // Remove post
                                    const data = await flagPost({
                                        uuid: context.post!.uuid,
                                        flagged: shouldFlag,
                                        reason: reason.current!.value,
                                    });

                                    if (!data) {
                                        toast({
                                            title: "Failed to remove post",
                                            description:
                                                "An error occurred while removing the post.",
                                            variant: "destructive",
                                        });
                                        return;
                                    }

                                    toast({
                                        title: "Post removed",
                                        description:
                                            "The post has been removed.",
                                    });

                                    context.setData({
                                        ...context.post!,
                                        post_removals: {
                                            ...context.post!.post_removals,
                                            flagged: shouldFlag,
                                            flagged_reason:
                                                reason.current!.value,
                                        },
                                    });

                                    setOpen(false);
                                    setLoading(false);
                                }}>
                                {removals.flagged ? "Unflag" : "Flag"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
}
