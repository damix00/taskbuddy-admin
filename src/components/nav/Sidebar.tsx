"use client";

import {
    Flag,
    LineChart,
    LockKeyhole,
    Newspaper,
    Server,
    User,
} from "lucide-react";
import { Button } from "../ui/button";
import ProfileData from "./ProfileData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";

type Route = {
    href: string;
    label: string;
    icon: React.ReactNode;
};

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-xs md:pl-2 text-zinc-600 dark:text-zinc-400 font-semibold uppercase">
            {children}
        </p>
    );
}

function RouteViewSmall({ href, label, icon }: Route) {
    const pathname = usePathname();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link href={href}>
                    <Button
                        variant={pathname === href ? "secondary" : "ghost"}
                        size="icon">
                        {icon}
                    </Button>
                </Link>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
        </Tooltip>
    );
}

function RouteView({ href, label, icon }: Route) {
    const pathname = usePathname();

    return (
        <Link href={href}>
            <Button
                variant={pathname === href ? "secondary" : "ghost"}
                size="full">
                {icon}
                {label}
            </Button>
        </Link>
    );
}

export default function DashboardSidebar(props: any) {
    const appItems: Route[] = [
        {
            href: "/dashboard/analytics",
            label: "Analytics",
            icon: <LineChart className="w-4 h-4" />,
        },
        {
            href: "/dashboard/server",
            label: "Server",
            icon: <Server className="w-4 h-4" />,
        },
        {
            href: "/dashboard/killswitches",
            label: "Killswitches",
            icon: <LockKeyhole className="w-4 h-4" />,
        },
    ];

    const contentItems: Route[] = [
        {
            href: "/dashboard/users",
            label: "Users",
            icon: <User className="w-4 h-4" />,
        },
        {
            href: "/dashboard/posts",
            label: "Posts",
            icon: <Newspaper className="w-4 h-4" />,
        },
        {
            href: "/dashboard/reports",
            label: "Reports",
            icon: <Flag className="w-4 h-4" />,
        },
    ];

    return (
        <>
            {/* Sidebar for desktop */}
            <aside className="hidden md:flex flex-col h-full inset-y-0 left-0 w-60 bg-zinc-100 dark:bg-zinc-950 border-r overflow-y-auto transition duration-300 z-30 flex-shrink-0">
                <div className="border-b p-2 w-full h-14">
                    <ProfileData />
                </div>
                <nav className="flex flex-col p-2 gap-2">
                    <SectionTitle>App settings</SectionTitle>
                    {appItems.map((item, index) => (
                        <RouteView {...item} key={`${index}-nav`} />
                    ))}
                    <Separator />
                    <SectionTitle>Content</SectionTitle>
                    {contentItems.map((item, index) => (
                        <RouteView {...item} key={`${index}-nav-content`} />
                    ))}
                </nav>
            </aside>
            {/* Sidebar for mobile */}
            <aside className="flex flex-col items-center md:hidden top-0 left-0 w-14 h-full bg-zinc-100 dark:bg-zinc-950 border-r z-30">
                <div className="border-b w-full flex justify-center items-center p-2">
                    <ProfileData />
                </div>
                <nav className="w-full flex flex-col items-center gap-2 overflow-y-auto py-2">
                    <TooltipProvider>
                        <SectionTitle>App</SectionTitle>
                        {appItems.map((item, index) => (
                            <RouteViewSmall
                                {...item}
                                key={`${index}-nav-mob`}
                            />
                        ))}
                        <Separator />
                        <SectionTitle>Data</SectionTitle>
                        {contentItems.map((item, index) => (
                            <RouteViewSmall
                                {...item}
                                key={`${index}-nav-content-mob`}
                            />
                        ))}
                    </TooltipProvider>
                </nav>
            </aside>
        </>
    );
}
