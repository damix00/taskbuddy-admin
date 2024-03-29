import EditPostInfo from "@/components/post_page/information/EditPostInfo";
import EditPostLocation from "@/components/post_page/information/EditPostLocation";

export default function PostInformation() {
    return (
        <div className="p-4 flex flex-row flex-wrap gap-2">
            <EditPostInfo />
            <EditPostLocation />
        </div>
    );
}
