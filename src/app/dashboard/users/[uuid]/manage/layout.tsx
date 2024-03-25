"use client";

import CardSkeleton from "@/components/display/CardSkeleton";
import ContentSubNav from "@/components/display/content/ContentSubNav";
import { SidebarItem } from "@/components/nav/Sidebar";
import { Separator } from "@/components/ui/separator";
import { UserContext } from "@/context/user_context";
import { LockKeyhole, Plus, Shield, User } from "lucide-react";
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

    const items = [
        {
            href: `/dashboard/users/${params.uuid}/manage/security`,
            label: "Security",
            icon: <LockKeyhole className="w-4 h-4" />,
            scroll: false,
        },
        {
            href: `/dashboard/users/${params.uuid}/manage/profile`,
            label: "Profile",
            icon: <User className="w-4 h-4" />,
            scroll: false,
        },
        {
            href: `/dashboard/users/${params.uuid}/manage/access`,
            label: "Access",
            icon: <Shield className="w-4 h-4" />,
            scroll: false,
        },
        {
            href: `/dashboard/users/${params.uuid}/manage/actions`,
            label: "Actions",
            icon: <Plus className="w-4 h-4" />,
            scroll: false,
        },
    ];

    return (
        <div className="p-4 lg:p-8 flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
                <h1 className="text-2xl font-bold">Manage user</h1>
                <div className="text-muted-foreground">
                    Manage user account, security and profile.
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
                <ContentSubNav items={items} />
                {context?.user ? children : <CardSkeleton count={3} />}
            </div>
        </div>
    );
}
