import { SidebarItem } from "@/components/nav/Sidebar";

export interface NavItem {
    href: string;
    label: string;
    icon: React.ReactNode;
    scroll?: boolean;
}

export default function ContentSubNav({ items }: { items: NavItem[] }) {
    return (
        <div className="flex flex-row overflow-x-auto lg:overflow-x-hidden lg:flex-col gap-2 border-b pb-2 lg:border-b-0 px-2 w-full lg:w-fit lg:min-w-[200px]">
            {items.map((item) => (
                <SidebarItem
                    key={item.href}
                    label={item.label}
                    icon={item.icon}
                    href={item.href}
                    scroll={item.scroll ?? false}
                />
            ))}
        </div>
    );
}
