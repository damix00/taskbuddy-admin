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

export default function ReviewNavbar({ uuid }: { uuid: string }) {
    return (
        <PageNavbar>
            <NavbarLink href={`/dashboard/reviews/${uuid}`} uuid={uuid}>
                Manage
            </NavbarLink>
            <NavbarLink href={`/dashboard/reviews/${uuid}/reports`} uuid={uuid}>
                Reports
            </NavbarLink>
        </PageNavbar>
    );
}
