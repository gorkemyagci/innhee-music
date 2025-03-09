import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Review = () => {
    return <div className="flex w-full flex-col items-start gap-6">
        {new Array(5).fill(0).map((_, i) => (
            <div key={i} className="border border-soft-200 w-full p-4 flex flex-col gap-[18px] rounded-[12px]">
                <div className="w-full flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/assets/images/company-card.png"
                            width={36}
                            height={36}
                            className="w-9 h-9"
                            alt="Company Card"
                        />
                        <div className="flex flex-col items-start gap-1">
                            <span className="text-[#0D0D12] font-medium text-lg">Cleve Music</span>
                            <span className="text-[#31353F] font-medium text-xs">Marketing Tomorrow</span>
                        </div>
                    </div>
                    <div className="bg-[#F2F2F2] rounded-full h-5 flex items-center justify-center gap-0.5 px-2 py-1">
                        <Icons.star className="fill-black" />
                        <span className="text-main-900 font-medium text-[11px]">4.9 (125)</span>
                    </div>
                </div>
                <Separator className="bg-soft-200" />
                <p className="text-[#31353F] font-medium text-xs">$55,000 - $65,000 (One Time Payment)</p>
                <div className="w-full flex items-end justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-weak-100 h-5 rounded-full flex items-center justify-center py-1 px-2 text-sub-600 font-medium text-[11px]">
                            $55,000 - $65,000/year
                        </div>
                        <div className="bg-weak-100 h-5 rounded-full flex items-center justify-center py-1 px-2 text-sub-600 font-medium text-[11px]">
                            Full-Time
                        </div>
                        <div className="bg-weak-100 h-5 rounded-full flex items-center justify-center py-1 px-2 text-sub-600 font-medium text-[11px]">
                            Remote Work Available
                        </div>
                    </div>
                    <Button
                        type="button"
                        className="w-[106px] h-9 flex items-center gap-1 disabled:cursor-auto group rounded-[10px] text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                        <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                        View Details
                    </Button >
                </div>
            </div>
        ))}
    </div>
}

export default Review;