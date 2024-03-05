"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { RemoteConfigItem, RemoteConfigTypes } from "./types";
import TableCard from "@/components/data/CustomTable";

const columns: ColumnDef<RemoteConfigItem>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "value",
        header: "Value",
    },
    {
        accessorKey: "data_type",
        header: "Data Type",
    },
];

export default function RemoteConfigData({
    data,
    loading = false,
}: {
    data?: RemoteConfigTypes | null;
    loading?: boolean;
}) {
    const table = useReactTable({
        data: data?.items || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if ((!data || !data.items) && !loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Remote Config</CardTitle>
                    <CardDescription>
                        There was an error fetching the Remote Config.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    const title = "Remote Config";
    const description = "This is the Firebase Remote Config for the app.";

    if (loading) {
        return <TableCard title={title} description={description} loading />;
    }

    return (
        <TableCard
            title={title}
            description={description}
            table={table}
            columns={columns}
        />
    );
}
