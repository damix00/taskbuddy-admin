"use client";

import { Skeleton } from "../ui/skeleton";

export default function CardSkeleton({
    count = 1,
    flex = true,
    gap = 8,
    randomWidth = true,
    center = false,
}: {
    count?: number;
    flex?: boolean;
    gap?: number;
    randomWidth?: boolean;
    center?: boolean;
}) {
    return (
        <div
            className="w-full flex flex-wrap"
            style={{
                flexDirection: flex ? "row" : "column",
                gap: `${gap}px`,
                justifyContent: center ? "center" : "flex-start",
                alignItems: center ? "center" : "flex-start",
            }}>
            {Array.from({ length: count }).map((_, i) => (
                <Skeleton
                    key={`skeleton-${i}`}
                    style={{
                        // Random width and height between 100px and 400px
                        width: randomWidth
                            ? Math.floor(Math.random() * 300) + 100
                            : 300,
                        height: Math.floor(Math.random() * 300) + 100,
                    }}
                />
            ))}
        </div>
    );
}
