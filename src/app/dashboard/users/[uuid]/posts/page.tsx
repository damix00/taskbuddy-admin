import CardSkeleton from "@/components/display/CardSkeleton";
import UserPosts from "@/components/user_page/posts/UserPosts.server";
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
            <Suspense
                fallback={
                    <CardSkeleton
                        center
                        randomWidth={false}
                        count={5}
                        gap={16}
                        flex={false}
                    />
                }>
                <UserPosts uuid={params.uuid} />
            </Suspense>
        </div>
    );
}
