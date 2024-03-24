"use client";

import { useContext } from "react";
import InputCard from "../InputCard";
import { UserContext } from "@/context/user_context";
import {
    updateLoginDetails,
    updatePassword,
} from "@/actions/management/user/security";
import { undoToast } from "@/lib/toast";
import { useToast } from "@/components/ui/use-toast";

export default function SecurityInputFields() {
    const context = useContext(UserContext);
    const { toast } = useToast();

    return (
        <div className="flex flex-row flex-wrap gap-2">
            <InputCard
                title="Login details"
                description="Update the user's login details."
                inputs={[
                    {
                        initialValue: context?.user?.user.email ?? "",
                        label: "E-mail",
                        placeholder: "e.g. test@example.com",
                        type: "email",
                    },
                    {
                        initialValue: context?.user!.user.phone_number ?? "",
                        label: "Phone number",
                        placeholder: "+1234567890",
                        type: "tel",
                    },
                ]}
                buttonText="Update"
                onClick={async (v) => {
                    if (!context?.user) return;

                    const oldEmail = context.user.user.email;
                    const oldPhone = context.user.user.phone_number;

                    const res = await updateLoginDetails({
                        id: context.user.user.id,
                        data: {
                            email: v[0],
                            phone: v[1],
                        },
                    });

                    if (!res) {
                        toast({
                            title: "Error",
                            description:
                                "Failed to update the user's login details.",
                            variant: "destructive",
                        });
                        return;
                    }

                    context.setData({
                        ...(context.user as any),
                        user: {
                            ...context.user.user,
                            email: v[0],
                            phone_number: v[1],
                        },
                    });

                    undoToast({
                        toast,
                        title: "Login details updated.",
                        description:
                            "The user's login details have been updated.",
                        variant: "default",
                        undoAction: async (data) => {
                            await updateLoginDetails(data);
                            context.setData({
                                ...(context.user as any),
                                user: {
                                    ...context.user!.user,
                                    email: oldEmail,
                                    phone_number: oldPhone,
                                },
                            });
                        },
                        undoParams: {
                            id: context.user.user.id,
                            data: {
                                email: oldEmail,
                                phone: oldPhone,
                            },
                        },
                    });
                }}
            />
            <InputCard
                title="Password"
                description="Reset the user's password."
                inputs={[
                    {
                        initialValue: "",
                        label: "New password",
                        placeholder: "e.g. password123",
                        type: "password",
                    },
                ]}
                onClick={async (v) => {
                    if (!context?.user) return;

                    if (v[0].length < 6) {
                        toast({
                            title: "Error",
                            description:
                                "Password must be at least 6 characters.",
                            variant: "destructive",
                        });

                        return;
                    }

                    const res = await updatePassword({
                        id: context.user.user.id,
                        password: v[0],
                    });

                    if (!res) {
                        toast({
                            title: "Error",
                            description: "Failed to reset the user's password.",
                            variant: "destructive",
                        });
                        return;
                    }

                    toast({
                        title: "Password updated.",
                        description: "The user password has been reset.",
                    });
                }}
                buttonText="Reset"
            />
        </div>
    );
}
