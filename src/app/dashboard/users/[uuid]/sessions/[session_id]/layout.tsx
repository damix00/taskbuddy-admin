import CardSkeleton from "@/components/display/CardSkeleton";
import ContentLayout from "@/components/display/content/ContentLayout";
import ContentSubNav, {
    NavItem,
} from "@/components/display/content/ContentSubNav";
import SessionData from "@/components/session_page/SessionData_server";
import { SessionContextProvider } from "@/context/session_context";
import { Eye, Pen } from "lucide-react";
import { Suspense } from "react";

export default function SessionLayout({
    params,
    children,
}: {
    params: {
        uuid: string;
        session_id: string;
    };
    children: React.ReactNode;
}) {
    const items: NavItem[] = [
        {
            href: `/dashboard/users/${params.uuid}/sessions/${params.session_id}/details`,
            label: "Details",
            icon: <Eye className="w-4 h-4" />,
            scroll: false,
        },
        {
            href: `/dashboard/users/${params.uuid}/sessions/${params.session_id}/manage`,
            label: "Manage",
            icon: <Pen className="w-4 h-4" />,
            scroll: false,
        },
    ];

    return (
        <SessionContextProvider>
            <ContentLayout
                title="Manage session"
                description="See session details, manage and control session.">
                <ContentSubNav items={items} />
                <Suspense fallback={<CardSkeleton count={3} />}>
                    <SessionData
                        uuid={params.uuid}
                        session_id={parseInt(params.session_id)}
                    />
                    {children}
                </Suspense>
            </ContentLayout>
        </SessionContextProvider>
    );
}
