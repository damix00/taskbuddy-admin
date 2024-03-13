export default function ProfileSection({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex justify-between items-center w-full text-sm">
            <div className="text-muted-foreground">{label}</div>
            <div>{children}</div>
        </div>
    );
}
