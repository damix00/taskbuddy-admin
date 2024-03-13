import LocationDisplay from "@/components/display/LocationDisplay";
import { UserRow } from "@/components/users/types";

export default function ProfileLocation({ user }: { user: UserRow }) {
    return (
        <div className="flex flex-col items-start w-full gap-1 mt-2">
            <div className="flex flex-row gap-2 items-center w-full">
                <div className="text-md font-semibold">Profile location</div>
            </div>
            <LocationDisplay
                name={user.profile.location.location_text!}
                lat={user.profile.location.lat!}
                lon={user.profile.location.lon!}
                width="250px"
                height="250px"
            />
        </div>
    );
}
