"use client";

import { Report } from "@/components/user_page/reports/types";
import { createContext, useContext, useEffect, useState } from "react";

export type ReportContextType = {
    report?: Report | null;
    setData: (data: Report) => any;
};

export const ReportContext = createContext<ReportContextType | null>(null);

export function ReportContextCreator({ report }: { report: Report }) {
    const context = useContext(ReportContext);

    if (!context) {
        return <></>;
    }

    useEffect(() => {
        context.setData(report);
    }, [report]);

    return <></>;
}

export function ReportContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [reportData, setReportData] = useState<Report | null>(null);

    return (
        <ReportContext.Provider
            value={{
                report: reportData,
                setData: setReportData,
            }}>
            {children}
        </ReportContext.Provider>
    );
}
