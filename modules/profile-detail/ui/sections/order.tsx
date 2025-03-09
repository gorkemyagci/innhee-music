import { Separator } from "@/components/ui/separator";

import { Icons } from "@/components/icons";

import Image from "next/image";

const Order = () => {
    return (
        <div className="flex w-full flex-col items-start gap-6">
            {new Array(5).fill(0).map((_, i) => (
                <div key={i} className="w-full flex flex-col items-start gap-6">
                    <div className="flex flex-row items-center gap-4 w-full justify-between">
                        <div className="flex flex-col items-start gap-1">
                            <p className="text-main-900 font-medium">Funky Bounce Logo</p>
                            <span className="text-soft-400 font-medium text-sm">by Konstain Garbuzyuk</span>
                        </div>
                        <Image
                            src="/assets/svgs/voice.svg"
                            alt="voice"
                            width={234}
                            height={25}
                        />
                        <div className="flex flex-col items-start gap-1">
                            <p className="text-main-900 font-medium">0:22</p>
                            <span className="text-soft-400 font-medium text-sm">112 BPM</span>
                        </div>
                        <span className="text-soft-400 font-medium text-sm">work / work history / <br /> evaluation</span>
                        <div className="flex flex-row items-center gap-2">
                            <div className="w-10 h-10 bg-white flex items-center justify-center border border-soft-200 rounded-[10px]">
                                <Icons.music_square_add />
                            </div>
                            <div className="w-10 h-10 bg-white flex items-center justify-center border border-soft-200 rounded-[10px]">
                                <Icons.heart />
                            </div>
                            <div className="w-10 h-10 bg-white flex items-center justify-center border border-soft-200 rounded-[10px]">
                                <Icons.menu />
                            </div>
                        </div>
                    </div>
                    <Separator className="bg-soft-200" />
                </div>
            ))}
        </div>
    )
}

export default Order;