import CardSkeleton from "@/components/display/CardSkeleton";
import UserPosts from "@/components/user_page/posts/UserPosts";
import { Suspense } from "react";

export default function Posts({
    params,
}: {
    params: {
        uuid: string;
    };
}) {
    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <UserPosts uuid={params.uuid} />
        </div>
    );
}
