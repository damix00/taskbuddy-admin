"use server";

import { db } from "@/lib/database/prisma";

import AnalyticsData from "./data";
import { sleep } from "@/utils/utils";

async function getData(): Promise<{
    charts?: {
        users: {
            label: string;
            data: { x: string; y: number }[];
            total_users: number;
        };
        posts: {
            label: string;
            data: { x: string; y: number }[];
            total_posts: number;
        };
        post_completions: {
            label: string;
            data: { x: string; y: number }[];
            total_completions: number;
        };
        reports: {
            label: string;
            data: { x: string; y: number }[];
            total_reports: number;
        };
        messages: {
            total_messages: number;
        };
    };
    error: boolean;
}> {
    try {
        // Fetch data from the database, count users for every day of the current week
        const users = await db.users.groupBy({
            by: ["created_at"],
            _count: {
                id: true,
            },
            where: {
                created_at: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                },
            },
        });

        // Post growth this week
        const posts = await db.posts.groupBy({
            by: ["created_at"],
            _count: {
                id: true,
            },
            where: {
                created_at: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                },
            },
        });

        // Post completions this week
        const completions = await db.job_completions.groupBy({
            by: ["created_at"],
            _count: {
                id: true,
            },
            where: {
                created_at: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                },
            },
        });

        // Report growth this week
        const reports = await db.user_reports.groupBy({
            by: ["created_at"],
            _count: {
                id: true,
            },
            where: {
                created_at: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                },
                reviewed: { not: true },
            },
        });

        const total_users = await db.users.count();
        const total_posts = await db.posts.count();
        const total_completions = await db.job_completions.count();
        const total_reports = await db.user_reports.count();
        const total_messages = await db.messages.count();

        // Format the data
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const user_data = [];
        const post_data = [];
        const completion_data = [];
        const report_data = [];

        for (let i = 7; i >= 0; i--) {
            const date = new Date(new Date().setDate(new Date().getDate() - i));
            const day = days[date.getDay()];

            // Find the data for the current day
            const user = users.filter((user) => {
                return user.created_at.getDate() === date.getDate();
            });

            const post = posts.filter((post) => {
                return post.created_at.getDate() === date.getDate();
            });

            const completion = completions.filter((completion) => {
                return completion.created_at.getDate() === date.getDate();
            });

            const report = reports.filter((report) => {
                return report.created_at.getDate() === date.getDate();
            });

            // Add the data to the array
            user_data.push({
                x: day,
                y: user.length,
            });

            post_data.push({
                x: day,
                y: post.length,
            });

            completion_data.push({
                x: day,
                y: completion.length,
            });

            report_data.push({
                x: day,
                y: report.length,
            });
        }

        // Return the data
        return {
            charts: {
                users: {
                    label: "Users",
                    data: user_data,
                    total_users,
                },
                posts: {
                    total_posts,
                    label: "Posts",
                    data: post_data,
                },
                post_completions: {
                    label: "Job Completions",
                    data: completion_data,
                    total_completions,
                },
                reports: {
                    label: "Reports",
                    data: report_data,
                    total_reports,
                },
                messages: {
                    total_messages,
                },
            },
            error: false,
        };
    } catch (e) {
        console.error(e);

        return { error: true };
    }
}

export default async function Analytics() {
    const data = await getData();

    return <AnalyticsData data={data} loading={false} />;
}
