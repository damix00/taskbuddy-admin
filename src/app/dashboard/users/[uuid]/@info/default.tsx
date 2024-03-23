import ProfileInfoLayout from "./page";

export default function Default({
    params,
}: {
    params: {
        uuid: string;
    };
}) {
    return <ProfileInfoLayout params={params} />;
}
