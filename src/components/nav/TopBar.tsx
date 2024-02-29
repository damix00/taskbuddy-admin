export function TopBar({ children }: { children?: React.ReactNode }) {
    return (
        <header className="sticky top-0 w-full h-14 backdrop-blur-md border-b flex items-center p-4 z-40">
            <nav>{children}</nav>
        </header>
    );
}

export function TopBarTitle({ children }: { children: React.ReactNode }) {
    return <h1 className="text-lg font-bold">{children}</h1>;
}

export function PageContent({ children }: { children: React.ReactNode }) {
    return <main className="p-4">{children}</main>;
}
