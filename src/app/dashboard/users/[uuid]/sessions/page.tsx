import CardSkeleton from "@/components/display/CardSkeleton";
import SessionsTable from "@/components/user_page/sessions/SessionsTable_server";
import { Suspense } from "react";

export default function UserSessions({
    params,
    searchParams,
}: {
    params: {
        uuid: string;
    };
    searchParams: Record<string, string | undefined>;
}) {
    return (
        <div className="p-4">
            <Suspense
                fallback={
                    <CardSkeleton
                        width={400}
                        height={500}
                        count={1}
                        randomWidth={false}
                    />
                }>
                <SessionsTable
                    uuid={params.uuid}
                    page={parseInt(searchParams.page || "1")}
                    lastId={parseInt(searchParams.lastId || "0")}
                />
            </Suspense>
        </div>
    );
}
