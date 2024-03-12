import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({
    children,
    info,
}: {
    children: React.ReactNode;
    info: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row">
            {info}
            <ScrollArea>{children}</ScrollArea>
        </div>
    );
}
