import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

const Discover = () => {
    return (
        <div className="py-10 px-20 flex flex-col gap-14 items-center">
            <div className="flex flex-col items-center gap-6">
                <Button variant="outline" className="bg-white flex gap-2.5 items-center pr-6 py-[0.325rem] rounded-full h-10 max-w-[207px] w-full pl-[0.325rem] border border-[#DA6733]">
                    <div className="bg-[#DA6733] w-16 h-[1.875rem] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                            News!
                        </span>
                    </div>
                    <span className="text-[#1A1C1E] font-normal text-sm">Unlcok the Best</span>
                </Button>
                <h2 className="text-neutral-800 text-center text-[3.5rem] leading-[4rem] font-medium">
                    Discover the Essentials
                </h2>
            </div>
            <div className="w-full grid grid-cols-4 gap-0 h-[17.25rem]">
                <div className="rounded-l-4xl bg-white p-6 flex flex-col items-start h-full justify-between">
                    <div className="flex flex-col items-start gap-4">
                        <h6 className="text-[#DA6733] font-medium text-2xl">Post Your Audio Project</h6>
                        <span className="text-[#637381] font-normal">Post a clear brief for voiceovers, mixing, podcast editing, or sound production.</span>
                    </div>
                    <Button className="flex items-center gap-2.5 rounded-full h-[3.25rem] py-2.5 pl-4 pr-3 w-40">
                        Learn More
                        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <Icons.arrow_right stroke="black" className="size-4" />
                        </span>
                    </Button>
                </div>
                <div className="bg-[#DA6733] p-6 flex flex-col items-start h-full justify-between">
                    <div className="flex flex-col items-start gap-4">
                        <h6 className="text-white font-medium text-2xl">Top Audio Professionals</h6>
                        <span className="text-white font-normal">Access vetted audio editors, voice actors, sound engineers, and musicians.</span>
                    </div>
                    <Button className="flex items-center bg-white hover:bg-white text-[#0F0F0F] gap-2.5 rounded-full h-[3.25rem] py-2.5 pl-4 pr-3 w-40">
                        Learn More
                        <span className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                            <Icons.arrow_right className="size-4" />
                        </span>
                    </Button>
                </div>
                <div className="bg-white p-6 flex flex-col items-start h-full justify-between">
                    <div className="flex flex-col items-start gap-4">
                        <h6 className="text-[#DA6733] font-medium text-2xl">Intelligent Matching System</h6>
                        <span className="text-[#637381] font-normal">AI-driven skill-based matching connects you with top talent instantly.</span>
                    </div>
                    <Button className="flex items-center gap-2.5 rounded-full h-[3.25rem] py-2.5 pl-4 pr-3 w-40">
                        Learn More
                        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <Icons.arrow_right stroke="black" className="size-4" />
                        </span>
                    </Button>
                </div>
                <div className="rounded-r-4xl bg-white p-6 flex flex-col items-start h-full justify-between">
                    <div className="flex flex-col items-start gap-4">
                        <h6 className="text-[#DA6733] font-medium text-2xl">Streamlined Payments</h6>
                        <span className="text-[#637381] font-normal">Secure payments after project completion through integrated solutions.</span>
                    </div>
                    <Button className="flex items-center gap-2.5 rounded-full h-[3.25rem] py-2.5 pl-4 pr-3 w-40">
                        Learn More
                        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <Icons.arrow_right stroke="black" className="size-4" />
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Discover;