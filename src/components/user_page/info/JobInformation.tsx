import { UserRow } from "@/components/users/types";
import ProfileSection from "./ProfileSection";
import { Separator } from "@/components/ui/separator";

export default function JobInformation({ user }: { user: UserRow }) {
    return (
        <>
            <div className="text-md font-bold">Profile information</div>
            <div className="flex flex-col gap-2 w-full mt-2">
                {/* Followers */}
                <ProfileSection label="Followers">
                    {user.profile.followers}
                </ProfileSection>
                {/* Following */}
                <ProfileSection label="Following">
                    {user.profile.following}
                </ProfileSection>
                {/* Post count */}
                <ProfileSection label="Post count">
                    {user.profile.post_count}
                </ProfileSection>
                <Separator className="my-2" />
                {/* Ratings count employee */}
                <ProfileSection label="Rating count employee">
                    {user.profile.rating_count_employee}
                </ProfileSection>
                {/* Ratings count employer */}
                <ProfileSection label="Rating count employer">
                    {user.profile.rating_count_employer}
                </ProfileSection>
                {/* Rating employee */}
                <ProfileSection label="Rating employee">
                    {user.profile.rating_employee}
                </ProfileSection>
                {/* Rating employer */}
                <ProfileSection label="Rating employer">
                    {user.profile.rating_employer}
                </ProfileSection>
                <Separator className="my-2" />
                {/* Cancelled employee */}
                <ProfileSection label="Cancelled employee">
                    {user.profile.cancelled_employee}
                </ProfileSection>
                {/* Cancelled employer */}
                <ProfileSection label="Cancelled employer">
                    {user.profile.cancelled_employer}
                </ProfileSection>
                {/* Completed employee */}
                <ProfileSection label="Completed employee">
                    {user.profile.completed_employee}
                </ProfileSection>
                {/* Completed employer */}
                <ProfileSection label="Completed employer">
                    {user.profile.completed_employer}
                </ProfileSection>
            </div>
        </>
    );
}
