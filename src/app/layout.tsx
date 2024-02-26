import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
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
        <html lang="en">
            <body className={`${montserrat.className} dark`}>
                <Providers>
                    <DashboardSidebar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
