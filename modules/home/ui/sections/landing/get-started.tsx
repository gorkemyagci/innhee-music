import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

const GetStarted = () => {
    return (
        <div className="w-full max-w-8xl px-4 md:px-8 lg:px-20 py-8 md:py-12 lg:py-20 mx-auto">
            <div className="bg-[#0F0F0F] rounded-xl md:rounded-2xl py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8 w-full flex items-center justify-center flex-col gap-6 md:gap-8">
                <div className="flex flex-col gap-2 md:gap-2.5 text-center">
                    <h6 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white">Generate top quality texts. Instantly.</h6>
                    <span className="text-white/70 text-xs md:text-sm font-normal max-w-lg">Cost-effective solution to generate copy in seconds and editing in real-time.</span>
                </div>
                <Button className="bg-white hover:bg-white/90 rounded-xl py-2 md:py-2.5 px-3 md:px-4 w-32 md:w-36 h-9 md:h-11 flex items-center justify-center gap-1 text-black text-sm md:text-base">
                    Get Started 
                    <Icons.arrow_right className="size-3 md:size-4" stroke="black" />
                </Button>
            </div>
        </div>
    )
}

export default GetStarted;