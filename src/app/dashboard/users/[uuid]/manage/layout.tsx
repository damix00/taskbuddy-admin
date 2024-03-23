"use client";

import CardSkeleton from "@/components/display/CardSkeleton";
import { SidebarItem } from "@/components/nav/Sidebar";
import { Separator } from "@/components/ui/separator";
import { UserContext } from "@/context/user_context";
import { LockKeyhole, Shield, User } from "lucide-react";
import { useContext } from "react";

export default function ManageUserLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {
        uuid: string;
    };
}) {
    const context = useContext(UserContext);

    return (
        <div className="p-4 lg:p-8 flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
                <h1 className="text-2xl font-bold">Manage user</h1>
                <div className="text-muted-foreground">
                    Manage user account, security and profile.
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-row overflow-x-auto lg:overflow-x-hidden lg:flex-col gap-2 border-b pb-2 lg:border-b-0 px-2 w-full lg:w-fit lg:min-w-[200px]">
                    <SidebarItem
                        label="Security"
                        icon={<LockKeyhole className="w-4 h-4" />}
                        href={`/dashboard/users/${params.uuid}/manage/security`}
                        scroll={false}
                    />
                    <SidebarItem
                        label="Profile"
                        icon={<User className="w-4 h-4" />}
                        href={`/dashboard/users/${params.uuid}/manage/profile`}
                        scroll={false}
                    />
                    <SidebarItem
                        label="Access"
                        icon={<Shield className="w-4 h-4" />}
                        href={`/dashboard/users/${params.uuid}/manage/access`}
                        scroll={false}
                    />
                </div>
                {context?.user ? children : <CardSkeleton count={3} />}
            </div>
        </div>
    );
}
