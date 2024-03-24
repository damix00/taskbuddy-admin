"use client";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { RemoteConfigItem, RemoteConfigTypes } from "./types";
import TableCard from "@/components/data/CustomTable";
import {
    Dialog,
    DialogButton,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { saveRemoteConfigValue } from "@/actions/firebase";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import memoize from "@/hooks/custom_memo";

function ValueCell({ row }: any) {
    const { toast } = useToast();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(row.original.value);
    const initialValue = useRef(row.original.value);

    let newValue = value;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button variant="outline">{value}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update {row.original.name}</DialogTitle>
                    <DialogDescription>
                        Add a new value for {row.original.name}.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Label htmlFor="value">Value</Label>
                    <Input
                        onChange={(e) => {
                            newValue = e.target.value;
                        }}
                        id="value"
                        defaultValue={value}
                        placeholder="e.g. 10"
                    />
                </div>
                <DialogFooter>
                    <DialogButton
                        disabled={loading}
                        onClick={async () => {
                            setLoading(true);

                            const data = await saveRemoteConfigValue(
                                row.original.name,
                                newValue
                            );

                            if (!data) {
                                toast({
                                    title: "Error",
                                    description:
                                        "There was an error saving the value.",
                                    variant: "destructive",
                                });
                            } else {
                                toast({
                                    title: "Success",
                                    description: "Value saved successfully.",
                                    action: (
                                        <ToastAction
                                            altText="Undo"
                                            onClick={async () => {
                                                const data =
                                                    await saveRemoteConfigValue(
                                                        row.original.name,
                                                        initialValue.current
                                                    );

                                                if (!data) {
                                                    toast({
                                                        title: "Error",
                                                        description:
                                                            "There was an error reverting the value.",
                                                        variant: "destructive",
                                                    });
                                                } else {
                                                    setValue(
                                                        initialValue.current
                                                    );

                                                    toast({
                                                        title: "Success",
                                                        description:
                                                            "Value reverted successfully.",
                                                    });
                                                }

                                                setValue(initialValue.current);
                                            }}>
                                            Undo
                                        </ToastAction>
                                    ),
                                });
                            }

                            // Close the dialog
                            setOpen(false);

                            setLoading(false);
                            setValue(newValue);
                        }}>
                        Save
                    </DialogButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

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
        cell: ValueCell,
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
    const table = memoize(
        () =>
            useReactTable({
                data: data?.items || [],
                columns,
                getCoreRowModel: getCoreRowModel(),
            }),
        [data]
    );

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
