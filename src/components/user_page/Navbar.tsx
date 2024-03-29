"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import PageNavbar from "../nav/PageNavbar";

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
        <PageNavbar>
            <NavbarLink uuid={uuid} href={`/dashboard/users/${uuid}`}>
                Overview
            </NavbarLink>
            <NavbarLink uuid={uuid} href={`/dashboard/users/${uuid}/sessions`}>
                Sessions
            </NavbarLink>
            <NavbarLink uuid={uuid} href={`/dashboard/users/${uuid}/posts`}>
                Posts
            </NavbarLink>
            <NavbarLink uuid={uuid} href={`/dashboard/users/${uuid}/reports`}>
                Reports
            </NavbarLink>
            <NavbarLink uuid={uuid} href={`/dashboard/users/${uuid}/reviews`}>
                Reviews
            </NavbarLink>
            <NavbarLink uuid={uuid} href={`/dashboard/users/${uuid}/manage`}>
                Manage
            </NavbarLink>
        </PageNavbar>
    );
}
