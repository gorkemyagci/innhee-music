import Image from "next/image";
import { getTranslations } from "next-intl/server";

const Features = async () => {
    const t = await getTranslations();
    return (
        <div className="w-full max-w-[1440px] mx-auto flex flex-col py-10 md:py-16 lg:py-20 items-center justify-center gap-8 md:gap-12 lg:gap-16 px-4 lg:px-8">
            <h3 className="text-strong-950 text-[2.5rem] font-medium">{t("HowDoesItWork.title")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 w-full max-w-[1200px] mx-auto">
                <div className="border border-[#E5E5E5] rounded-2xl bg-white p-4 shadow-sm flex flex-col gap-4 md:gap-5 lg:gap-6 items-start">
                    <div className="flex flex-col items-start gap-2 md:gap-3">
                        <h6 className="text-black font-medium text-xl md:text-2xl">{t("features.feature1.title")}</h6>
                        <span className="text-[#666D80] text-sm font-medium">{t("features.feature1.description")}</span>
                    </div>
                    <div className="w-full flex items-center justify-center py-2.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                        <Image
                            src="/assets/images/features/translucent.png"
                            alt={t("features.feature1.title")}
                            width={297}
                            height={227}
                            className="w-full h-auto max-w-[297px] pointer-events-none rounded-xl object-cover"
                            quality={100}
                        />
                    </div>
                </div>
                <div className="border border-[#E5E5E5] rounded-2xl bg-white p-4 shadow-sm flex flex-col gap-4 md:gap-5 lg:gap-6 items-start">
                    <div className="flex flex-col items-start gap-2 md:gap-3">
                        <h6 className="text-black font-medium text-xl md:text-2xl">{t("features.feature2.title")}</h6>
                        <span className="text-[#666D80] text-sm font-medium">{t("features.feature2.description")}</span>
                    </div>
                    <div className="w-full flex items-center justify-center py-2.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                        <Image
                            src="/assets/images/features/frosted.png"
                            alt={t("features.feature2.title")}
                            width={395}
                            height={259}
                            className="w-full h-auto max-w-[395px] pointer-events-none object-cover"
                            quality={100}
                        />
                    </div>
                </div>
                <div className="border border-[#E5E5E5] rounded-2xl bg-white p-4 shadow-sm flex flex-col gap-4 md:gap-5 lg:gap-6 items-start md:col-span-2 lg:col-span-1">
                    <div className="flex flex-col items-start gap-2 md:gap-3">
                        <h6 className="text-black font-medium text-xl md:text-2xl">{t("features.feature3.title")}</h6>
                        <span className="text-[#666D80] text-sm font-medium">{t("features.feature3.description")}</span>
                    </div>
                    <div className="w-full flex items-center justify-center py-2.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                        <Image
                            src="/assets/images/features/glass.png"
                            alt={t("features.feature3.title")}
                            width={395}
                            height={259}
                            className="w-full h-auto max-w-[395px] pointer-events-none object-cover"
                            quality={100}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features;