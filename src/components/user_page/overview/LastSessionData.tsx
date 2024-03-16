"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { LastSession } from "./types";
import LocationDisplay from "@/components/display/LocationDisplay";
import useMaxWidth from "@/hooks/use_max_width";
import DataCard from "@/components/data/DataCard";
import { timeAgo } from "@/utils/utils";

export default function LastSessionData({ data }: { data: LastSession }) {
    return (
        <div className="flex gap-2 flex-wrap">
            <Card className="w-[300px] h-fit">
                <CardHeader>
                    <CardTitle>Last known location</CardTitle>
                    <CardDescription>
                        This is the last known location of the user.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {data.lat && data.lon ? (
                        <LocationDisplay
                            width="250px"
                            height="250px"
                            lat={data?.lat}
                            lon={data?.lon}
                            name=""
                        />
                    ) : (
                        "No location data"
                    )}
                </CardContent>
            </Card>
            <DataCard
                title="Last online"
                description="The last time the user was online."
                value={timeAgo(data.time)}
            />
            <DataCard
                title="Session count"
                description="The number of times the user has used the app."
                value={data.session_count}
            />
        </div>
    );
}
