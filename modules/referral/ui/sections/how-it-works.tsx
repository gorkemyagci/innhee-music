import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const HowItWorks = () => {
    const t = useTranslations("referral.howItWorks");
    
    return (
        <div className="w-full relative bg-strong-950 rounded-2xl shadow-sm min-h-[14rem] p-6 md:p-8 lg:px-12 lg:py-10">
            <GridPattern
                width={60}
                height={60}
                x={-1}
                y={-1}
                className={cn(
                    "[mask-image:radial-gradient(100%_500px_at_top,white,transparent)] opacity-50",
                )}
            />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <div className="flex flex-col items-start gap-2 md:gap-2.5">
                    <h6 className="font-medium text-xl md:text-2xl text-white">{t("title")}</h6>
                    <p className="text-disabled-300 font-normal text-sm md:text-base">{t("subtitle")}</p>
                </div>
                <div className="flex flex-col items-start gap-2 md:gap-2.5">
                    <h6 className="font-medium text-xl md:text-2xl text-white">{t("engage.title")}</h6>
                    <p className="text-disabled-300 font-normal text-sm md:text-base">{t("engage.description")}</p>
                </div>
                <div className="flex flex-col items-start gap-2 md:gap-2.5">
                    <h6 className="font-medium text-xl md:text-2xl text-white">{t("earnings.title")}</h6>
                    <p className="text-disabled-300 font-normal text-sm md:text-base">{t("earnings.description")}</p>
                </div>
                <div className="flex flex-col items-start gap-2 md:gap-2.5">
                    <h6 className="font-medium text-xl md:text-2xl text-white">{t("receive.title")}</h6>
                    <p className="text-disabled-300 font-normal text-sm md:text-base">{t("receive.description")}</p>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks;