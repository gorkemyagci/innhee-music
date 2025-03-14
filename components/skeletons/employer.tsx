import { Skeleton } from "../ui/skeleton";

// Skeleton component for the BuyerPage
const BuyerPageSkeleton = () => {
    return (
        <div className="flex flex-col md:flex-row items-start gap-8">
            {/* SidebarLayout skeleton */}
            <div className="md:hidden">
                <div className="z-40 bg-white w-full px-4 py-3 flex items-center justify-between">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="w-10 h-10 rounded-full" />
                </div>
            </div>

            {/* Sidebar skeleton */}
            <div className="md:block hidden">
                <div className="w-[352px] shrink-0 shadow-sm bg-white border border-soft-200 rounded-[20px] pb-6">
                    <div className="p-4 relative flex flex-col items-center gap-5">
                        <div className="flex flex-col items-center gap-2">
                            <Skeleton className="w-20 h-20 rounded-full" />
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-20" />
                            <div className="flex items-center gap-2.5 pt-1">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <Skeleton className="w-[85px] h-8 rounded-lg" />
                            <Skeleton className="w-[83px] h-8 rounded-lg" />
                        </div>
                        <div className="flex items-center w-full justify-between">
                            <Skeleton className="h-4 w-28" />
                            <div className="flex items-center">
                                <Skeleton className="w-8 h-8 rounded-full" />
                                <Skeleton className="w-8 h-8 rounded-full -ml-2" />
                                <Skeleton className="w-8 h-8 rounded-full -ml-2" />
                                <Skeleton className="w-6 h-4 ml-1" />
                            </div>
                        </div>
                    </div>
                    <div className="h-[1px] bg-soft-200 w-full" />
                    <div className="p-4">
                        <Skeleton className="h-5 w-1/3 mb-3" />
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Skeleton key={i} className="h-6 w-16" />
                            ))}
                        </div>
                    </div>
                    <div className="h-[1px] bg-soft-200 w-full" />
                    <div className="p-4">
                        <Skeleton className="h-5 w-1/3 mb-3" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                </div>
            </div>

            {/* Main content skeleton */}
            <div className="w-full">
                <div className="flex flex-col w-full items-start gap-4 md:gap-6 overflow-hidden">
                    <div className="w-full flex items-start md:items-center justify-between overflow-visible">
                        {/* Tabs skeleton */}
                        <div className="flex w-full">
                            <div className="grid grid-cols-2 gap-2 md:gap-4 w-full">
                                <Skeleton className="h-10 rounded-lg" />
                                <Skeleton className="h-10 rounded-lg" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full overflow-x-hidden">
                        {/* Content skeleton */}
                        <div className="space-y-4 w-full">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="border border-soft-200 rounded-[20px] p-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="w-12 h-12 rounded-full" />
                                            <div>
                                                <Skeleton className="h-5 w-32 mb-2" />
                                                <Skeleton className="h-4 w-24" />
                                            </div>
                                        </div>
                                        <Skeleton className="h-8 w-24 rounded-lg" />
                                    </div>
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyerPageSkeleton;