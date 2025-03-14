import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export const SidebarSkeleton = () => {
    return (
        <div className="border border-soft-200 pb-6 w-[300px] shrink-0 min-h-[calc(100vh-114px)] rounded-[20px] bg-white">
            <div className="p-4">
                <Skeleton className="h-16 w-16 rounded-full mb-3" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </div>
            <Separator className="bg-soft-200" />
            <div className="p-4">
                <Skeleton className="h-5 w-1/3 mb-3" />
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-8 w-full mb-2" />
                ))}
            </div>
            <Separator className="bg-soft-200" />
            <div className="p-4">
                <Skeleton className="h-5 w-1/3 mb-3" />
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-6 w-full mb-2" />
                ))}
            </div>
            <Separator className="bg-soft-200" />
            <div className="p-4">
                <Skeleton className="h-5 w-1/3 mb-3" />
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-6 w-16" />
                    ))}
                </div>
            </div>
            <Separator className="bg-soft-200" />
            <div className="p-4">
                <Skeleton className="h-5 w-1/3 mb-3" />
                <Skeleton className="h-20 w-full" />
            </div>
        </div>
    );
};

export const MobileSidebarSkeleton = () => {
    return (
        <div className="w-full">
            <div className="p-4">
                <Skeleton className="h-16 w-16 rounded-full mb-3" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </div>
            <Separator className="bg-soft-200" />
            <div className="p-4">
                <Skeleton className="h-5 w-1/3 mb-3" />
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-8 w-full mb-2" />
                ))}
            </div>
            <Separator className="bg-soft-200" />
            <div className="p-4">
                <Skeleton className="h-5 w-1/3 mb-3" />
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-6 w-full mb-2" />
                ))}
            </div>
            <Separator className="bg-soft-200" />
            <div className="p-4">
                <Skeleton className="h-5 w-1/3 mb-3" />
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-6 w-16" />
                    ))}
                </div>
            </div>
            <Separator className="bg-soft-200" />
            <div className="p-4">
                <Skeleton className="h-5 w-1/3 mb-3" />
                <Skeleton className="h-20 w-full" />
            </div>
        </div>
    );
};