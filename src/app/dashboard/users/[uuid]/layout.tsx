import UserNavbar from "@/components/user_page/Navbar";

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
        <div className="flex flex-col md:flex-row md:max-h-screen">
            <div>{info}</div>
            <div className="flex flex-col w-full md:max-h-screen">
                {/* @ts-ignore */}
                <UserNavbar uuid={uuid} />
                <div className="md:pt-14 md:overflow-y-auto">{children}</div>
            </div>
        </div>
    );
}
