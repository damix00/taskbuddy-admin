import LastLocation from "@/components/user_page/overview/LastLocation.server";

export default function Page({
    params,
}: {
    params: {
        uuid: string;
    };
}) {
    return <LastLocation uuid={params.uuid} />;
}
