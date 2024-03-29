import PostInfoLayout from "./page";

export default function Default({ uuid }: { uuid: string }) {
    return <PostInfoLayout params={{ uuid }} />;
}
