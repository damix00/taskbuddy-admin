"use client";

import { updateVerifications } from "@/actions/management/user/security";
import CheckboxInput from "@/components/input/CheckboxInput";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { UserRow } from "@/components/users/types";
import { UserContext } from "@/context/user_context";
import { useContext } from "react";

export default function SecurityVerifications() {
    const context = useContext(UserContext);

    return (
        <Card className="w-fit h-fit">
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
                    checked={context?.user?.user.email_verified ?? false}
                    update={async (data) => {
                        return await updateVerifications({
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
                    checked={context?.user?.user.phone_number_verified ?? false}
                    update={async (data) => {
                        return await updateVerifications({
                            id: context!.user!.user.id,
                            data: {
                                email: context!.user!.user.email_verified,
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
                                    !context!.user!.user.phone_number_verified,
                            },
                        });
                    }}
                />
            </CardContent>
        </Card>
    );
}
