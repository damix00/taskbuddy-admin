import CardSkeleton from "@/components/display/CardSkeleton";
import LastSession from "@/components/user_page/overview/LastSession.server";
import { Suspense } from "react";

export default function Page({
    params,
}: {
    params: {
        uuid: string;
    };
}) {
    return (
        <div className="p-4">
            <Suspense fallback={<CardSkeleton count={3} />}>
                <LastSession uuid={params.uuid} />
            </Suspense>
        </div>
    );
}
