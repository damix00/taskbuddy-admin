"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { KillswitchEntry, KillswitchesData } from "./types";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Switch } from "../../ui/switch";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Button } from "../../ui/button";
import useUser from "@/hooks/use_user";
import { API_URL } from "@/config";
import TableCard from "@/components/data/CustomTable";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

function EnabledCell({ row }: any) {
    const [enabled, setEnabled] = useState<boolean>(row.original.enabled);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const user = useUser();

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Switch checked={enabled} onCheckedChange={() => {}} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {enabled ? "Disable" : "Enable"} killswitch
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to
                        {enabled ? " disable " : " enable "} this killswitch?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            disabled={loading}
                            variant="default"
                            onClick={async () => {
                                setLoading(true);

                                try {
                                    const data = await fetch(
                                        `${API_URL}/v1/admin/killswitches/${row.original.key}/toggle`,
                                        {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                                Authorization: `Bearer ${user.jwt}`,
                                            },
                                            body: JSON.stringify({
                                                enabled: !enabled,
                                                description:
                                                    row.original.description,
                                            }),
                                        }
                                    );

                                    if (!data) {
                                        toast({
                                            title: "Error",
                                            description:
                                                "There was an error toggling the killswitch.",
                                        });
                                    } else {
                                        toast({
                                            title: "Success",
                                            description: `Killswitch "${
                                                row.original.key
                                            }"
                                            ${
                                                enabled ? "disabled" : "enabled"
                                            } successfully.`,
                                        });

                                        setEnabled(!enabled);
                                    }
                                } catch (e) {
                                    console.error(e);
                                } finally {
                                    setLoading(false);
                                }
                            }}>
                            {enabled ? "Disable" : "Enable"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

const columns: ColumnDef<KillswitchEntry>[] = [
    {
        accessorKey: "key",
        header: "Key",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "enabled",
        header: "Enabled",
        cell: EnabledCell,
    },
    {
        accessorKey: "added_by",
        header: "Updated by",
    },
    {
        accessorKey: "enabled_at",
        header: "Updated at",
    },
];

export default function KillswitchData({
    data,
    loading = false,
}: {
    data?: KillswitchesData | null;
    loading: boolean;
}) {
    const table = useReactTable({
        data: data?.killswitches || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if ((!data || !data.killswitches) && !loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Killswitches</CardTitle>
                    <CardDescription>
                        There was an error fetching killswitch data.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    if (loading) {
        return (
            <TableCard
                title="Killswitches"
                description="This is a list of all killswitches. You can enable or disable them here."
                loading
            />
        );
    }

    return (
        <TableCard
            title="Killswitches"
            description="This is a list of all killswitches. You can enable or disable them here."
            table={table}
            columns={columns}
        />
    );
}
