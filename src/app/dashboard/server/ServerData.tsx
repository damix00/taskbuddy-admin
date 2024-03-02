import DataCard from "@/components/data/DataCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL } from "@/config";

export function ServerCard({
    uptime,
    server_time,
    loading,
}: {
    uptime?: string;
    server_time?: number;
    loading: boolean;
}) {
    return (
        <>
            <DataCard
                title="Server uptime"
                value={Math.floor(parseInt(uptime || "0") / 3600) + " hours"}
                description="The amount of time the server has been running"
                loading={loading}
            />
            <DataCard
                title="Server time"
                value={new Date(server_time || 0).toLocaleString()}
                description="The current time on the server"
                loading={loading}
            />
        </>
    );
}

export default async function ServerData() {
    const data = await (
        await fetch(`${API_URL}/v1/ping`, {
            cache: "no-cache",
        })
    ).json();

    return <ServerCard {...data} />;
}
