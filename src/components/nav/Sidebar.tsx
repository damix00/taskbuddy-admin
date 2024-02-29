"use client";

import { HomeIcon, UserIcon } from "lucide-react";
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

export default function DashboardSidebar(props: any) {
    const pathname = usePathname();

    const items = [
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: <HomeIcon className="w-4 h-4" />,
        },
        {
            href: "/dashboard/users",
            label: "Users",
            icon: <UserIcon className="w-4 h-4" />,
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
                    {items.map((item, index) => (
                        <Link href={item.href} key={index}>
                            <Button
                                variant={
                                    pathname === item.href
                                        ? "secondary"
                                        : "ghost"
                                }
                                size="full">
                                {item.icon}
                                {item.label}
                            </Button>
                        </Link>
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
                        {items.map((item, index) => (
                            <Tooltip key={`${index}-nav-mob`}>
                                <TooltipTrigger asChild>
                                    <Link href={item.href}>
                                        <Button
                                            variant={
                                                pathname === item.href
                                                    ? "secondary"
                                                    : "ghost"
                                            }
                                            size="icon">
                                            {item.icon}
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>{item.label}</TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </nav>
            </aside>
        </>
    );
}
