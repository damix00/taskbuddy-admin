"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Maximize } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

interface ChartProps {
    title: string;
    description: string;
    data?: { x: number; y: string }[];
    loading?: boolean;
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

function ChartDialog({ data, title }: { data: any; title: string }) {
    return (
        <div>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center">
                <ResponsiveContainer
                    width={Math.min(window.innerWidth - 150, 700)}
                    height={Math.min(window.innerHeight - 150, 400)}
                    className="mt-4">
                    <BarChart data={data}>
                        <Bar
                            type="monotone"
                            dataKey="x"
                            stroke="var(--color-primary)"
                            fill="var(--color-primary)"
                            shape={<RoundedBar />}
                            label={{ position: "top" }}
                        />
                        <XAxis dataKey="y" allowDecimals={false} />
                        <YAxis allowDecimals={false} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default function Chart({
    title,
    description,
    data,
    loading,
}: ChartProps) {
    const [width, setWidth] = useState(600);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setWidth(window.innerWidth - 200);
            } else {
                setWidth(Math.min(window.innerWidth - 350, 600));
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Card className="w-fit">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="block space-y-1.5">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                size="icon"
                                className="ml-2"
                                variant="outline">
                                <Maximize size={16} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent
                            className="overflow-x-hidden w-fit rounded-md"
                            style={{
                                maxWidth: "calc(100vw - 50px)",
                            }}>
                            <ChartDialog title={title} data={data} />
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                {loading && <Skeleton className="w-[350px] h-[175px]" />}
                {!loading &&
                    (data ? (
                        <ResponsiveContainer width={width} height={300}>
                            <BarChart data={data}>
                                <Bar
                                    type="monotone"
                                    dataKey="x"
                                    stroke="var(--color-primary)"
                                    fill="var(--color-primary)"
                                    shape={<RoundedBar />}
                                />
                                <XAxis dataKey="y" allowDecimals={false} />
                                <YAxis allowDecimals={false} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p>Something went wrong.</p>
                    ))}
            </CardContent>
        </Card>
    );
}
