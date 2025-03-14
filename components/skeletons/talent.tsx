import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

// Sidebar skeleton component
export const SidebarSkeleton = () => {
    return (
        <div className="border border-soft-200 pb-6 w-[300px] shrink-0 min-h-[calc(100vh-114px)] rounded-[20px] bg-white">
            <div className="p-4 flex flex-col items-center">
                <Skeleton className="h-20 w-20 rounded-full mb-3" />
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24 mb-4" />
                <div className="flex gap-2 mt-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </div>
            
            <Separator className="bg-soft-200" />
            
            <div className="p-4">
                <Skeleton className="h-5 w-24 mb-4" />
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-10 w-full mb-3" />
                ))}
            </div>
            
            <Separator className="bg-soft-200" />
            
            <div className="p-4">
                <Skeleton className="h-5 w-24 mb-4" />
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-7 w-16 rounded-md" />
                    ))}
                </div>
            </div>
            
            <Separator className="bg-soft-200" />
            
            <div className="p-4">
                <Skeleton className="h-5 w-24 mb-4" />
                <Skeleton className="h-20 w-full" />
            </div>
        </div>
    );
};

// Sidebar layout skeleton that mimics the SidebarLayout component
export const SidebarLayoutSkeleton = () => {
    return (
        <>
            {/* Mobile header skeleton */}
            <div className="w-full md:hidden flex items-center justify-between pb-4">
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>

            {/* Desktop sidebar skeleton */}
            <div className="hidden md:block sticky top-5">
                <SidebarSkeleton />
            </div>
        </>
    );
};

// Skeleton loader component for the talent page
export const TalentPageSkeleton = () => {
    return (
        <div className="flex flex-col w-full items-start gap-4 md:gap-6">
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-10 w-20" />
                </div>
                <Skeleton className="h-9 w-[90px]" />
            </div>

            <div className="w-full mt-4">
                <div className="flex items-center gap-4 mb-6">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>

                <div className="space-y-4 w-full">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full">
                            <Skeleton className="h-24 w-full rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};