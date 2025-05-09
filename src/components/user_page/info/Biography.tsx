import { Separator } from "@/components/ui/separator";
import { UserRow } from "@/components/users/types";

export default function Biography({ user }: { user: UserRow }) {
    return (
        <div className="flex flex-col items-start w-full justify-start mt-2">
            <div className="text-md font-semibold">Biography</div>
            <div className="text-sm whitespace-pre-line text-muted-foreground">
                {user.profile.bio}
            </div>
        </div>
    );
}
