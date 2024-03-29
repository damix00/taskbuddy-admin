import { Skeleton } from "@/components/ui/skeleton";

export default function PostInfoSkeleton() {
    return (
        <div className="w-full p-8">
            <Skeleton className="h-6 w-1/2" />
            <div className="flex flex-col gap-1 py-2 w-full">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/4" />
            </div>
            <div className="py-4">
                <Skeleton className="h-44 w-full" />
            </div>
        </div>
    );
}
