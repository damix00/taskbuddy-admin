"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

function NavbarLink({
    children,
    href,
}: {
    children: React.ReactNode;
    href: string;
}) {
    const pathname = usePathname();

    return (
        <Button variant={pathname === href ? "secondary" : "ghost"} asChild>
            <Link href={href}>{children}</Link>
        </Button>
    );
}

export default function UserNavbar({ uuid }: { uuid: string }) {
    return (
        <ScrollArea>
            <div className="static lg:fixed bg-zinc-950/80 backdrop-blur-md lg:top-0 w-full h-14 border-b flex flex-row items-center justify-start px-4 gap-4 z-50">
                <NavbarLink href={`/dashboard/users/${uuid}`}>
                    Overview
                </NavbarLink>
                <NavbarLink href={`/dashboard/users/${uuid}/posts`}>
                    Posts
                </NavbarLink>
                <NavbarLink href={`/dashboard/users/${uuid}/chats`}>
                    Chats
                </NavbarLink>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
