import ReviewNavbar from "@/components/review_page/Navbar";
import { ReviewContextProvider } from "@/context/review_context";

export default function ReviewLayout({
    params,
    children,
    info,
}: {
    params: {
        uuid: string;
    };
    children: React.ReactNode;
    info: React.ReactNode;
}) {
    return (
        <ReviewContextProvider>
            <div className="flex flex-col lg:flex-row lg:max-h-screen">
                <div>{info}</div>
                <div className="flex flex-col w-full lg:max-h-screen">
                    <ReviewNavbar uuid={params.uuid} />
                    <div className="lg:pt-14 lg:overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </ReviewContextProvider>
    );
}
