"use client";

import { SessionContext } from "@/context/session_context";
import { useContext, useState } from "react";
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
import { Button } from "../ui/button";
import { deleteSession } from "@/actions/management/sessions";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export default function DeleteSession({ uuid }: { uuid: string }) {
    const context = useContext(SessionContext);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    if (!context || !context.session) {
        return <></>;
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete session</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete session</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this session?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        disabled={loading}
                        variant="destructive"
                        onClick={async () => {
                            setLoading(true);

                            const res = await deleteSession({
                                session_id: context!.session!.id,
                            });

                            setOpen(false);
                            setLoading(false);

                            if (!res) {
                                toast({
                                    title: "Failed to delete session",
                                    description:
                                        "An error occurred while deleting the session.",
                                    variant: "destructive",
                                });

                                return;
                            }

                            toast({
                                title: "Session deleted",
                                description: "The session has been deleted.",
                            });

                            router.replace(`/dashboard/users/${uuid}/sessions`);
                        }}>
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
