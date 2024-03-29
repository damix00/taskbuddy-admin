"use client";

import { usePathname } from "next/navigation";
import PageNavbar from "../nav/PageNavbar";
import { Button } from "../ui/button";
import Link from "next/link";

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
        <Button variant={pathname == href ? "secondary" : "ghost"} asChild>
            <Link scroll={false} href={href}>
                {children}
            </Link>
        </Button>
    );
}

export default function PostNavbar({ uuid }: { uuid: string }) {
    return (
        <PageNavbar>
            <NavbarLink href={`/dashboard/posts/${uuid}`} uuid={uuid}>
                Overview
            </NavbarLink>
            <NavbarLink
                href={`/dashboard/posts/${uuid}/information`}
                uuid={uuid}>
                Information
            </NavbarLink>
            <NavbarLink href={`/dashboard/posts/${uuid}/reports`} uuid={uuid}>
                Reports
            </NavbarLink>
            <NavbarLink href={`/dashboard/posts/${uuid}/actions`} uuid={uuid}>
                Actions
            </NavbarLink>
        </PageNavbar>
    );
}
