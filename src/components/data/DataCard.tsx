import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function DataCard({
    title,
    value,
    description,
    loading = false,
}: {
    title: string;
    value?: string | number;
    description: string;
    loading?: boolean;
}) {
    return (
        <Card className="w-fit h-fit">
            <CardHeader>
                <p>{title}</p>
                <CardTitle>
                    {loading ? (
                        <Skeleton className="w-12 h-6" />
                    ) : (
                        value?.toLocaleString()
                    )}
                </CardTitle>
                <CardDescription>
                    {loading ? <Skeleton className="w-28 h-4" /> : description}
                </CardDescription>
            </CardHeader>
        </Card>
    );
}
