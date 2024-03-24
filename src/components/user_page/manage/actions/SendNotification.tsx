"use client";

import { useToast } from "@/components/ui/use-toast";
import InputCard from "../InputCard";
import { sendNotification } from "@/actions/management/user/actions";
import { useContext } from "react";
import { UserContext } from "@/context/user_context";

export default function SendNotification() {
    const { toast } = useToast();
    const context = useContext(UserContext);

    if (!context || !context.user) {
        return <></>;
    }

    return (
        <InputCard
            title="Send notification"
            description="Send a notification to this user."
            inputs={[
                {
                    initialValue: "",
                    label: "Title",
                    type: "text",
                    placeholder: "e.g. Important message",
                },
                {
                    initialValue: "",
                    label: "Body",
                    type: "text",
                    placeholder: "e.g. You have a new message.",
                },
                {
                    initialValue: "",
                    label: "Image (optional)",
                    type: "text",
                    placeholder: "e.g. https://example.com/image.jpg",
                },
            ]}
            buttonText="Send"
            onClick={async (data) => {
                const res = await sendNotification({
                    userId: context!.user!.user.id,
                    title: data[0],
                    body: data[1],
                    image: data[2],
                });

                if (!res) {
                    toast({
                        title: "Failed to send notification",
                        description:
                            "An error occurred while sending the notification.",
                        variant: "destructive",
                    });

                    return;
                }

                toast({
                    title: "Notification sent",
                    description: "The notification was sent successfully.",
                });
            }}
        />
    );
}
