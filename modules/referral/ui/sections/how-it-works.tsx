import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

const HowItWorks = () => {
    return (
        <div className="w-full relative bg-strong-950 rounded-2xl shadow-sm min-h-[14rem] p-6 md:p-8 lg:px-12 lg:py-10">
            <GridPattern
                width={60}
                height={60}
                x={-1}
                y={-1}
                className={cn(
                    "[mask-image:radial-gradient(100%_500px_at_top,white,transparent)] opacity-50",
                )}
            />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <div className="flex flex-col items-start gap-2 md:gap-2.5">
                    <h6 className="font-medium text-xl md:text-2xl text-white">How it works?</h6>
                    <p className="text-disabled-300 font-normal text-sm md:text-base">How to become a business person.</p>
                </div>
                <div className="flex flex-col items-start gap-2 md:gap-2.5">
                    <h6 className="font-medium text-xl md:text-2xl text-white">Engage people</h6>
                    <p className="text-disabled-300 font-normal text-sm md:text-base">Share your referral link with people that are interested in buying games.</p>
                </div>
                <div className="flex flex-col items-start gap-2 md:gap-2.5">
                    <h6 className="font-medium text-xl md:text-2xl text-white">Watch your earnings grow</h6>
                    <p className="text-disabled-300 font-normal text-sm md:text-base">Monitor your earnings on your affiliate panel. Receive commission for referred orders.</p>
                </div>
                <div className="flex flex-col items-start gap-2 md:gap-2.5">
                    <h6 className="font-medium text-xl md:text-2xl text-white">Receive your money</h6>
                    <p className="text-disabled-300 font-normal text-sm md:text-base">As a reward for your commitment you will receive real money!</p>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks;