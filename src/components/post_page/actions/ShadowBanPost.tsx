"use client";

import { shadowBanPost } from "@/actions/management/posts";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PostContext } from "@/context/post_context";
import { useContext, useState } from "react";

export default function ShadowBanPost() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const context = useContext(PostContext);
    const { toast } = useToast();

    if (!context || !context.post) {
        return <></>;
    }

    return (
        <Card className="w-fit max-w-80 h-fit">
            <CardHeader>
                <CardTitle>Shadow ban post</CardTitle>
                <CardDescription>
                    Shadow banning a post will prevent it from being displayed
                    on the platform. A shadow banned post will still be visible
                    on the user's profile.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                        <Button
                            className="w-full"
                            variant={
                                context.post.post_removals.shadow_banned
                                    ? "default"
                                    : "destructive"
                            }>
                            {context.post.post_removals.shadow_banned
                                ? "Remove shadow ban"
                                : "Shadow ban"}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {context.post.post_removals.shadow_banned
                                    ? "Remove shadow ban"
                                    : "Shadow ban"}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to{" "}
                                {context.post.post_removals.shadow_banned
                                    ? "remove the shadow ban from"
                                    : "shadow ban"}{" "}
                                this post?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                                disabled={loading}
                                onClick={async () => {
                                    const shouldBan =
                                        !context.post!.post_removals
                                            .shadow_banned;

                                    setLoading(true);

                                    const res = await shadowBanPost({
                                        uuid: context.post!.uuid,
                                        ban: shouldBan,
                                    });

                                    setOpen(false);
                                    setLoading(false);

                                    if (!res) {
                                        toast({
                                            title: "Failed to shadow ban post",
                                            description:
                                                "An error occurred while shadow banning the post.",
                                            variant: "destructive",
                                        });
                                    }

                                    if (res) {
                                        context.setData({
                                            ...context.post!,
                                            post_removals: {
                                                ...context.post!.post_removals,
                                                shadow_banned:
                                                    !context.post!.post_removals
                                                        .shadow_banned,
                                            },
                                        });

                                        toast({
                                            title: "Post shadow banned",
                                            description: `The post has been ${
                                                shouldBan
                                                    ? "shadow banned"
                                                    : "un-shadow banned"
                                            }.`,
                                        });
                                    }
                                }}
                                variant={
                                    context.post.post_removals.shadow_banned
                                        ? "default"
                                        : "destructive"
                                }>
                                {context.post.post_removals.shadow_banned
                                    ? "Remove shadow ban"
                                    : "Shadow ban"}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
}
