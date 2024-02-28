import { auth } from "@/lib/auth/auth";

export default async function Dashboard() {
    const session = await auth();

    return (
        <main>
            <div>This is the dashboard.</div>
        </main>
    );
}
