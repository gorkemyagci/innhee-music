import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Discover = () => {
    return (
        <div className="py-10 max-w-[1440px] mx-auto md:py-12 lg:py-16 px-4 md:px-8 lg:px-20 flex flex-col gap-8 md:gap-10 lg:gap-14 items-center">
            <div className="flex flex-col items-center gap-4 md:gap-5 lg:gap-6">
                <Button variant="outline" className="bg-white flex gap-2.5 items-center pr-6 py-[0.325rem] rounded-full h-10 max-w-[207px] w-full pl-[0.325rem] border border-[#DA6733]">
                    <div className="bg-[#DA6733] w-16 h-[1.875rem] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                            News!
                        </span>
                    </div>
                    <span className="text-[#1A1C1E] font-normal text-sm">Unlcok the Best</span>
                </Button>
                <h2 className="text-neutral-800 text-center text-[2rem] md:text-[2.5rem] lg:text-[3.5rem] leading-[2.5rem] md:leading-[3rem] lg:leading-[4rem] font-medium">
                    Discover the Essentials
                </h2>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-5 lg:gap-0">
                <div className={cn(
                    "bg-white p-4 gap-4 md:p-5 lg:p-6 flex flex-col items-start h-full justify-between",
                    "rounded-t-2xl md:rounded-2xl lg:rounded-l-2xl",
                    "[&:not(:first-child)]:border-t md:border-none",
                    "lg:[&:not(:first-child)]:border-l lg:border-t-0",
                    "border-[#E5E5E5]"
                )}>
                    <div className="flex flex-col items-start gap-3 md:gap-4">
                        <h6 className="text-[#DA6733] font-medium text-xl md:text-2xl">Post Your Audio Project</h6>
                        <span className="text-[#637381] text-sm md:text-base font-normal">Post a clear brief for voiceovers, mixing, podcast editing, or sound production.</span>
                    </div>
                    <Button className="flex items-center gap-2 rounded-full h-9 md:h-10 lg:h-11 py-2 pl-3 pr-2 w-32 md:w-36">
                        Learn More
                        <span className="w-6 md:w-7 h-6 md:h-7 bg-white rounded-full flex items-center justify-center">
                            <Icons.arrow_right stroke="black" className="size-3" />
                        </span>
                    </Button>
                </div>
                <div className={cn(
                    "bg-[#DA6733] p-4 gap-4 md:p-5 lg:p-6 flex flex-col items-start h-full justify-between",
                    "lg:rounded-none",
                    "md:rounded-2xl",
                    "[&:not(:first-child)]:border-t md:border-none",
                    "lg:[&:not(:first-child)]:border-l lg:border-t-0",
                    "border-[#E5E5E5]"
                )}>
                    <div className="flex flex-col items-start gap-3 md:gap-4">
                        <h6 className="text-white font-medium text-xl md:text-2xl">Top Audio Professionals</h6>
                        <span className="text-white text-sm md:text-base font-normal">Access vetted audio editors, voice actors, sound engineers, and musicians.</span>
                    </div>
                    <Button className="flex items-center bg-white hover:bg-white text-[#0F0F0F] gap-2 rounded-full h-9 md:h-10 lg:h-11 py-2 pl-3 pr-2 w-32 md:w-36">
                        Learn More
                        <span className="w-6 md:w-7 h-6 md:h-7 bg-black rounded-full flex items-center justify-center">
                            <Icons.arrow_right className="size-3" />
                        </span>
                    </Button>
                </div>
                <div className={cn(
                    "bg-white p-4 gap-4 md:p-5 lg:p-6 flex flex-col items-start h-full justify-between",
                    "lg:rounded-none",
                    "md:rounded-2xl",
                    "[&:not(:first-child)]:border-t md:border-none",
                    "lg:[&:not(:first-child)]:border-l lg:border-t-0",
                    "border-[#E5E5E5]"
                )}>
                    <div className="flex flex-col items-start gap-3 md:gap-4">
                        <h6 className="text-[#DA6733] font-medium text-xl md:text-2xl">Intelligent Matching System</h6>
                        <span className="text-[#637381] text-sm md:text-base font-normal">AI-driven skill-based matching connects you with top talent instantly.</span>
                    </div>
                    <Button className="flex items-center gap-2 rounded-full h-9 md:h-10 lg:h-11 py-2 pl-3 pr-2 w-32 md:w-36">
                        Learn More
                        <span className="w-6 md:w-7 h-6 md:h-7 bg-white rounded-full flex items-center justify-center">
                            <Icons.arrow_right stroke="black" className="size-3" />
                        </span>
                    </Button>
                </div>
                <div className={cn(
                    "bg-white p-4 gap-4 md:p-5 lg:p-6 flex flex-col items-start h-full justify-between",
                    "lg:rounded-r-4xl lg:rounded-l-none",
                    "md:rounded-2xl",
                    "[&:last-child]:rounded-b-2xl lg:[&:last-child]:rounded-b-none",
                    "[&:not(:first-child)]:border-t md:border-none",
                    "lg:[&:not(:first-child)]:border-l lg:border-t-0",
                    "border-[#E5E5E5]"
                )}>
                    <div className="flex flex-col items-start gap-3 md:gap-4">
                        <h6 className="text-[#DA6733] font-medium text-xl md:text-2xl">Streamlined Payments</h6>
                        <span className="text-[#637381] text-sm md:text-base font-normal">Secure payments after project completion through integrated solutions.</span>
                    </div>
                    <Button className="flex items-center gap-2 rounded-full h-9 md:h-10 lg:h-11 py-2 pl-3 pr-2 w-32 md:w-36">
                        Learn More
                        <span className="w-6 md:w-7 h-6 md:h-7 bg-white rounded-full flex items-center justify-center">
                            <Icons.arrow_right stroke="black" className="size-3" />
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Discover;