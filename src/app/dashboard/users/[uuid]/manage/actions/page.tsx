import { Separator } from "@/components/ui/separator";
import DeleteAccount from "@/components/user_page/manage/actions/DeleteAccount";
import SendNotification from "@/components/user_page/manage/actions/SendNotification";

export default function ManageUserActions() {
    return (
        <div className="flex flex-col gap-4 w-full items-start">
            <div className="px-2">
                <SendNotification />
            </div>
            <Separator />
            <div className="px-2">
                <DeleteAccount />
            </div>
        </div>
    );
}
