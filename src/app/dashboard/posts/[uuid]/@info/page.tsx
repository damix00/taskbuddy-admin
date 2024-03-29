import PostInfo from "@/components/post_page/info/PostInfo_server";
import PostInfoSkeleton from "@/components/post_page/info/PostInfoSkeleton";
import { Suspense } from "react";

export default function PostInfoLayout({
    params,
}: {
    params: {
        uuid: string;
    };
}) {
    return (
        <div className="lg:overflow-y-auto lg:h-screen lg:min-w-0 w-80 min-w-full border-b lg:border-r">
            <Suspense fallback={<PostInfoSkeleton />}>
                <PostInfo uuid={params.uuid} />
            </Suspense>
        </div>
    );
}
