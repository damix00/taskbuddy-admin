"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export default function CheckboxInput({
    label,
    checked,
    dialogTitle,
    dialogDescription,
    onChange,
    update,
}: {
    label: string;
    checked: boolean;
    dialogTitle: string;
    dialogDescription: string;
    onChange: (checked: boolean) => void;
    update: (data: boolean) => Promise<boolean>;
}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="flex flex-row items-center justify-between font-normal gap-4">
                <Label>{label}</Label>
                <Switch checked={checked} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {dialogDescription}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <Button
                        disabled={loading}
                        onClick={async () => {
                            setLoading(true);
                            const res = await update(!checked);
                            setLoading(false);

                            setOpen(false);

                            if (!res) {
                                toast({
                                    title: "Error",
                                    description:
                                        "Something went wrong whilst updating the data.",
                                    variant: "destructive",
                                });
                                return;
                            }

                            toast({
                                title: "Success",
                                description: "Data updated successfully.",
                            });

                            onChange(!checked);
                        }}>
                        {checked ? "Disable" : "Enable"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
