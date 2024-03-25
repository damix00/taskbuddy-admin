export default function ContentLayout({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <div className="p-4 lg:p-8 flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
                <h1 className="text-2xl font-bold">{title}</h1>
                <div className="text-muted-foreground">{description}</div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">{children}</div>
        </div>
    );
}
