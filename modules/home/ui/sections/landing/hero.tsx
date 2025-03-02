import { GridPatternDashed } from "@/components/grid-pattern-dashed";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { pageUrls } from "@/lib/constants/page-urls";
import { Button } from "@/components/ui/button";
import { MusicMindMap } from "../../components/music-mindmap";

const Hero = () => {
    return <div className="relative w-full flex items-center flex-col">
        <GridPatternDashed />
        <div className="flex pt-12 flex-col items-center gap-6">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-5 -z-10 transform-gpu overflow-hidden blur-3xl"
            >
                <div
                    style={{
                        clipPath: "circle(50% at 50% 50%)",
                    }}
                    className="relative left-[calc(50%-15rem)] aspect-[2300/700] w-[26.125rem] -translate-x-1/2 rotate-[0deg] bg-white opacity-100 sm:left-[calc(50%-3rem)] sm:w-[75.1875rem]"
                />
            </div>
            <Badge className="flex items-center gap-3 text-[#666D80] text-sm font-medium tracking-tight bg-white border border-[#ECEFF3] rounded-xl pl-4 pr-1.5 py-2">
                Music Distribution
                <span className="bg-[#DA6733] flex items-center justify-center rounded-md h-5 w-6">
                    <Icons.arrow_right />
                </span>
            </Badge>
            <h1 className="text-black-light text-center text-[3.5rem] font-medium leading-[4rem] max-w-2xl">
                Release unlimited music everywhere.
            </h1>
            <p className="text-neutral-500 text-center text-lg font-medium leading-6 max-w-[52rem]">
                Release to the biggest music streaming, download and social platforms like Spotify, Apple Music, TikTok, Amazon, Deezer, Instagram, and Tidal and more.
            </p>
            <div className="flex items-center gap-4">
                <Link href={pageUrls.SIGN_UP} prefetch>
                    <Button className="rounded-xl w-36 h-11 bg-[#20232D] flex items-center justify-center gap-2">
                        Get Started
                        <Icons.arrow_right />
                    </Button>
                </Link>
                <Button variant="outline" className="rounded-xl w-36 h-11 text-main-900">
                    How it Works
                </Button>
            </div>
        </div>
        <div className="w-full">
            <MusicMindMap />
        </div>
    </div>
}

export default Hero;