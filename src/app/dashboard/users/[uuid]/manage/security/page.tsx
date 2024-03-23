"use client";

import { updateVerifications } from "@/actions/management/user_management";
import {
    AlertDialog,
    AlertDialogAction,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import InputCard from "@/components/user_page/manage/InputCard";
import { UserRow } from "@/components/users/types";
import { UserContext } from "@/context/user_context";
import { useContext, useState } from "react";

function CheckboxInput({
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
    update: (data: boolean) => Promise<void>;
}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

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
                            await update(!checked);
                            setLoading(false);

                            setOpen(false);
                            onChange(!checked);
                        }}>
                        {checked ? "Disable" : "Enable"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default function ManageUserSecurity() {
    const context = useContext(UserContext);

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row flex-wrap gap-2">
                <InputCard
                    title="Email"
                    description="Update the user's e-mail address."
                    initialValue={context?.user?.user.email}
                    placeholder="e.g. test@example.com"
                    type="email"
                    onClick={() => {}}
                />
                <InputCard
                    title="Phone number"
                    description="Update the user's phone number."
                    initialValue={context?.user?.user.phone_number}
                    placeholder="+1234567890"
                    type="tel"
                    onClick={() => {}}
                />
                <InputCard
                    title="Password"
                    description="Reset the user's password."
                    initialValue=""
                    placeholder="New password"
                    type="password"
                    onClick={() => {}}
                />
            </div>
            <Separator />
            <div className="flex flex-row">
                <Card>
                    <CardHeader>
                        <CardTitle>Verifications</CardTitle>
                        <CardDescription>
                            Manage the user's verifications.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <CheckboxInput
                            label="E-mail verified"
                            dialogTitle="E-mail verified"
                            dialogDescription="Are you sure you want to change the e-mail verification status?"
                            checked={
                                context?.user?.user.email_verified ?? false
                            }
                            update={async (data) => {
                                await updateVerifications({
                                    id: context!.user!.user.id,
                                    data: {
                                        email: data,
                                        phone: context!.user!.user
                                            .phone_number_verified,
                                    },
                                });
                            }}
                            onChange={() => {
                                context!.setData({
                                    ...(context!.user as UserRow),
                                    user: {
                                        ...context!.user!.user,
                                        email_verified:
                                            !context!.user!.user.email_verified,
                                    },
                                });
                            }}
                        />
                        <CheckboxInput
                            label="Phone number verified"
                            dialogTitle="Phone number verified"
                            dialogDescription="Are you sure you want to change the phone number verification status?"
                            checked={
                                context?.user?.user.phone_number_verified ??
                                false
                            }
                            update={async (data) => {
                                await updateVerifications({
                                    id: context!.user!.user.id,
                                    data: {
                                        email: context!.user!.user
                                            .email_verified,
                                        phone: data,
                                    },
                                });
                            }}
                            onChange={() => {
                                context!.setData({
                                    ...(context!.user as UserRow),
                                    user: {
                                        ...context!.user!.user,
                                        phone_number_verified:
                                            !context!.user!.user
                                                .phone_number_verified,
                                    },
                                });
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
