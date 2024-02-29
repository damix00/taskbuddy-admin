import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import DashboardSidebar from "@/components/nav/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row full-dvh h-screen">
            <DashboardSidebar />
            {children}
        </div>
    );
}
