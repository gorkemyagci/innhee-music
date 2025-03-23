import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WhatsInside = () => {
    const features = [
        { id: "1", title: "Post Your Audio Project", description: "Post a clear brief for voiceovers, mixing, podcast editing, or sound production.", icon: <Icons.post_your_audio className="shrink-0" /> },
        { id: "2", title: "Intelligent Matching System", description: "AI-driven skill-based matching connects you with top talent instantly.", icon: <Icons.creative className="shrink-0" /> },
        { id: "3", title: "Intelligent Matching System", description: "AI-driven skill-based matching connects you with top talent instantly.", icon: <Icons.mixer className="shrink-0" /> },
        { id: "4", title: "Streamlined", description: "Secure payments after project completion through integrated solutions.", icon: <Icons.air_conditioning className="shrink-0" /> }
    ]
    return <div className="max-w-[1200px] py-20 mx-auto flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3">
            <Button variant="outline" className="bg-white hover:bg-white flex gap-2.5 items-center pr-6 py-[0.325rem] rounded-full h-10 max-w-[207px] w-full pl-[0.325rem] border border-[#DA6733]">
                <div className="bg-[#DA6733] w-16 h-[1.875rem] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">
                        News!
                    </span>
                </div>
                <span className="text-strong-950 font-medium text-sm">Unlock the Best</span>
            </Button>
            <h3 className="text-strong-950 text-[2.5rem] font-medium ">What's inside AlignUl?</h3>
        </div>
        <div className="w-full max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border-t border-disabled-300 border-b py-6">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex flex-col items-start gap-4 sm:gap-6 px-4 sm:px-6",
                            "sm:border-r border-disabled-300 last:border-r-0",
                            "h-auto sm:h-[180px]"
                        )}
                    >
                        {item.icon}
                        <div className="flex flex-col items-start gap-2 sm:gap-3">
                            <h6 className="text-strong-950 font-medium text-lg sm:text-xl">{item.title}</h6>
                            <p className="text-sub-600 text-xs sm:text-sm md:text-[13.5px] font-normal">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default WhatsInside;