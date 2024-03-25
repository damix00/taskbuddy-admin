import SessionDataCard from "@/components/session_page/SessionDataCard";
import SessionLocationCard from "@/components/session_page/SessionLocationCard";

export default function SessionDetailsPage() {
    return (
        <div className="flex flex-row flex-wrap gap-2">
            <SessionLocationCard />
            <SessionDataCard />
        </div>
    );
}
