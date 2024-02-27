import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import DashboardSidebar from "@/components/nav/Sidebar";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TaskBuddy",
    description: "TaskBuddy admin dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row">
            <DashboardSidebar />
            {children}
        </div>
    );
}
