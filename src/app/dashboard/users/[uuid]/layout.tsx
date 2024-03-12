import { ScrollArea } from "@/components/ui/scroll-area";
import UserNavbar from "@/components/user_page/Navbar";
import { auth } from "@/lib/auth/auth";

export default async function Layout({
    children,
    info,
}: {
    children: React.ReactNode;
    info: React.ReactNode;
}) {
    const user = await auth();

    return (
        <div className="flex flex-col md:flex-row">
            <div>{info}</div>
            <div className="flex flex-col w-full">
                {/* @ts-ignore */}
                <UserNavbar uuid={user?.user!.uuid} />
                <ScrollArea>{children}</ScrollArea>
            </div>
        </div>
    );
}
