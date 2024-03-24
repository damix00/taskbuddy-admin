"use client";

import { Skeleton } from "../ui/skeleton";

export default function CardSkeleton({
    count = 1,
    flex = true,
    gap = 8,
    randomWidth = true,
    randomHeight = true,
    center = false,
    width = 300,
    height = 200,
}: {
    count?: number;
    flex?: boolean;
    gap?: number;
    randomWidth?: boolean;
    randomHeight?: boolean;
    center?: boolean;
    width?: number;
    height?: number;
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
                            : width,
                        height: randomHeight
                            ? Math.floor(Math.random() * 300) + 100
                            : height,
                    }}
                />
            ))}
        </div>
    );
}
