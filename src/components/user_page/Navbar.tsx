"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

function NavbarLink({
    children,
    href,
    uuid,
}: {
    children: React.ReactNode;
    href: string;
    uuid: string;
}) {
    const pathname = usePathname();

    return (
        <Button
            variant={
                pathname == href ||
                (pathname.startsWith(href) &&
                    href != `/dashboard/users/${uuid}`)
                    ? "secondary"
                    : "ghost"
            }
            asChild>
            <Link scroll={false} href={href}>
                {children}
            </Link>
        </Button>
    );
}

export default function UserNavbar({ uuid }: { uuid: string }) {
    return (
        <ScrollArea>
            <div className="static lg:fixed bg-zinc-950/80 backdrop-blur-md lg:top-0 w-full h-14 border-b flex flex-row items-center justify-start px-4 gap-4 z-50">
                <NavbarLink uuid={uuid} href={`/dashboard/users/${uuid}`}>
                    Overview
                </NavbarLink>
                <NavbarLink
                    uuid={uuid}
                    href={`/dashboard/users/${uuid}/sessions`}>
                    Sessions
                </NavbarLink>
                <NavbarLink uuid={uuid} href={`/dashboard/users/${uuid}/posts`}>
                    Posts
                </NavbarLink>
                <NavbarLink
                    uuid={uuid}
                    href={`/dashboard/users/${uuid}/reports`}>
                    Reports
                </NavbarLink>
                <NavbarLink
                    uuid={uuid}
                    href={`/dashboard/users/${uuid}/reviews`}>
                    Reviews
                </NavbarLink>
                <NavbarLink
                    uuid={uuid}
                    href={`/dashboard/users/${uuid}/manage`}>
                    Manage
                </NavbarLink>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
