import { PageContent, TopBar, TopBarTitle } from "@/components/nav/TopBar";
import UserTable from "@/components/users/UserTable";
import UserData from "@/components/users/Users.server";
import { Suspense } from "react";

export default function UsersPage() {
    return (
        <div className="w-full">
            <TopBar>
                <TopBarTitle>Users</TopBarTitle>
            </TopBar>
            <PageContent>
                <Suspense fallback={<UserTable loading />}>
                    <UserData />
                </Suspense>
            </PageContent>
        </div>
    );
}
