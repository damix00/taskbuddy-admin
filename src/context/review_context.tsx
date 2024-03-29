"use client";

import { Review } from "@/components/user_page/reviews/types";
import { createContext, useContext, useEffect, useState } from "react";

export type ReviewContextType = {
    review?: Review | null;
    setData: (data: Review) => any;
};

export const ReviewContext = createContext<ReviewContextType | null>(null);

export function ReviewContextCreator({ review }: { review: Review }) {
    const context = useContext(ReviewContext);

    if (!context) {
        return <></>;
    }

    useEffect(() => {
        context.setData(review);
    }, [review]);

    return <></>;
}

export function ReviewContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [reviewData, setReviewData] = useState<Review | null>(null);

    return (
        <ReviewContext.Provider
            value={{
                review: reviewData,
                setData: setReviewData,
            }}>
            {children}
        </ReviewContext.Provider>
    );
}
