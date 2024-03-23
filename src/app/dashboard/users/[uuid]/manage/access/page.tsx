import { Separator } from "@/components/ui/separator";
import ManageLimitedAccess from "@/components/user_page/manage/access/ManageLimitedAccess";
import ManageRole from "@/components/user_page/manage/access/ManageRole";

export default function ManageUserAccess() {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row flex-wrap gap-2">
                <ManageRole />
                <ManageLimitedAccess />
            </div>
        </div>
    );
}
