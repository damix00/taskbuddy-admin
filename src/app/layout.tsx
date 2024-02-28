import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { auth } from "@/lib/auth/auth";
import { SessionProvider } from "next-auth/react";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TaskBuddy",
    description: "TaskBuddy admin dashboard",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body className={`${montserrat.className} dark`}>
                    <Providers>{children}</Providers>
                </body>
            </html>
        </SessionProvider>
    );
}
