import Chart from "@/components/data/Chart";

interface AnalyticsData {
    charts?: {
        users: {
            label: string;
            data: { x: string; y: number }[];
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

    return (
        <Chart
            title="User growth"
            description="Users registered this week."
            data={userData}
        />
    );
}

export default function AnalyticsData(data: AnalyticsData) {
    return (
        <>
            <UserAnalytics {...data} />
        </>
    );
}
