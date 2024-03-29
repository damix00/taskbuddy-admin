"use client";

import { SessionContext } from "@/context/session_context";
import { useContext } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

function DataItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-row justify-between gap-4">
            <div className="text-sm">{label}</div>
            <div className="text-sm text-muted-foreground">{value}</div>
        </div>
    );
}

export default function SessionDataCard() {
    const context = useContext(SessionContext);

    if (!context || !context.session) {
        return <></>;
    }

    return (
        <Card className="w-fit h-fit">
            <CardHeader>
                <CardTitle>Session data</CardTitle>
                <CardDescription>
                    Some information about the session.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DataItem label="ID" value={context.session.id.toString()} />
                <DataItem
                    label="Start time"
                    value={`${context.session.created_at.toDateString()} ${context.session.created_at.toLocaleTimeString()}`}
                />
                <DataItem
                    label="Last updated"
                    value={`${context.session.updated_at.toDateString()} ${context.session.updated_at.toLocaleTimeString()}`}
                />
                <DataItem
                    label="IP address"
                    value={context.session.ip_address}
                />
            </CardContent>
        </Card>
    );
}
