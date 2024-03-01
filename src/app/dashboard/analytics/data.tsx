import Chart from "@/components/data/Chart";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalyticsData {
    charts?: {
        users: {
            label: string;
            data: { x: string; y: number }[];
            total_users: number;
        };
        posts: {
            total_posts: number;
            label: string;
            data: { x: string; y: number }[];
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
}

function DataCard({
    title,
    value,
    description,
    loading = false,
}: {
    title: string;
    value?: string | number;
    description: string;
    loading?: boolean;
}) {
    return (
        <Card className="w-fit h-fit">
            <CardHeader>
                <p>{title}</p>
                <CardTitle>
                    {loading ? (
                        <Skeleton className="w-12 h-6" />
                    ) : (
                        value?.toLocaleString()
                    )}
                </CardTitle>
                <CardDescription>
                    {loading ? <Skeleton className="w-28 h-4" /> : description}
                </CardDescription>
            </CardHeader>
        </Card>
    );
}

function Cards({
    charts,
    loading = false,
}: AnalyticsData & { loading?: boolean }) {
    const getTotals = (data?: { x: string; y: number }[]) =>
        data?.reduce((acc, curr) => acc + curr.y, 0);

    const totalNewUsers = getTotals(charts?.users.data);
    const totalNewPosts = getTotals(charts?.posts.data);
    const totalNewCompletions = getTotals(charts?.post_completions.data);
    const totalNewReports = getTotals(charts?.reports.data);

    return (
        <div className="flex flex-wrap flex-row gap-2">
            <DataCard
                loading={loading}
                title="Total users"
                value={charts?.users.total_users}
                description={`+${totalNewUsers} new users this week`}
            />
            <DataCard
                loading={loading}
                title="Total posts"
                value={charts?.posts.total_posts}
                description={`+${totalNewPosts} new posts this week`}
            />
            <DataCard
                loading={loading}
                title="Post completions"
                value={charts?.post_completions.total_completions}
                description={`+${totalNewCompletions} completions this week`}
            />
            <DataCard
                loading={loading}
                title="Total reports"
                value={charts?.reports.total_reports}
                description={`+${totalNewReports} reports this week`}
            />
            <DataCard
                loading={loading}
                title="Total messages"
                value={charts?.messages.total_messages}
                description="Messages sent on TaskBuddy"
            />
        </div>
    );
}

export default function AnalyticsData({
    data,
    loading = false,
}: {
    data?: AnalyticsData;
    loading?: boolean;
}) {
    const userData = data?.charts?.users.data.map((d) => ({
        x: d.y,
        y: d.x,
    }));

    const postData = data?.charts?.posts.data.map((d) => ({
        x: d.y,
        y: d.x,
    }));

    const completionsData = data?.charts?.post_completions.data.map((d) => ({
        x: d.y,
        y: d.x,
    }));

    const reportData = data?.charts?.reports.data.map((d) => ({
        x: d.y,
        y: d.x,
    }));

    return (
        <div className="flex flex-col flex-wrap gap-4">
            <Cards {...data} loading={loading} />
            <Separator />
            <div className="flex flex-row flex-wrap gap-4">
                <Chart
                    title="User growth"
                    description="Users registered this week."
                    data={userData}
                    loading={loading}
                />
                <Chart
                    title="Post growth"
                    description="Posts created this week."
                    data={postData}
                    loading={loading}
                />
                <Chart
                    title="Post completions"
                    description="Posts completed this week."
                    data={completionsData}
                    loading={loading}
                />
                <Chart
                    title="User reports"
                    description="Content reports created this week."
                    data={reportData}
                    loading={loading}
                />
            </div>
        </div>
    );
}
