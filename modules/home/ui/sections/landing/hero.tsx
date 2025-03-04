import { GridPatternDashed } from "@/components/grid-pattern-dashed";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { pageUrls } from "@/lib/constants/page-urls";
import { Button } from "@/components/ui/button";
import { MusicMindMap } from "../../components/music-mindmap";
import { TextAnimate } from "@/components/magicui/text-animate";

const Hero = () => {
    return <div className="relative w-full flex items-center flex-col px-4 lg:px-8">
        <GridPatternDashed />
        <div className="flex pt-8 lg:pt-12 flex-col items-center gap-4 lg:gap-6">
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
            <h1 className="text-black-light text-center text-[2rem] md:text-[2.5rem] lg:text-[3.5rem] font-medium leading-[2.5rem] md:leading-[3rem] lg:leading-[4rem] max-w-2xl">
                Release unlimited music everywhere.
            </h1>
            <TextAnimate startOnView={false} className="text-neutral-500 text-center text-base lg:text-lg font-medium leading-6 max-w-[52rem] px-4" animation="blurInUp" by="word">
                Release to the biggest music streaming, download and social platforms like Spotify, Apple Music, TikTok, Amazon, Deezer, Instagram, and Tidal and more.
            </TextAnimate>
            <div className="flex flex-row items-center gap-4">
                <Link href={pageUrls.SIGN_UP} prefetch className="w-full">
                    <Button className="rounded-xl sm:w-36 h-11 bg-[#20232D] flex items-center justify-center gap-2">
                        Get Started
                        <Icons.arrow_right />
                    </Button>
                </Link>
                <Button variant="outline" className="rounded-xl sm:w-36 h-11 text-main-900">
                    How it Works
                </Button>
            </div>
        </div>
        <div className="w-full hidden xl:block">
            <MusicMindMap />
        </div>
    </div>
}

export default Hero;