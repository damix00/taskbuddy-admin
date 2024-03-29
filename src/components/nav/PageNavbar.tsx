import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function PageNavbar({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ScrollArea>
            <div className="static lg:fixed bg-zinc-950/80 backdrop-blur-md lg:top-0 w-full h-14 border-b flex flex-row items-center justify-start px-4 gap-4 z-50">
                {children}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
