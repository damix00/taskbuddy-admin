"use client";

import { updatePostLocation } from "@/actions/management/posts";
import { useToast } from "@/components/ui/use-toast";
import InputCard from "@/components/user_page/manage/InputCard";
import { PostContext } from "@/context/post_context";
import { useContext, useState } from "react";

export default function EditPostLocation() {
    const context = useContext(PostContext);
    const [loading, setLoading] = useState(false);

    const { toast } = useToast();

    if (!context || !context.post) {
        return <></>;
    }

    return (
        <div className="max-w-80">
            <InputCard
                title="Edit post location"
                description="Update the location of this post. This will also update the approximate location."
                btnDisabled={false}
                inputs={[
                    {
                        label: "Latitude",
                        initialValue: context.post!.post_location.lat,
                        placeholder: "Latitude",
                        type: "text",
                    },
                    {
                        label: "Longitude",
                        initialValue: context.post!.post_location.lon,
                        placeholder: "Longitude",
                        type: "text",
                    },
                    {
                        label: "Location name",
                        initialValue: context.post!.post_location.location_name,
                        placeholder: "Location name",
                        type: "text",
                    },
                ]}
                onClick={async (values) => {
                    setLoading(true);

                    const res = await updatePostLocation({
                        uuid: context.post!.uuid,
                        lat: parseFloat(values[0]),
                        lon: parseFloat(values[1]),
                        locationName: values[2],
                    });

                    setLoading(false);

                    if (!res) {
                        toast({
                            title: "Failed to update post location",
                            description:
                                "An error occurred while updating the post location.",
                            variant: "destructive",
                        });
                        return;
                    }

                    context.setData({
                        ...context.post!,
                        post_location: {
                            ...context.post!.post_location,
                            lat: parseFloat(values[0]),
                            lon: parseFloat(values[1]),
                            location_name: values[2] as string,
                        },
                    });

                    toast({
                        title: "Post location updated",
                        description: "The post location has been updated.",
                    });
                }}
            />
        </div>
    );
}
