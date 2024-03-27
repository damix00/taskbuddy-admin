import { PageContent, TopBar, TopBarTitle } from "@/components/nav/TopBar";
import PostSearch from "@/components/posts/PostSearch";
import PostsData from "@/components/posts/PostsData";

export default function PostsPage({
    searchParams,
}: {
    searchParams: Record<string, string | undefined>;
}) {
    return (
        <div className="w-full">
            <TopBar>
                <TopBarTitle>Posts</TopBarTitle>
            </TopBar>
            <PageContent>
                <div className="flex flex-col gap-2">
                    <PostSearch />
                    <PostsData searchParams={searchParams} />
                </div>
            </PageContent>
        </div>
    );
}
