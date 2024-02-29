import Chart from "@/components/data/Chart";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface AnalyticsData {
    charts?: {
        users: {
            label: string;
            data: { x: string; y: number }[];
            total_users: number;
        };
    };
}

export function UserSkeleton() {
    return (
        <Chart
            title="User growth"
            description="Users registered this week."
            loading={true}
        />
    );
}

export function UserAnalytics(data: AnalyticsData) {
    const userData = data.charts?.users.data.map((d) => ({
        x: d.y,
        y: d.x,
    }));

    const totalNewUsers = data.charts?.users.data.reduce(
        (acc, curr) => acc + curr.y,
        0
    );

    return (
        <div className="flex flex-row flex-wrap gap-4">
            <Chart
                title="User growth"
                description="Users registered this week."
                data={userData}
            />
            {/* new users */}
            <Card className="w-fit h-fit">
                <CardHeader>
                    <p>Total users</p>
                    <CardTitle>{data.charts?.users.total_users}</CardTitle>
                    <CardDescription>
                        +{totalNewUsers} new users this week
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}

export default function AnalyticsData(data: AnalyticsData) {
    return (
        <div className="flex flex-col flex-wrap">
            <UserAnalytics {...data} />
        </div>
    );
}
