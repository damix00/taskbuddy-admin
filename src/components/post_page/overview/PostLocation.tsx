"use client";

import LocationDisplay from "@/components/display/LocationDisplay";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PostContext } from "@/context/post_context";
import { useContext } from "react";

function ApproximatePostLocation() {
    const context = useContext(PostContext);
    const post = context!.post!;

    return (
        <Card className="max-w-[300px] h-fit">
            <CardHeader>
                <CardTitle>Approximate location</CardTitle>
                <CardDescription>
                    This is an approximate location of the post. This is shown
                    to protect the privacy of the user.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LocationDisplay
                    width="250px"
                    height="250px"
                    lat={post.post_location.approx_lat!}
                    lon={post.post_location.approx_lon!}
                    name={post.post_location.location_name!}
                />
            </CardContent>
        </Card>
    );
}

function RealPostLocation() {
    const context = useContext(PostContext);
    const post = context!.post!;

    return (
        <Card className="w-fit h-fit">
            <CardHeader>
                <CardTitle>Real location</CardTitle>
                <CardDescription>
                    This is the real location of the post.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LocationDisplay
                    width="250px"
                    height="250px"
                    lat={post.post_location.lat!}
                    lon={post.post_location.lon!}
                    name={post.post_location.location_name!}
                />
            </CardContent>
        </Card>
    );
}

export default function PostLocation() {
    const context = useContext(PostContext);

    if (!context || !context.post) {
        return <></>;
    }

    const post = context.post!;

    if (!post.post_location.lat || post.post_location.lat == 1000) {
        return (
            <div className="text-muted-foreground">
                This post does not have a location.
            </div>
        );
    }

    return (
        <div className="flex flex-row gap-2 flex-wrap">
            <ApproximatePostLocation />
            <RealPostLocation />
        </div>
    );
}
