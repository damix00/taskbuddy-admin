"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

interface AnalyticsData {
    charts?: {
        users: {
            label: string;
            data: { x: string; y: number }[];
        };
    };
}

function RoundedBar({ fill, x, y, width, height }: any) {
    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={fill}
                ry={5}
            />
        </g>
    );
}

export function UserSkeleton() {
    return (
        <Card className="w-fit">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="w-20 h-5" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="w-26 h-4" />
                    <Skeleton className="w-14 mt-2 h-4" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Skeleton className="w-96 h-48" />
            </CardContent>
        </Card>
    );
}

export function UserAnalytics(data: AnalyticsData) {
    const userData = data.charts?.users.data.map((d) => ({
        y: d.x,
        x: d.y,
    }));

    return (
        <Card className="w-fit">
            <CardHeader>
                <CardTitle>User growth</CardTitle>
                <CardDescription>Users registered this week.</CardDescription>
            </CardHeader>
            <CardContent>
                <BarChart width={600} height={300} data={userData}>
                    <Bar
                        type="monotone"
                        dataKey="x"
                        stroke="var(--color-primary)"
                        fill="var(--color-primary)"
                        shape={<RoundedBar />}
                    />
                    <XAxis dataKey="y" />
                    <YAxis />
                </BarChart>
            </CardContent>
        </Card>
    );
}

export default function AnalyticsData(data: AnalyticsData) {
    return (
        <>
            <UserAnalytics {...data} />
        </>
    );
}
