import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

const JobOpportunities = () => {
    return (
        <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center gap-8 md:gap-12 lg:gap-16 px-4 md:px-8 lg:px-20 py-8 md:py-12 lg:py-20">
            <div className="flex flex-col items-center gap-3 md:gap-4">
                <h2 className="text-neutral-800 text-center text-[2rem] md:text-[2.5rem] lg:text-[3.5rem] leading-[2.5rem] md:leading-[3rem] lg:leading-[4rem] font-medium">
                    Top Audio Job Opportunities
                </h2>
                <p className="text-neutral-500 font-medium text-base lg:text-lg leading-6 max-w-3xl text-center px-4">
                    Unlock seamless music streaming with innovative features. Discover new sounds, connect with artists, and enjoy immersive audio like never before.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                {new Array(6).fill(0).map((_, index) => (
                    <div key={index} className="flex flex-col items-start gap-4 md:gap-6 p-4 border-b border-soft-200">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 w-full">
                            <div className="flex flex-col items-start gap-3 md:gap-4 w-full md:max-w-96">
                                <p className="text-strong-950 text-lg md:text-xl font-medium">Write professional resume, cover letter, and linkedin writing services</p>
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 flex items-center justify-center">
                                        <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">Mixing</span>
                                    </div>
                                    <div className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 flex items-center justify-center">
                                        <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">Singing</span>
                                    </div>
                                    <div className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 flex items-center justify-center">
                                        <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">Jazz</span>
                                    </div>
                                    <div className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 flex items-center justify-center">
                                        <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">Hip pop</span>
                                    </div>
                                    <div className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 flex items-center justify-center">
                                        <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">K pop</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row md:flex-col items-center md:items-end gap-2 w-full md:w-auto justify-between md:justify-start">
                                <span className="text-success-base font-medium text-xs md:text-sm">Fixed Price</span>
                                <span className="text-strong-950 font-medium text-lg md:text-xl">$1,200-$1,400</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge className="flex items-center gap-0.5 py-1.5 md:py-2 px-3 md:px-4 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                                <Icons.timeline className="size-3 md:size-3.5" /> 3 days ago
                            </Badge>
                            <Badge className="flex items-center gap-0.5 py-1.5 md:py-2 px-3 md:px-4 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                                <Icons.calendar_line className="size-3 md:size-3.5" />Deadline date
                            </Badge>
                            <Badge className="flex items-center gap-0.5 py-1.5 md:py-2 px-3 md:px-4 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                                <Icons.users className="size-3 md:size-3.5" /> 100+
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JobOpportunities;