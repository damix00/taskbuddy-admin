import ProfileInfo from "./page";

export default function Default({
    params,
}: {
    params: {
        uuid: string;
    };
}) {
    return <ProfileInfo params={params} />;
}
