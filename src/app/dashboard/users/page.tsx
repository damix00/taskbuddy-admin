import { PageContent, TopBar, TopBarTitle } from "@/components/nav/TopBar";
import { Separator } from "@/components/ui/separator";
import UserSearchField from "@/components/users/filters/SearchField";
import UserTable from "@/components/users/UserTable";
import UserData from "@/components/users/Users.server";
import { Suspense } from "react";
import { useParams } from "next/navigation";

export default function UsersPage({
    searchParams,
}: {
    searchParams: Record<string, string | undefined>;
}) {
    const page = parseInt(searchParams?.page || "1");

    return (
        <div className="w-full">
            <TopBar>
                <TopBarTitle>Users</TopBarTitle>
            </TopBar>
            <PageContent>
                <div className="flex gap-2 flex-col">
                    <div className="flex flex-col md:flex-row gap-2">
                        <UserSearchField />
                        {/* <div className="hidden md:block">
                            <Separator
                                orientation="vertical"
                                className="h-full"
                            />
                        </div> */}
                    </div>
                    <Suspense
                        fallback={
                            <UserTable
                                search={searchParams.search}
                                page={page}
                                loading
                            />
                        }>
                        <UserData
                            page={page}
                            query={searchParams.search || ""}
                            sortBy={searchParams.sort_by || "created_at"}
                            sortOrder={searchParams.sort_order || "desc"}
                        />
                    </Suspense>
                </div>
            </PageContent>
        </div>
    );
}
