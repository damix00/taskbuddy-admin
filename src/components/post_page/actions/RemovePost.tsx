"use client";

import { removePost } from "@/actions/management/posts";
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

export default function RemovePost() {
    const context = useContext(PostContext);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const reason = useRef<HTMLTextAreaElement>(null);

    if (!context || !context.post) {
        return <></>;
    }

    const removals = context.post.post_removals;

    return (
        <Card className="w-fit h-fit max-w-80">
            <CardHeader>
                <CardTitle>Remove post</CardTitle>
                <CardDescription>
                    Removing a post will mark it as "removed" and prevent it
                    from being displayed on the platform. You can still view
                    removed posts in the admin dashboard.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-lg font-bold">Removal reason</div>
                <div className="text-sm text-muted-foreground">
                    {removals.removal_reason || "No reason provided."}
                </div>
            </CardContent>
            <CardFooter>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="w-full"
                            variant={
                                removals.removed ? "default" : "destructive"
                            }>
                            {removals.removed ? "Restore post" : "Remove post"}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {removals.removed
                                    ? "Restore post"
                                    : "Remove post"}
                            </DialogTitle>
                            <DialogDescription>
                                Are you sure you want to{" "}
                                {removals.removed ? "restore" : "remove"} this
                                post?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-1 5">
                            <Label htmlFor="removal-reason">Reason</Label>
                            <Textarea
                                ref={reason}
                                id="removal-reason"
                                placeholder="e.g. spam"
                                defaultValue={removals.removal_reason || ""}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                disabled={loading}
                                variant="outline"
                                onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                disabled={loading}
                                variant="destructive"
                                onClick={async () => {
                                    setLoading(true);

                                    const shouldRemove = !removals.removed;

                                    // Remove post
                                    const data = await removePost({
                                        uuid: context.post!.uuid,
                                        removed: shouldRemove,
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
                                            removed: shouldRemove,
                                            removal_reason:
                                                reason.current!.value,
                                        },
                                    });

                                    setOpen(false);
                                    setLoading(false);
                                }}>
                                {removals.removed ? "Restore" : "Remove"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
}
