import UserNavbar from "@/components/user_page/Navbar";
import { UserContextProvider } from "@/context/user_context";

export default async function Layout({
    children,
    info,
    params,
}: {
    children: React.ReactNode;
    info: React.ReactNode;
    params: {
        uuid: string;
    };
}) {
    const uuid = params.uuid;
    return (
        <UserContextProvider>
            <div className="flex flex-col lg:flex-row lg:max-h-screen">
                <div>{info}</div>
                <div className="flex flex-col w-full lg:max-h-screen">
                    {/* @ts-ignore */}
                    <UserNavbar uuid={uuid} />
                    <div className="lg:pt-14 lg:overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </UserContextProvider>
    );
}
