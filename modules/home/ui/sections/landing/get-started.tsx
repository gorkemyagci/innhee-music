import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

const GetStarted = () => {
    return (
        <div className="w-full max-w-8xl p-20 mx-auto">
            <div className="bg-[#0F0F0F] rounded-2xl py-10 px-8 w-full flex items-center justify-center flex-col gap-8">
                <div className="flex flex-col gap-2.5">
                    <h6 className="text-3xl font-semibold text-white">Generate top quality texts. Instantly.</h6>
                    <span className="text-white/70 text-sm font-normal">Cost-effective solution to generate copy in seconds and editing in real-time.</span>
                </div>
                <Button className="bg-white hover:bg-white/90 rounded-xl py-2.5 px-4 w-36 h-11 flex items-center gap-1 text-black">Get Started <Icons.arrow_right className="size-4" stroke="black" /></Button>
            </div>
        </div>
    )
}

export default GetStarted;