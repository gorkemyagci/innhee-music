import { Icons } from "@/components/icons"
import { GridPattern } from "@/components/magicui/grid-pattern"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

const BecomePartner = () => {
    const t = useTranslations("referral.becomePartner");
    
    return (
        <div className="flex-1 w-full flex flex-col items-center gap-4 md:gap-6 px-4 md:px-8 lg:px-20 py-8 md:py-12 lg:py-16">
            <div className="flex flex-col items-center gap-2 md:gap-3">
                <span className="text-sub-600 font-medium text-xs md:text-sm tracking-wide">{t("title")}</span>
                <p className="text-strong-950 font-medium text-xl md:text-2xl text-center">{t("subtitle")}</p>
            </div>
            <div className="w-full flex flex-col md:flex-row items-stretch gap-4 md:gap-6">
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
                        <Button variant="outline" className="bg-gradient-to-r from-[#BEADAD]/50 to-[#7D7D7D]/10 px-4 md:px-6 py-1.5 md:py-2 z-10 text-black text-sm md:text-base font-semibold rounded-full border border-[#0C0502]/20">{t("buyers.tag")}</Button>
                        <p className="text-black font-semibold text-2xl md:text-3xl">{t("buyers.title")}</p>
                        <span className="text-[#666D80] text-base md:text-lg font-medium">{t("buyers.description")}</span>
                    </div>
                    <Button className="flex rounded-md min-w-28 md:min-w-32 h-9 md:h-11 z-10 text-white font-semibold text-sm items-center gap-2 bg-surface-700 hover:bg-surface-700">
                        {t("buyers.button")}
                        <Icons.arrow_right className="size-3 md:size-4" />
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
                        <Button variant="outline" className="bg-gradient-to-r from-[#BEADAD]/50 to-[#7D7D7D]/10 px-4 md:px-6 py-1.5 md:py-2 z-10 text-black text-sm md:text-base font-semibold rounded-full border border-[#0C0502]/20">{t("workers.tag")}</Button>
                        <p className="text-black font-semibold text-2xl md:text-3xl">{t("workers.title")}</p>
                        <span className="text-[#666D80] text-base md:text-lg font-medium">{t("workers.description")}</span>
                    </div>
                    <Button className="flex rounded-md min-w-28 md:min-w-32 h-9 md:h-11 z-10 text-white font-semibold text-sm items-center gap-2 bg-surface-700 hover:bg-surface-700">
                        {t("workers.button")}
                        <Icons.arrow_right className="size-3 md:size-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BecomePartner;