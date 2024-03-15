import DataCard from "@/components/data/DataCard";
import { db } from "@/lib/database/prisma";

// Function to get the most common time of day a user uses the app
async function getAverageUsageTime({
    id,
}: {
    id: number;
}): Promise<string | null> {
    try {
        const sessions = await db.scroll_sessions.findMany({
            where: {
                user_id: {
                    equals: id,
                },
            },
            select: {
                created_at: true,
            },
        });

        if (sessions.length === 0) {
            return null;
        }

        const hours = sessions.map((session) => {
            return new Date(session.created_at).getHours();
        });

        const mode = hours
            .sort(
                (a, b) =>
                    hours.filter((v) => v === a).length -
                    hours.filter((v) => v === b).length
            )
            .pop();

        return `${mode}:00`;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Returns the number of messages sent this week
async function getMessagesSentThisWeek({
    id,
}: {
    id: number;
}): Promise<number> {
    try {
        const messages = await db.messages.findMany({
            where: {
                sender_id: {
                    equals: id,
                },
                created_at: {
                    gte: new Date(
                        new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                    ),
                },
            },
        });

        return messages.length;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

// Returns the number of posts completed this week
async function getPostsCompletedThisWeek({
    id,
}: {
    id: number;
}): Promise<number> {
    try {
        const posts = await db.job_completions.findMany({
            where: {
                completed_by_id: {
                    equals: id,
                },
                OR: [
                    {
                        completed_for_id: {
                            equals: id,
                        },
                    },
                ],
                created_at: {
                    gte: new Date(
                        new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                    ),
                },
            },
        });

        return posts.length;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function getReportsThisWeek({ id }: { id: number }): Promise<number> {
    try {
        const reports = await db.user_reports.findMany({
            where: {
                user_id: {
                    equals: id,
                },
                OR: [
                    {
                        AND: [
                            {
                                content_id: {
                                    equals: id,
                                },
                            },
                            {
                                content_type: {
                                    equals: 2,
                                },
                            },
                        ],
                    },
                ],
                created_at: {
                    gte: new Date(
                        new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                    ),
                },
            },
        });

        return reports.length;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

// Server component to get some user metrics
export default async function UserMetrics({ uuid }: { uuid: string }) {
    const user = await db.users.findFirst({
        where: {
            uuid: uuid,
        },
        select: {
            id: true,
        },
    });

    if (!user) {
        return null;
    }

    const id = parseInt(user.id.toString());

    const averageTime = await getAverageUsageTime({ id });
    const messagesSent = await getMessagesSentThisWeek({ id });
    const postsCompleted = await getPostsCompletedThisWeek({ id });
    const reportsThisWeek = await getReportsThisWeek({ id });

    return (
        <div className="flex gap-2 flex-wrap">
            <DataCard
                title="Average usage time"
                description="This is the average time of day the user uses the app."
                value={
                    averageTime ? `About ${averageTime}` : "No data available"
                }
            />
            <DataCard
                title="Messages sent this week"
                description="The number of messages the user has sent this week."
                value={messagesSent}
            />
            <DataCard
                title="Posts completed this week"
                description="The number of posts the user has completed this week."
                value={postsCompleted}
            />
            <div className="max-w-80">
                <DataCard
                    title="Reports this week"
                    description="The number of reports the user has made this week, or that have been made about them."
                    value={reportsThisWeek}
                />
            </div>
        </div>
    );
}
