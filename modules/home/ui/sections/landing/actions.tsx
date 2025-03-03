import { GridPatternDashed } from "@/components/grid-pattern-dashed";
import { Icons } from "@/components/icons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Actions = () => {
    return (
        <div className="w-full max-w-8xl flex flex-col items-center gap-16 p-20 mx-auto">
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-neutral-800 text-center text-[3.5rem] leading-[4rem] font-medium">
                    Your Dream Career Starts Here
                </h2>
                <p className="text-neutral-500 font-medium text-lg leading-6 max-w-3xl text-center">
                    Unlock seamless music streaming with innovative features. Discover new sounds, connect with artists, and enjoy immersive audio like never before.
                </p>
            </div>
            <div className="flex items-center gap-6 w-full">
                <div className="flex-1 relative bg-[#1B1B1B] p-8 rounded-2xl flex flex-col items-start border-2 gap-8 border-[#E5E5E5]">
                    <GridPattern
                        width={60}
                        height={60}
                        x={-1}
                        y={-1}
                        strokeDasharray={"4 2"}
                        className={cn(
                            "[mask-image:radial-gradient(100%_500px_at_top,white,transparent)]",
                        )}
                    />
                    <Icons.big_cursor className="absolute bottom-6 left-1/2" />
                    <div className="flex flex-col items-start gap-3">
                        <Button variant="outline" className="bg-gradient-to-r from-white/40 to-white/10 px-6 py-2 z-10 text-white font-semibold rounded-full border border-white/20">Buyers</Button>
                        <p className="text-white font-semibold text-3xl">Find Top Audio Talent</p>
                        <span className="text-white text-lg font-medium">Post jobs, set budgets, and find the right audio professionals fast.</span>
                    </div>
                    <Button className="flex rounded-md min-w-32 h-11 z-10 text-main-900 font-semibold text-sm items-center gap-2 bg-white hover:bg-white">
                        Post a Job
                        <Icons.arrow_right stroke="black" />
                    </Button>
                </div>
                <div className="flex-1 relative bg-white p-8 rounded-2xl flex flex-col items-start border-2 gap-8 border-[#E5E5E5]">
                    <GridPattern
                        width={60}
                        height={60}
                        x={-1}
                        y={-1}
                        strokeDasharray={"4 2"}
                        className={cn(
                            "[mask-image:radial-gradient(100%_500px_at_top,white,transparent)]",
                        )}
                    />
                    <div className="flex flex-col items-start gap-3">
                        <Button variant="outline" className="bg-gradient-to-r from-[#BEADAD]/50 to-[#7D7D7D]/10 px-6 py-2 z-10 text-black font-semibold rounded-full border border-[#0C0502]/20">Workers</Button>
                        <p className="text-black font-semibold text-3xl">Earn with Your Skills</p>
                        <span className="text-[#666D80] text-lg font-medium">Turn your audio skills into earnings with flexible job opportunities.</span>
                    </div>
                    <Button className="flex rounded-md min-w-32 h-11 z-10 text-white font-semibold text-sm items-center gap-2 bg-surface-700 hover:bg-surface-700">
                        Post a Job
                        <Icons.arrow_right />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Actions;