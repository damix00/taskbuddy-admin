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

        const total_users = await db.users.count();

        // Format the data
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const data = days.map((day) => {
            const dayUsers = users.filter(
                (u) => new Date(u.created_at).getDay() === days.indexOf(day)
            );
            return {
                x: day,
                y: dayUsers ? dayUsers.length : 0,
            };
        });

        // Return the data
        return {
            charts: {
                users: {
                    label: "Users",
                    data: data,
                    total_users,
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

    return <AnalyticsData {...data} />;
}
