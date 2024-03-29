import ReviewInfoLayout from "./page";

export default function DefaultLayout({
    params,
}: {
    params: {
        uuid: string;
    };
}) {
    return <ReviewInfoLayout params={params} />;
}
