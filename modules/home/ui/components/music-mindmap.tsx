"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Image from "next/image";
import { Icons } from "@/components/icons";

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                className,
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";

export function MusicMindMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);
    const div4Ref = useRef<HTMLDivElement>(null);
    const div5Ref = useRef<HTMLDivElement>(null);
    const div6Ref = useRef<HTMLDivElement>(null);
    const div7Ref = useRef<HTMLDivElement>(null);
    const div8Ref = useRef<HTMLDivElement>(null);
    const div9Ref = useRef<HTMLDivElement>(null);
    const div10Ref = useRef<HTMLDivElement>(null);
    const div11Ref = useRef<HTMLDivElement>(null);
    const div12Ref = useRef<HTMLDivElement>(null);
    const div13Ref = useRef<HTMLDivElement>(null);
    const div14Ref = useRef<HTMLDivElement>(null);
    const div15Ref = useRef<HTMLDivElement>(null);

    return (
        <div
            className="relative hidden xl:flex w-full h-fit items-center justify-center py-10"
            ref={containerRef}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 transform-gpu blur-[100px]"
            >
                <div
                    style={{
                        clipPath: "circle(35% at 50% 45%)",
                    }}
                    className="relative left-[calc(50%-15rem)] aspect-[1155/700] w-[26.125rem] -translate-x-1/2 rotate-[0deg] bg-gradient-to-t from-[#DA6733] to-white opacity-90 sm:left-[calc(50%-3rem)] sm:w-[44.1875rem]"
                />
            </div>
            <div className="flex size-full flex-row items-stretch justify-center gap-5">
                <div className="flex flex-row items-center gap-7">
                    <div className="flex flex-col gap-10 items-center justify-between">
                        <Circle ref={div1Ref} className="bg-[#FDFDFD] shadow-none relative border-[1.5px] border-[#E1E4EA] rounded-xl flex flex-col gap-1 items-end w-[170px] h-[147px]">
                            <Icons.cursor className="absolute top-1/2 mt-5 right-4 z-20" />
                            <div className="h-10 px-2 shrink-0 border-[1.5px] border-[#E6E6E6] rounded-xl flex items-center justify-center">
                                <span className="text-[#666D80] font-semibold text-[11px]">Foley</span>
                            </div>
                            <div className="h-10 px-2 shrink-0 border-[1.5px] border-[#E6E6E6] rounded-xl flex items-center justify-center">
                                <span className="text-[#666D80] font-semibold text-[11px] opacity-85">UI Sound Design</span>
                            </div>
                            <div className="h-10 px-2 shrink-0 border-[1.5px] border-[#E6E6E6] rounded-xl flex items-center justify-center">
                                <span className="text-[#666D80] font-semibold text-[11px] opacity-85">Video Sound Design</span>
                            </div>
                        </Circle>
                        <Circle ref={div2Ref} className="bg-[#FDFDFD] shadow-none relative border-[1.5px] border-[#E1E4EA] rounded-xl flex flex-col gap-1 items-end w-60 h-[147px]">
                            <Icons.cursor className="absolute top-1/2 mt-5 right-4 z-20" />
                            <div className="h-10 px-2 shrink-0 border-[1.5px] border-[#E6E6E6] rounded-xl flex items-center justify-center">
                                <span className="text-[#666D80] font-semibold text-[11px]">Rack Installation</span>
                            </div>
                            <div className="h-10 px-2 shrink-0 border-[1.5px] border-[#E6E6E6] rounded-xl flex items-center justify-center">
                                <span className="text-[#666D80] font-semibold text-[11px] opacity-85">Rack Debugging</span>
                            </div>
                            <div className="h-10 px-2 shrink-0 border-[1.5px] border-[#E6E6E6] rounded-xl flex items-center justify-center">
                                <span className="text-[#666D80] font-semibold line-clamp-1 text-[11px] opacity-85">Acoustic Environment Renovation</span>
                            </div>
                        </Circle>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Circle ref={div8Ref} className="bg-[#FDFDFD] text-sm shadow-none relative border-2 border-[#E1E4EA] rounded-xl flex gap-1 items-center text-black font-medium justify-center w-44 h-[3.5rem]">
                            <div className="w-4 h-4 border-t-[2.5px] border-r-[2.5px] border-[#CDD0D5] absolute top-[1.5px] right-[1.5px] rounded-tr-xl" />
                            Sound Effects
                        </Circle>
                        <Circle ref={div9Ref} className="bg-[#FDFDFD] text-sm translate-x-10 shadow-none relative border-2 border-[#E1E4EA] rounded-xl flex gap-1 items-center text-black font-medium justify-center w-48 h-[3.5rem]">
                            <div className="w-4 h-4 border-t-[2.5px] border-r-[2.5px] border-[#CDD0D5] absolute top-[1.5px] right-[1.5px] rounded-tr-xl" />
                            Equipment Debugging
                        </Circle>
                        <Circle ref={div10Ref} className="bg-[#FDFDFD] text-sm shadow-none relative border-2 border-[#E1E4EA] rounded-xl flex gap-1 items-center text-black font-medium justify-center w-44 h-[3.5rem]">
                            <div className="w-4 h-4 border-t-[2.5px] border-r-[2.5px] border-[#CDD0D5] absolute top-[1.5px] right-[1.5px] rounded-tr-xl" />
                            Lyrics Writing
                        </Circle>
                    </div>
                </div>
                <Circle ref={div4Ref} className="size-80 bg-transparent shadow-none border-none">
                    <Image
                        src="/assets/images/music-hero.png"
                        alt="Music"
                        width={320}
                        height={320}
                        className="pointer-events-none"
                    />
                </Circle>
                <div className="flex flex-row-reverse items-center gap-10">
                    <div className="flex flex-col gap-10 items-center justify-between">
                        <Circle ref={div11Ref} className="bg-[#FDFDFD] shadow-none relative border-[1.5px] border-[#E1E4EA] rounded-xl flex flex-col gap-1 items-start w-[170px] h-[147px]">
                            <Icons.cursor className="absolute top-9 left-16 z-20" />
                            <div className="h-10 px-2 shrink-0 border-[1.5px] border-[#E6E6E6] rounded-xl flex items-center justify-center">
                                <span className="text-[#666D80] font-semibold text-[11px]">Mastering</span>
                            </div>
                            <div className="h-10 px-2 shrink-0 border-[1.5px] border-[#E6E6E6] rounded-xl flex items-center justify-center">
                                <span className="text-[#666D80] font-semibold text-[11px] opacity-85">Track Mixing</span>
                            </div>
                            <div className="h-10 px-2 shrink-0 border-[1.5px] border-[#E6E6E6] rounded-xl flex items-center justify-center">
                                <span className="text-[#666D80] font-semibold text-[11px] opacity-85">Hardware Mixing</span>
                            </div>
                        </Circle>
                        <Circle ref={div12Ref} className="bg-[#FDFDFD] shadow-none relative border-[1.5px] border-[#E1E4EA] rounded-xl flex flex-col gap-1 items-start w-60 h-[103px]">
                            <Icons.cursor className="absolute top-1/2 -mt-2 right-7 z-20" />
                            <div className="h-10 px-2 shrink-0 border-[1.5px] border-[#E6E6E6] scale-[1.01] shadow-sm rounded-xl flex items-center justify-center">
                                <span className="text-[#666D80] font-semibold text-[11px]">Ancient or Modern Instruments</span>
                            </div>
                            <div className="h-10 px-2 shrink-0 border-[1.5px] border-[#E6E6E6] shadow-sm rounded-xl flex items-center justify-center">
                                <span className="text-[#666D80] font-semibold line-clamp-1 text-[11px] opacity-85">Regional Instruments</span>
                            </div>
                        </Circle>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Circle ref={div13Ref} className="bg-[#FDFDFD] text-sm shadow-none relative border-2 border-[#E1E4EA] rounded-xl flex gap-1 items-center text-black font-medium justify-center w-36 h-[3.5rem]">
                            <div className="w-4 h-4 border-t-[2.5px] border-r-[2.5px] border-[#ED9913] absolute top-[1.5px] right-[1.5px] rounded-tr-xl" />
                            Mixing
                        </Circle>
                        <Circle ref={div14Ref} className="bg-[#FDFDFD] text-sm translate-x-10 shadow-none relative border-2 border-[#E1E4EA] rounded-xl flex gap-1 items-center text-black font-medium justify-center w-40 h-[3.5rem]">
                            <div className="w-4 h-4 border-t-[2.5px] border-r-[2.5px] border-[#CDD0D5] absolute top-[1.5px] right-[1.5px] rounded-tr-xl" />
                            Instruments
                        </Circle>
                        <Circle ref={div15Ref} className="bg-[#FDFDFD] text-sm shadow-none relative border-2 border-[#E1E4EA] rounded-xl flex gap-1 items-center text-black font-medium justify-center w-36 h-[3.5rem]">
                            <div className="w-4 h-4 border-t-[2.5px] border-r-[2.5px] border-[#CDD0D5] absolute top-[1.5px] right-[1.5px] rounded-tr-xl" />
                            Composition
                        </Circle>
                    </div>
                </div>
            </div>
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div8Ref}
                curvature={-75}
                endYOffset={-20}
                startYOffset={-20}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div8Ref}
                toRef={div4Ref}
                curvature={25}
                endYOffset={-10}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div9Ref}
                curvature={125}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div9Ref}
                toRef={div4Ref}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div10Ref}
                toRef={div4Ref}
                curvature={-50}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div4Ref}
                curvature={75}
                endYOffset={10}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div4Ref}
                curvature={-75}
                endYOffset={-10}
                reverse
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div4Ref}
                reverse
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div7Ref}
                toRef={div4Ref}
                curvature={75}
                endYOffset={10}
                reverse
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div11Ref}
                toRef={div13Ref}
                curvature={75}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div12Ref}
                toRef={div14Ref}
                curvature={10}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div13Ref}
                toRef={div4Ref}
                curvature={25}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div14Ref}
                toRef={div4Ref}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div15Ref}
                toRef={div4Ref}
                curvature={-25}
            />
        </div>
    );
}
