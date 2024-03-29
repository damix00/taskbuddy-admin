"use client";

import { updatePostInfo } from "@/actions/management/posts";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import InputCard, { InputType } from "@/components/user_page/manage/InputCard";
import { PostContext } from "@/context/post_context";
import { useContext, useState } from "react";

export default function EditPostInfo() {
    const context = useContext(PostContext);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    if (!context || !context.post) {
        return <></>;
    }

    return (
        <InputCard
            title="Edit post information"
            description="Update the title and other information about this post."
            btnDisabled={loading}
            inputs={[
                {
                    label: "Title",
                    initialValue: context.post.title,
                    placeholder: "Title",
                    type: "text",
                },
                {
                    label: "Description",
                    initialValue: context.post.description,
                    placeholder: "Description",
                    type: "text",
                    inputType: InputType.TEXTAREA,
                },
            ]}
            onClick={async (values) => {
                setLoading(true);

                const res = await updatePostInfo({
                    uuid: context.post!.uuid,
                    title: values[0],
                    description: values[1],
                });

                setLoading(false);

                if (!res) {
                    toast({
                        title: "Failed to update post information",
                        description:
                            "An error occurred while updating the post information.",
                        variant: "destructive",
                    });
                    return;
                }

                context.setData({
                    ...context.post!,
                    title: values[0] as string,
                    description: values[1] as string,
                });

                toast({
                    title: "Post information updated",
                    description: "The post information has been updated.",
                });
            }}
        />
    );
}
