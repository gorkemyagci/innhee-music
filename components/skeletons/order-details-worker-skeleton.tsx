import { Skeleton } from "@/components/ui/skeleton"

const OrderDetailsWorkerSkeleton = () => {
    return (
        <div className="flex flex-col gap-5 items-start w-full px-5 lg:px-0">
            <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-start md:items-center p-4 border border-soft-200 rounded-2xl">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    <Skeleton className="h-9 w-full md:w-28" />
                    <Skeleton className="h-9 w-full md:w-28" />
                </div>
            </div>
            <div className="w-full border border-soft-200 rounded-2xl">
                <div className="p-4 border-b border-soft-200">
                    <Skeleton className="h-5 w-24" />
                </div>
                <div className="p-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex flex-col gap-2 flex-1">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                        <Skeleton className="h-12 w-full" />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-5">
                <div className="w-full lg:w-1/2">
                    <div className="border border-soft-200 rounded-2xl">
                        <div className="p-4 border-b border-soft-200">
                            <Skeleton className="h-5 w-24" />
                        </div>
                        <div className="p-4 flex flex-col gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-3">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <div className="flex flex-col gap-2 flex-1">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex flex-col gap-5">
                        <div className="border border-soft-200 rounded-2xl">
                            <div className="p-4 border-b border-soft-200">
                                <Skeleton className="h-5 w-24" />
                            </div>
                            <div className="p-4 flex flex-col gap-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="flex-1">
                                            <div className="flex flex-col gap-2">
                                                <Skeleton className="h-4 w-32" />
                                                <Skeleton className="h-3 w-full" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="border border-soft-200 rounded-2xl">
                            <div className="p-4 border-b border-soft-200">
                                <Skeleton className="h-5 w-24" />
                            </div>
                            <div className="p-4">
                                <div className="border border-dashed border-soft-200 rounded-xl p-8 flex flex-col items-center gap-4">
                                    <Skeleton className="h-6 w-6" />
                                    <div className="flex flex-col items-center gap-2">
                                        <Skeleton className="h-4 w-48" />
                                        <Skeleton className="h-3 w-64" />
                                    </div>
                                    <Skeleton className="h-8 w-28" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsWorkerSkeleton 