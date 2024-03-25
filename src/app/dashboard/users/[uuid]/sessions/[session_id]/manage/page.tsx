import DeleteSession from "@/components/session_page/DeleteSession";

export default function ManageSessionPage({
    params,
}: {
    params: {
        uuid: string;
        session_id: string;
    };
}) {
    return <DeleteSession uuid={params.uuid} />;
}
