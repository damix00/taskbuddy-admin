import { Skeleton } from "../../ui/skeleton";

export default function ProfileInfoSkeleton() {
    return (
        <div className="flex flex-col items-center px-8 py-12 w-full">
            {/* Profile picture */}
            <Skeleton className="h-24 w-24 rounded-full" />
            {/* Full name */}
            <Skeleton className="h-4 w-32 mt-2" />
            {/* Username */}
            <Skeleton className="h-3 w-24 mt-2" />
            {/* Bio */}
            <div className="w-full mt-4 justify-start items-start">
                {/* Bio title */}
                <Skeleton className="h-4 w-12" />
                {/* Bio content */}
                <Skeleton className="h-3 w-full mt-2" />
                <Skeleton className="h-3 w-full mt-1" />
                <Skeleton className="h-3 w-24 mt-1" />
            </div>
        </div>
    );
}
