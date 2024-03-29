import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewInfoSkeleton() {
    return (
        <div className="w-full h-full p-8">
            <Skeleton className="h-2 mb-2 w-1/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-1/2 mt-2" />
            <div className="flex flex-col gap-1 py-4 w-full">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
            </div>
            <div className="flex flex-row flex-wrap gap-2">
                <Skeleton className="h-2 w-1/4" />
                <Skeleton className="h-2 w-1/4" />
            </div>
        </div>
    );
}
