import { ScrollArea } from "@/components/ui/scroll-area";
import ProfileInfoData from "@/components/user_page/info/ProfileInfo.server";
import ProfileInfoSkeleton from "@/components/user_page/info/ProfileInfoSkeleton";
import { Suspense } from "react";

export default function ProfileInfo({
    params,
}: {
    params: {
        uuid: string;
    };
}) {
    return (
        <ScrollArea className="md:h-screen md:min-w-0 w-80 min-w-full border-b md:border-r">
            <Suspense fallback={<ProfileInfoSkeleton />}>
                <ProfileInfoData uuid={params.uuid} />
            </Suspense>
        </ScrollArea>
    );
}
