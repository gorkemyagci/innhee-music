import { GridPatternDashed } from "@/components/grid-pattern-dashed";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { pageUrls } from "@/lib/constants/page-urls";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/magicui/text-animate";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { getTranslations } from "next-intl/server";

const Hero = async () => {
    const t = await getTranslations();
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
            <Badge className="flex items-center gap-3 text-[#666D80] text-sm font-medium tracking-tight bg-weak-50 border border-soft-200 rounded-xl pl-4 pr-1.5 py-2">
                {t("hero.title")}
                <span className="bg-[#DA6733] flex items-center justify-center rounded-md h-5 w-6">
                    <Icons.arrow_right />
                </span>
            </Badge>
            <h1 className="text-black-light text-center text-[2rem] md:text-[2.5rem] lg:text-[3.5rem] font-medium leading-[2.5rem] md:leading-[3rem] lg:leading-[4rem] max-w-2xl">
                {t("landingPageTitle")}
            </h1>
            <TextAnimate startOnView={false} className="text-neutral-500 text-center text-base lg:text-lg font-medium leading-6 max-w-[52rem] px-4" animation="blurInUp" by="word">
                {t("landingPageSubtitle")}
            </TextAnimate>
            <div className="w-full flex justify-center items-center pt-3">
                <Link href={pageUrls.SIGN_UP} prefetch>
                    <Button
                        type="button"
                        className={cn("w-[145px] h-11 disabled:cursor-auto group rounded-[10px] text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]")}>
                        <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                        {t("hero.ctaButton")}
                        <Icons.arrow_right />
                    </Button>
                </Link>
            </div>
        </div>
        <div className="w-full flex flex-col md:flex-row items-stretch gap-4 max-w-[1200px] mt-10 mx-auto md:gap-6">
            <div className="flex-1 relative bg-[#1B1B1B] p-6 md:p-8 rounded-2xl flex flex-col items-start border-2 gap-6 md:gap-8 border-[#E5E5E5]">
                <GridPattern
                    width={60}
                    height={60}
                    x={-1}
                    y={-1}
                    className={cn(
                        "[mask-image:radial-gradient(100%_500px_at_top,white,transparent)] opacity-50",
                    )}
                />
                <Icons.big_cursor className="absolute bottom-6 left-1/2 hidden md:block" />
                <div className="flex flex-col items-start gap-2 md:gap-3">
                    <Button variant="outline" className="bg-gradient-to-r h-10 from-white/40 to-white/10 px-4 md:px-6 py-1.5 md:py-2 z-10 text-white font-semibold text-sm md:text-base rounded-full border border-white/50">{t("Buyer.title")}</Button>
                    <p className="text-white font-semibold text-2xl">{t("Buyer.title")}</p>
                    <span className="text-disabled-300 text-base md:text-lg font-medium">{t("Buyer.description")}</span>
                </div>
                <Button className="flex rounded-md min-w-28 md:min-w-32 h-9 md:h-11 z-10 text-black font-semibold text-sm items-center gap-2 bg-weak-100 hover:bg-weak-100">
                    {t("Buyer.ctaButton")}
                    <Icons.arrow_right className="size-3 md:size-4" stroke="#0A0D14" />
                </Button>
            </div>
            <div className="flex-1 relative bg-white p-6 md:p-8 rounded-2xl flex flex-col items-start border-2 gap-6 md:gap-8 border-[#E5E5E5]">
                <GridPattern
                    width={60}
                    height={60}
                    x={-1}
                    y={-1}
                    className={cn(
                        "[mask-image:radial-gradient(100%_500px_at_top,white,transparent)] opacity-50",
                    )}
                />
                <div className="flex flex-col items-start gap-2 md:gap-3">
                    <Button variant="outline" className="bg-gradient-to-r h-10 from-[#BEADAD]/50 to-[#7D7D7D]/10 px-4 md:px-6 py-1.5 md:py-2 z-10 text-black text-sm md:text-base font-semibold rounded-full border border-[#0C0502]/20">{t("Worker.title")}</Button>
                    <p className="text-black font-semibold text-2xl">{t("Worker.title")}</p>
                    <span className="text-[#666D80] text-base md:text-lg font-medium">{t("Worker.description")}</span>
                </div>
                <Button className="flex rounded-md min-w-28 md:min-w-32 h-9 md:h-11 z-10 text-white font-semibold text-sm items-center gap-2 bg-surface-700 hover:bg-surface-700">
                    {t("Worker.ctaButton")}
                    <Icons.arrow_right className="size-3 md:size-4" />
                </Button>
            </div>
        </div>
    </div>
}

export default Hero;