import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

const JobOpportunities = () => {
    return (
        <div className="w-full max-w-8xl flex flex-col items-center gap-16 p-20 mx-auto">
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-neutral-800 text-center text-[3.5rem] leading-[4rem] font-medium">
                    Top Audio Job Opportunities
                </h2>
                <p className="text-neutral-500 font-medium text-lg leading-6 max-w-3xl text-center">
                    Unlock seamless music streaming with innovative features. Discover new sounds, connect with artists, and enjoy immersive audio like never before.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-6 w-full">
                {new Array(6).fill(0).map((_, index) => (
                    <div key={index} className="flex flex-col items-start gap-6 p-4 border-b border-soft-200">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col items-start gap-4 max-w-96">
                                <p className="text-strong-950 text-xl font-medium">Write professional resume, cover letter, and linkedin writing services</p>
                                <div className="flex items-center gap-2">
                                    <div className="bg-white border border-soft-200 rounded-md py-1 px-2 min-w-14 h-6 flex items-center justify-center">
                                        <span className="text-sub-600 font-medium text-xs">Mixing</span>
                                    </div>
                                    <div className="bg-white border border-soft-200 rounded-md py-1 px-2 min-w-14 h-6 flex items-center justify-center">
                                        <span className="text-sub-600 font-medium text-xs">Singing</span>
                                    </div>
                                    <div className="bg-white border border-soft-200 rounded-md py-1 px-2 min-w-14 h-6 flex items-center justify-center">
                                        <span className="text-sub-600 font-medium text-xs">Jazz</span>
                                    </div>
                                    <div className="bg-white border border-soft-200 rounded-md py-1 px-2 min-w-14 h-6 flex items-center justify-center">
                                        <span className="text-sub-600 font-medium text-xs">Hip pop</span>
                                    </div>
                                    <div className="bg-white border border-soft-200 rounded-md py-1 px-2 min-w-14 h-6 flex items-center justify-center">
                                        <span className="text-sub-600 font-medium text-xs">K pop</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-success-base font-medium text-sm">Fixed Price</span>
                                <span className="text-strong-950 font-medium text-xl">$1,200-$1,400</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge className="flex items-center gap-0.5 py-2 px-4 rounded-full bg-neutral-100 min-w-28 border border-neutral-200 text-sub-600 font-medium text-[11px]"><Icons.timeline /> 3 days ago</Badge>
                            <Badge className="flex items-center gap-0.5 py-2 px-4 rounded-full bg-neutral-100 min-w-28 border border-neutral-200 text-sub-600 font-medium text-[11px]"><Icons.calendar_line />Deadline date</Badge>
                            <Badge className="flex items-center gap-0.5 py-2 px-4 rounded-full bg-neutral-100 min-w-28 border border-neutral-200 text-sub-600 font-medium text-[11px]"><Icons.users /> 100+</Badge>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JobOpportunities;