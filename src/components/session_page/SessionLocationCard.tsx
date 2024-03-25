"use client";

import { SessionContext } from "@/context/session_context";
import { useContext } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import LocationDisplay from "../display/LocationDisplay";

export default function SessionLocationCard() {
    const context = useContext(SessionContext);

    if (!context || !context.session) {
        return <></>;
    }

    return (
        <Card className="w-fit h-fit">
            <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>The location of this session.</CardDescription>
            </CardHeader>
            <CardContent>
                {context.session.lat && context.session.lat != 1000 ? (
                    <LocationDisplay
                        lat={context.session.lat!}
                        lon={context.session.lon!}
                        width="250px"
                        height="250px"
                    />
                ) : (
                    "Location not available."
                )}
            </CardContent>
        </Card>
    );
}
