"use client";

import { updateRole } from "@/actions/management/user/access";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { UserContext } from "@/context/user_context";
import { undoToast } from "@/lib/toast";
import { useContext, useState } from "react";

function SaveRole({ active, role }: { active: boolean; role: string }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const context = useContext(UserContext);
    const { toast } = useToast();

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant={active ? "default" : "outline"}
                    className="w-full">
                    Save
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Update role</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to update the role?
                        Misconfiguration may lead to security vulnerabilities.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        disabled={loading}
                        onClick={async () => {
                            setLoading(true);
                            const oldRole = context!.user!.user.role;

                            // Update the role
                            const data = await updateRole({
                                userId: context!.user!.user.id,
                                role,
                            });

                            setOpen(false);
                            setLoading(false);

                            if (!data) {
                                console.error("Failed to update role");

                                toast({
                                    title: "Failed to update role",
                                    description:
                                        "An error occurred while updating the role.",
                                    variant: "destructive",
                                });

                                return;
                            }

                            undoToast({
                                toast,
                                title: "Role updated",
                                description: "The role has been updated.",
                                undoAction: async (data: any) => {
                                    await updateRole(data);

                                    context?.setData({
                                        ...context.user!,
                                        user: {
                                            ...context.user!.user,
                                            role: oldRole,
                                        },
                                    });
                                },
                                undoParams: {
                                    userId: context!.user!.user.id,
                                    role: oldRole,
                                },
                            });

                            context?.setData({
                                ...context.user!,
                                user: {
                                    ...context.user!.user,
                                    role,
                                },
                            });
                        }}>
                        Update
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default function ManageRole() {
    const context = useContext(UserContext);
    const [role, setRole] = useState(context!.user!.user.role);

    return (
        <Card className="w-fit max-w-80 h-fit">
            <CardHeader>
                <CardTitle>Manage role</CardTitle>
                <CardDescription>
                    Manage the role of the user. This will affect the user's
                    access.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Select
                    defaultValue={context!.user!.user.role}
                    onValueChange={(v) => {
                        setRole(v);
                    }}>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardContent>
            <CardFooter>
                <SaveRole
                    role={role}
                    active={context!.user!.user.role !== role}
                />
            </CardFooter>
        </Card>
    );
}
