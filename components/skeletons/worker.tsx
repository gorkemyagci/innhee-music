import { Skeleton } from "../ui/skeleton";

export const WorkerSkeleton = () => {
    return (
        <div className="w-full">
            <div className="flex items-center w-full justify-between mb-4">
                <Skeleton className="h-6 w-24" />
                <div className="hidden md:flex items-center gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-4 w-16" />
                    ))}
                </div>
                <Skeleton className="h-4 w-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="border border-soft-200 rounded-[12px] p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div>
                                <Skeleton className="h-4 w-24 mb-2" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-4" />
                        <div className="flex justify-between">
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-8 w-20" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
