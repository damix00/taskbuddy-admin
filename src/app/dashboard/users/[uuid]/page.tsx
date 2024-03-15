import CardSkeleton from "@/components/display/CardSkeleton";
import { Separator } from "@/components/ui/separator";
import LastSession from "@/components/user_page/overview/LastSession.server";
import UserMetrics from "@/components/user_page/overview/UserMetrics.server";
import { Suspense } from "react";

export default function Page({
    params,
}: {
    params: {
        uuid: string;
    };
}) {
    return (
        <div className="p-4 gap-4 flex flex-col">
            <Suspense fallback={<CardSkeleton count={3} />}>
                <LastSession uuid={params.uuid} />
            </Suspense>
            <Separator />
            <Suspense fallback={<CardSkeleton count={1} />}>
                <UserMetrics uuid={params.uuid} />
            </Suspense>
        </div>
    );
}
