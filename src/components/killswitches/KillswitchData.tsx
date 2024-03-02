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
import { Switch } from "../ui/switch";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Button } from "../ui/button";
import useUser from "@/hooks/use_user";
import { API_URL } from "@/config";

function EnabledCell({ row }: any) {
    const [enabled, setEnabled] = useState<boolean>(row.original.enabled);
    const [loading, setLoading] = useState(false);

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

                                    setEnabled(!enabled);
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
        header: "Added By",
    },
    {
        accessorKey: "enabled_at",
        header: "Enabled At",
    },
];

function KillswitchTable({ data }: { data: KillswitchesData }) {
    const table = useReactTable({
        data: data!.killswitches,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default function KillswitchData({
    data,
    loading = false,
}: {
    data?: KillswitchesData | null;
    loading: boolean;
}) {
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

    const [maxWidth, setMaxWidth] = useState(1e9);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setMaxWidth(window.innerWidth - 100);
            } else {
                setMaxWidth(window.innerWidth - 350);
            }
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Card
            className="w-fit"
            style={{
                maxWidth,
            }}>
            <CardHeader>
                <CardTitle>Killswitches</CardTitle>
                <CardDescription>
                    This is a list of all killswitches. You can enable or
                    disable them here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Skeleton className="w-full h-20" />
                ) : (
                    <KillswitchTable data={data!} />
                )}
            </CardContent>
        </Card>
    );
}
