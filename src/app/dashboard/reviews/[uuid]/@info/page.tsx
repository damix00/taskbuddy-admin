import ReviewInfo from "@/components/review_page/info/ReviewInfo.server";
import ReviewInfoSkeleton from "@/components/review_page/info/ReviewInfoSkeleton";
import { Suspense } from "react";

export default function ReviewInfoLayout({
    params,
}: {
    params: { uuid: string };
}) {
    return (
        <div className="lg:overflow-y-auto lg:h-screen lg:min-w-0 w-80 min-w-full border-b lg:border-r">
            <Suspense fallback={<ReviewInfoSkeleton />}>
                <ReviewInfo uuid={params.uuid} />
            </Suspense>
        </div>
    );
}
