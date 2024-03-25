import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserRow } from "@/components/users/types";
import ProfileSection from "./ProfileSection";

export default function AccountInformation({ user }: { user: UserRow }) {
    return (
        <>
            <div className="text-md font-bold">Account information</div>
            {/* Role */}
            <div className="flex flex-col gap-2 w-full mt-2">
                <ProfileSection label="ID">{user.user.id}</ProfileSection>
                <ProfileSection label="Role">
                    <Badge variant="outline">{user.user.role}</Badge>
                </ProfileSection>
                {/* Auth provider */}
                <ProfileSection label="Auth provider">
                    <Badge variant="outline">{user.user.auth_provider}</Badge>
                </ProfileSection>
                {/* Email */}
                <ProfileSection label="Email">
                    {user.user.email.length > 20
                        ? `${user.user.email.slice(0, 20)}...`
                        : user.user.email}
                </ProfileSection>
                {/* Phone */}
                <ProfileSection label="Phone">
                    {user.user.phone_number}
                </ProfileSection>
                {/* Created at */}
                <ProfileSection label="Joined">
                    {new Date(user.user.created_at).toLocaleString()}
                </ProfileSection>
                <Separator className="my-2" />
                {/* Premium */}
                <ProfileSection label="Premium">
                    {user.user.has_premium ? "Yes" : "No"}
                </ProfileSection>
                {/* Verified */}
                <ProfileSection label="Verified">
                    {user.user.verified ? "Yes" : "No"}
                </ProfileSection>
                {/* Email verified */}
                <ProfileSection label="Email verified">
                    {user.user.email_verified ? "Yes" : "No"}
                </ProfileSection>
                {/* Phone verified */}
                <ProfileSection label="Phone verified">
                    {user.user.phone_number_verified ? "Yes" : "No"}
                </ProfileSection>
                {/* Last login */}
                <ProfileSection label="Last login">
                    {user.user.last_login
                        ? new Date(user.user.last_login).toLocaleString()
                        : "Never"}
                </ProfileSection>
                <Separator className="my-2" />
                {/* Limited access */}
                <div className="flex flex-col text-sm">
                    <div className="text-muted-foreground">Limited access</div>
                    <div className="flex flex-row gap-2 flex-wrap mt-2">
                        {user.user.limited_access.length != 0
                            ? user.user.limited_access.map((access) => (
                                  <Badge key={access} variant="outline">
                                      {access}
                                  </Badge>
                              ))
                            : "None"}
                    </div>
                </div>
            </div>
        </>
    );
}
