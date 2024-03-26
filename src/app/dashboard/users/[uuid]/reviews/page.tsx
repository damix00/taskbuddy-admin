import ReviewsData from "@/components/user_page/reviews/ReviewsData";

export default function UserReviewsPage({
    params,
    searchParams,
}: {
    params: { uuid: string };
    searchParams: Record<string, string | undefined>;
}) {
    const type = parseInt((searchParams.type as any) || "2");

    if (type < 0 || type > 2) {
        return <div>Invalid type</div>;
    }

    return (
        <div className="p-4 flex flex-col items-center">
            <ReviewsData userUuid={params.uuid} type={type as any} />
        </div>
    );
}
