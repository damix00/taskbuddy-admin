import FlagPost from "@/components/post_page/actions/FlagPost";
import RemovePost from "@/components/post_page/actions/RemovePost";
import ShadowBanPost from "@/components/post_page/actions/ShadowBanPost";

export default function PostActionsPage() {
    return (
        <div className="p-4 flex flex-row gap-2 flex-wrap">
            <ShadowBanPost />
            <FlagPost />
            <RemovePost />
        </div>
    );
}
