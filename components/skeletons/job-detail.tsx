import { Separator } from "../ui/separator";

export const HeadSkeleton = () => (
    <div className="w-full h-10 flex items-center justify-between pr-2.5 animate-pulse">
        <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-4"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
    </div>
);

export const DetailSkeleton = () => (
    <div className="w-full rounded-[20px] p-4 md:p-6 border border-[#E2E4E9] shadow-sm flex flex-col gap-4 md:gap-6 animate-pulse">
        <div className="flex flex-col md:flex-row md:items-center w-full md:justify-between gap-3 md:gap-0">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div className="h-7 bg-gray-200 rounded w-48 md:w-64"></div>
                <div className="h-7 w-32 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-6 w-6 bg-gray-200 rounded"></div>
        </div>
        <Separator className="bg-soft-200" />
        <div className="flex flex-col items-start gap-3">
            <div className="h-5 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="w-full space-y-2">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
        </div>
        <Separator className="bg-soft-200" />
        <div className="w-full flex flex-col items-start gap-3">
            <div className="h-5 bg-gray-200 rounded w-16"></div>
            <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-6 bg-gray-200 rounded w-16"></div>
                ))}
            </div>
        </div>
        <Separator className="bg-soft-200" />
        <div className="w-full flex flex-col items-start gap-3">
            <div className="h-5 bg-gray-200 rounded w-28"></div>
            <div className="border border-soft-200 w-full md:w-[248px] bg-[#FDFDFD] rounded-[12px] p-[14px] h-14 flex items-center justify-between gap-3">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-7 w-7 bg-gray-200 rounded"></div>
            </div>
        </div>
        <Separator className="bg-soft-200" />
        <div className="w-full">
            <div className="h-5 bg-gray-200 rounded w-12 mb-3"></div>
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                        <div className="h-5 bg-gray-200 rounded w-40"></div>
                        <div className="h-5 bg-gray-200 rounded w-5"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const InfoSkeleton = () => (
    <div className="border w-full border-soft-200 rounded-[20px] bg-white shadow-sm p-4 md:p-5 flex flex-col items-center gap-4 md:gap-5 animate-pulse">
        <div className="border-b border-soft-200 pb-4 md:pb-5 w-full relative flex flex-col items-center gap-2">
            <div className="absolute top-0 right-0">
                <div className="h-6 w-6 bg-gray-200 rounded"></div>
            </div>
            <div className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 md:w-18 md:h-18 bg-gray-200 rounded-full"></div>
                <div className="h-5 bg-gray-200 rounded w-32"></div>
                <div className="flex items-center gap-0.5">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
            </div>
            <div className="flex items-center gap-2.5 pt-1">
                <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-start gap-3 w-full">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5">
                        <div className="h-4 w-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
            ))}
        </div>
        <div className="flex items-center w-full gap-3">
            <div className="h-9 flex-1 bg-gray-200 rounded-lg"></div>
            <div className="h-9 flex-1 bg-gray-200 rounded-lg"></div>
        </div>
    </div>
);

export const ListSkeleton = () => (
    <div className="bg-white w-full rounded-[20px] p-3 md:p-4 flex flex-col items-start gap-3 md:gap-4 shadow-sm animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-12"></div>
        <Separator className="bg-soft-200 w-full" />
        {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex h-10 md:h-12 w-full items-center justify-between">
                <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex flex-col items-start">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="flex items-center gap-0.5">
                            <div className="h-3 w-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded w-12"></div>
                        </div>
                    </div>
                </div>
                <div className="h-5 w-5 md:h-6 md:w-6 bg-gray-200 rounded-full"></div>
            </div>
        ))}
    </div>
);

export const JobLinkSkeleton = () => (
    <div className="w-full flex flex-col items-start gap-2 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-16"></div>
        <div className="h-10 w-full border border-soft-200 flex items-center justify-between pr-3 rounded-[10px]">
            <div className="p-2.5 pl-3 flex items-center gap-2 overflow-hidden">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
        </div>
    </div>
);

export const SimilarProjectsSkeleton = () => (
    <div className="w-full flex flex-col items-start gap-3 md:gap-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-36"></div>
        <div className="w-full p-4 border-b border-soft-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex flex-col gap-2 w-full md:w-3/4">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-5 bg-gray-200 rounded w-16"></div>
                        ))}
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-full mt-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mt-1"></div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-6 bg-gray-200 rounded-full w-20"></div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-row md:flex-col justify-between md:items-end gap-2 mt-3 md:mt-0">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
            </div>
        </div>
    </div>
);