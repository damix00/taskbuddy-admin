"use client";

import { ReportContext } from "@/context/report_context";
import Link from "next/link";
import { useContext, useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { openReportContent } from "../user_page/reports/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { updateReport } from "@/actions/reports";
import useUser from "@/hooks/use_user";
import { useToast } from "../ui/use-toast";

function ReportValue({
    label,
    value,
}: {
    label: string;
    value: string | React.ReactNode;
}) {
    return (
        <div className="flex flex-row gap-2 justify-between w-full">
            <div className="text-sm">{label}</div>
            <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                {value}
            </div>
        </div>
    );
}

export default function ManageReport() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const context = useContext(ReportContext);
    const user = useUser();
    const { toast } = useToast();

    if (!context || !context.report) {
        return <></>;
    }

    let contentType = "";

    switch (context.report.content_type) {
        case 1:
            contentType = "Post";
            break;
        case 2:
            contentType = "Account";
            break;
        default:
            contentType = "Review";
            break;
    }

    const submitReport = async (verdict: boolean) => {
        setLoading(true);

        const r = await updateReport({
            reportId: context.report!.id,
            verdict,
        });

        setOpen(false);
        setLoading(false);

        if (!r) {
            toast({
                title: "Failed to update report",
                description: "An error occurred while updating the report.",
                variant: "destructive",
            });

            return;
        }

        toast({
            title: "Report updated",
            description: "The report has been successfully updated.",
        });

        context.setData({
            ...context.report!,
            reviewed: true,
            verdict,
            reviewed_by: user.user!.user_id,
            // @ts-ignore
            reviewed_by_user: user.user!,
        });
    };

    return (
        <Card className="w-fit h-fit max-w-2xl">
            <CardHeader>
                <CardTitle>Report details</CardTitle>
                <CardDescription>
                    Report #{context.report.id} by{" "}
                    <Link
                        className="link text-muted-foreground"
                        href={`/dashboard/users/${context.report.created_by_user.uuid}`}>
                        @{context.report.created_by_user.username}
                    </Link>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ReportValue
                    label="Reported on"
                    value={new Date(context.report.created_at).toLocaleString()}
                />
                <ReportValue label="Content type" value={contentType} />
                <ReportValue
                    label="Report reason"
                    value={context.report.reason}
                />
                <ReportValue
                    label="Review status"
                    value={
                        context.report.reviewed ? "Reviewed" : "Not reviewed"
                    }
                />
                {context.report.reviewed && (
                    <ReportValue
                        label="Verdict"
                        value={context.report.verdict ? "Accepted" : "Declined"}
                    />
                )}
                {context.report.reviewed && (
                    <ReportValue
                        label="Reviewed by"
                        value={
                            <Link
                                className="link text-muted-foreground"
                                href={`/dashboard/users/${
                                    context.report.reviewed_by_user!.uuid
                                }`}>
                                @{context.report.reviewed_by_user!.username}
                            </Link>
                        }
                    />
                )}
            </CardContent>
            <CardFooter className="flex flex-row gap-2 justify-end">
                <Button
                    variant="outline"
                    onClick={async () => {
                        await openReportContent(
                            context.report!.content_type,
                            context.report!.content_id
                        );
                    }}>
                    Open content
                </Button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <Button variant="default">Update report</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Update report</DialogTitle>
                            <DialogDescription>
                                Update the status of this report.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                disabled={loading}
                                onClick={() => submitReport(false)}
                                variant="outline">
                                Decline
                            </Button>
                            <Button
                                disabled={loading}
                                variant="default"
                                onClick={() => submitReport(true)}>
                                Accept
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
}
