import { Icons } from "@/components/icons";

const WokerItem = ({ index }: { index: any }) => {
    return (
        <div key={index} className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Icons.play_pause />
                <div className="flex flex-col items-start gap-1">
                    <span className="text-main-900 font-medium">Funky Bounce Logo</span>
                    <span className="text-soft-400 font-medium text-xs">WORKER REMARKS TEXT</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Mixing
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Singing
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Jazz
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Hip pop
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    K pop
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-start gap-1">
                    <span className="text-main-900 font-medium text-[15px]">0:22</span>
                    <span className="text-soft-400 font-medium text-[13px]">112 BPM</span>
                </div>
                <span className="text-soft-400 font-medium text-sm">work / work history / evaluation</span>
                <Icons.save />
            </div>
        </div>
    )
}

export default WokerItem;