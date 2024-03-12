import { Separator } from "@/components/ui/separator";
import { UserRow } from "@/components/users/types";

export default function Biography({ user }: { user: UserRow }) {
    return (
        <div className="flex flex-col items-start w-full justify-start my-2">
            <div className="text-md font-semibold">Biography</div>
            <div className="text-sm text-muted-foreground">
                {user.profile.bio}
            </div>
        </div>
    );
}
