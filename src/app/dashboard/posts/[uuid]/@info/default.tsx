import PostInfoLayout from "./page";

export default function Default({
    params,
}: {
    params: {
        uuid: string;
    };
}) {
    return <PostInfoLayout params={params} />;
}
