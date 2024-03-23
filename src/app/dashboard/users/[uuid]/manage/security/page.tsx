import CardSkeleton from "@/components/display/CardSkeleton";
import { Separator } from "@/components/ui/separator";
import SecurityInputFields from "@/components/user_page/manage/security/InputFields";
import SecurityRecentLogins from "@/components/user_page/manage/security/RecentLogins";
import SecurityVerifications from "@/components/user_page/manage/security/Verifications";
import { Suspense } from "react";

export default function ManageUserSecurity({
    params,
}: {
    params: {
        uuid: string;
    };
}) {
    return (
        <div className="flex flex-col gap-4 w-full">
            <SecurityInputFields />
            <Separator />
            <div className="flex flex-row gap-2 flex-wrap">
                <SecurityVerifications />
                <Suspense fallback={<CardSkeleton randomWidth={false} />}>
                    <SecurityRecentLogins uuid={params.uuid} />
                </Suspense>
            </div>
        </div>
    );
}
