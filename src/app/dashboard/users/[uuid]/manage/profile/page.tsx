import { Separator } from "@/components/ui/separator";
import ManageBadges from "@/components/user_page/manage/profile/ManageBadges";
import ManagePublicProfile from "@/components/user_page/manage/profile/ManagePublicProfile";

export default function ManageProfile() {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="space-y-4">
                <div className="flex flex-col gap-0.5">
                    <h1 className="text-2xl font-bold">
                        Manage public profile
                    </h1>
                    <div className="text-muted-foreground">
                        Manage public profile information and settings.
                    </div>
                </div>
                <ManagePublicProfile />
            </div>
            <Separator />
            <ManageBadges />
        </div>
    );
}
