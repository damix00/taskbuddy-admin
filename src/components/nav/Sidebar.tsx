import { Button } from "../ui/button";

export default function DashboardSidebar() {
    return (
        <aside className="hidden md:block fixed min-h-screen inset-y-0 left-0 w-64 bg-zinc-100 dark:bg-zinc-950 border-r overflow-y-auto transition duration-300 z-30 flex-shrink-0">
            <h1>TaskBuddy</h1>
        </aside>
    );
}
