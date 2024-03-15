"use client";

import { Skeleton } from "../ui/skeleton";

export default function CardSkeleton({ count = 1 }: { count?: number }) {
    return (
        <div className="w-full flex flex-wrap gap-2">
            {Array.from({ length: count }).map((_, i) => (
                <Skeleton
                    key={`skeleton-${i}`}
                    style={{
                        // Random width and height between 100px and 400px
                        width: Math.floor(Math.random() * 300) + 100,
                        height: Math.floor(Math.random() * 300) + 100,
                    }}
                />
            ))}
        </div>
    );
}
