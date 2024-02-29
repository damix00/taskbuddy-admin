import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import DashboardSidebar from "@/components/nav/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row w-full">
            <div className="full-dvh h-screen">
                <DashboardSidebar />
            </div>
            <div className="ml-14 md:ml-60 w-full">{children}</div>
        </div>
    );
}
