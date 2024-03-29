import PostNavbar from "@/components/post_page/Navbar";
import { PostContextProvider } from "@/context/post_context";

export default function PostLayout({
    children,
    info,
    params,
}: {
    children: React.ReactNode;
    info: React.ReactNode;
    params: { uuid: string };
}) {
    return (
        <PostContextProvider>
            <div className="flex flex-col lg:flex-row lg:max-h-screen">
                <div>{info}</div>
                <div className="flex flex-col w-full lg:max-h-screen">
                    <PostNavbar uuid={params.uuid} />
                    <div className="lg:pt-14 lg:overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </PostContextProvider>
    );
}
