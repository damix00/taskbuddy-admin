"use client";

import { deleteAccount } from "@/actions/management/user/actions";
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
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { UserContext } from "@/context/user_context";
import { useContext, useState } from "react";

export default function DeleteAccount() {
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const context = useContext(UserContext);
    const { toast } = useToast();

    return (
        <Card className="w-fit">
            <CardHeader>
                <CardTitle>Danger zone</CardTitle>
                <CardDescription>
                    Delete this account permanently.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <AlertDialog
                    open={open}
                    onOpenChange={(v) => {
                        setOpen(v);
                        if (!v) {
                            setChecked(false);
                        }
                    }}>
                    <AlertDialogTrigger>
                        <Button variant="destructive">Delete account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete account</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you absolutely sure you want to delete this
                                account? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox
                                id="delete-acc-checkbox"
                                checked={checked}
                                onCheckedChange={(v) => {
                                    setChecked(v as any as boolean);
                                }}
                            />
                            <Label htmlFor="delete-acc-checkbox">
                                I understand the consequences of deleting this
                                account.
                            </Label>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                                disabled={!checked || loading}
                                variant="destructive"
                                onClick={async () => {
                                    setLoading(true);

                                    const r = await deleteAccount({
                                        userId: context!.user!.user.id,
                                    });

                                    setLoading(false);
                                    setOpen(false);

                                    if (!r) {
                                        toast({
                                            title: "Failed to delete account",
                                            description:
                                                "An error occurred while deleting the account.",
                                            variant: "destructive",
                                        });
                                        return;
                                    }

                                    toast({
                                        title: "Account deleted",
                                        description:
                                            "The account has been deleted.",
                                    });
                                }}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
}
