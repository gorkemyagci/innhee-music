import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const AudioWorkers = () => {
    return <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 py-10 md:py-12 lg:py-16 flex flex-col items-center gap-8 md:gap-10 lg:gap-14">
        <div className="flex flex-col items-center gap-3 md:gap-4">
            <h2 className="text-neutral-800 text-center text-[2rem] md:text-[2.5rem] lg:text-[3.5rem] leading-[2.5rem] md:leading-[3rem] lg:leading-[4rem] font-medium">
                Top Audio Workers
            </h2>
            <p className="text-neutral-500 font-medium text-base lg:text-lg leading-6 max-w-3xl text-center px-4">
                Unlock seamless music streaming with innovative features. Discover new sounds, connect with artists, and enjoy immersive audio like never before.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 w-full">
            {new Array(6).fill(0).map((_, index) => (
                <div key={index} className="w-full p-4 flex flex-col items-start gap-4 bg-white border border-soft-200 rounded-xl">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/assets/images/avatar.png"
                            alt="avatar"
                            width={48}
                            height={48}
                            className="pointer-events-none w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                            quality={100}
                        />
                        <div className="flex flex-col items-start">
                            <div className="flex flex-row items-center gap-2">
                                <span className="text-strong-950 font-normal text-base md:text-lg tracking-tight">Cleve Music</span>
                                <div className="flex flex-row items-center gap-1">
                                    <Icons.star className="size-3.5 md:size-4" />
                                    <span className="text-main-900 font-normal text-xs md:text-sm tracking-wide">4.9</span>
                                    <span className="text-sub-600 font-medium text-[10px] md:text-xs">(125)</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <Icons.dollar_square className="size-3.5 md:size-4" />
                                    <span className="text-sub-600 text-[10px] md:text-xs font-medium">Salary</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icons.map className="size-3.5 md:size-4" />
                                    <span className="text-sub-600 text-[10px] md:text-xs font-medium">Work</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icons.star className="size-3.5 md:size-4 fill-blue-800" />
                                    <span className="text-sub-600 text-[10px] md:text-xs font-medium">Specia</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <p className="text-neutral-600 text-xs md:text-sm font-normal">Passionate about delivering high-quality audio mixing and editing. Let's create something amazing together!</p>
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 flex items-center justify-center">
                            <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">Mixing</span>
                        </div>
                        <div className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 flex items-center justify-center">
                            <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">Singing</span>
                        </div>
                        <div className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 flex items-center justify-center">
                            <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">Jazz</span>
                        </div>
                        <div className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 flex items-center justify-center">
                            <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">Hip pop</span>
                        </div>
                        <div className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 flex items-center justify-center">
                            <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">K pop</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default AudioWorkers;