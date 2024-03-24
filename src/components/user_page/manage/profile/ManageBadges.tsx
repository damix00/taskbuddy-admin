"use client";

import {
    setProfilePremium,
    setProfilePrivate,
    setProfileVerified,
} from "@/actions/management/user/profile";
import CheckboxInput from "@/components/input/CheckboxInput";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { UserContext } from "@/context/user_context";
import { useContext } from "react";

export default function ManageBadges() {
    const context = useContext(UserContext);

    if (!context || !context.user) {
        return <></>;
    }

    return (
        <Card className="w-fit max-w-sm">
            <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>
                    These are the "badges" that are displayed on the user's
                    profile.{"\n"}
                    These include 'verified', 'premium' and 'private'.
                </CardDescription>
            </CardHeader>
            <CardContent className="w-full flex flex-col gap-2">
                <CheckboxInput
                    label="Verified"
                    checked={context.user.user.verified}
                    dialogTitle="Update verification status"
                    dialogDescription="Are you sure you want to change the verification status?"
                    onChange={(checked) => {
                        context.setData({
                            ...context!.user!,
                            user: {
                                ...context!.user!.user,
                                verified: checked,
                            },
                        });
                    }}
                    update={async (data) => {
                        return await setProfileVerified({
                            user_id: context!.user!.user.id,
                            is_verified: data,
                        });
                    }}
                />

                <CheckboxInput
                    label="Premium"
                    checked={context.user.user.has_premium}
                    dialogTitle="Update premium status"
                    dialogDescription="Are you sure you want to change the premium status?"
                    onChange={(checked) => {
                        context.setData({
                            ...context!.user!,
                            user: {
                                ...context!.user!.user,
                                has_premium: checked,
                            },
                        });
                    }}
                    update={async (data) => {
                        return await setProfilePremium({
                            user_id: context!.user!.user.id,
                            has_premium: data,
                        });
                    }}
                />

                <CheckboxInput
                    label="Private"
                    checked={context.user.profile.is_private}
                    dialogTitle="Update private status"
                    dialogDescription="Are you sure you want to change the private status?"
                    onChange={(checked) => {
                        context.setData({
                            ...context!.user!,
                            profile: {
                                ...context!.user!.profile,
                                is_private: checked,
                            },
                        });
                    }}
                    update={async (data) => {
                        return await setProfilePrivate({
                            profile_id: context!.user!.profile.id,
                            is_private: data,
                        });
                    }}
                />
            </CardContent>
        </Card>
    );
}
