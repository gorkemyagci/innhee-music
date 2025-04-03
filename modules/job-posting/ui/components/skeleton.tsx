"use client"
import { Skeleton } from "@/components/ui/skeleton";

const JobPostingSkeleton = () => {
    return (
        <div className="flex-1 mx-auto flex flex-col gap-5 justify-center items-center">
            <div className="flex flex-col items-center gap-1.5">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-6 w-72" />
            </div>
            <div className="flex flex-col gap-8 pb-20 md:pb-0 w-full max-w-[440px]">
                <div className="border border-soft-200 rounded-[20px] p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-5 w-32" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
                <div className="border border-soft-200 rounded-[20px] p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-5 w-32" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-6 w-24" />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border border-soft-200 rounded-[20px] p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-5 w-32" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                </div>
                <div className="border border-soft-200 rounded-[20px] p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-5 w-32" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-40 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobPostingSkeleton;
