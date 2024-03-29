import CardSkeleton from "@/components/display/CardSkeleton";
import ReportServer from "@/components/report_page/Report.server";
import { ReportContextProvider } from "@/context/report_context";
import { Suspense } from "react";

export default function ReportLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    return (
        <ReportContextProvider>
            <Suspense
                fallback={
                    <div className="p-4">
                        <CardSkeleton />
                    </div>
                }>
                <ReportServer id={parseInt(params.id)} />
                {children}
            </Suspense>
        </ReportContextProvider>
    );
}
