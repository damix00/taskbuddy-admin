import { PageContent, TopBar, TopBarTitle } from "@/components/nav/TopBar";
import ManageReport from "@/components/report_page/ManageReport";

export default function ReportPage() {
    return (
        <div className="w-full">
            <TopBar>
                <TopBarTitle>Manage report</TopBarTitle>
            </TopBar>
            <PageContent>
                <div className="w-full flex justify-center">
                    <ManageReport />
                </div>
            </PageContent>
        </div>
    );
}
