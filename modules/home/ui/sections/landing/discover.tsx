import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const Discover = async () => {
    const t = await getTranslations();
    return (
        <div className="py-10 max-w-[1440px] w-full mx-auto md:py-12 lg:py-16 px-4 md:px-8 lg:px-20 flex flex-col gap-8 md:gap-10 lg:gap-14 items-center">
            <div className="flex flex-col items-center gap-6">
                <Button variant="outline" className="bg-white hover:bg-white flex gap-2.5 items-center pr-6 py-[0.325rem] rounded-full h-10 pl-[0.325rem] border border-[#DA6733]">
                    <div className="bg-[#DA6733] w-16 h-[1.875rem] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                            {t("common.news")}
                        </span>
                    </div>
                    <span className="text-strong-950 font-medium text-sm">{t("features_2.title")}</span>
                </Button>
                <div className="flex flex-col items-center gap-4">
                    <h3 className="text-strong-950 text-[2.5rem] font-medium">{t("features_2.title")}</h3>
                    <p className="text-sub-600 text-lg font-normal max-w-xl text-center">{t("features_2.feature1.description")}</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    <div className="p-5 sm:p-6 md:p-8 border border-soft-200 rounded-[20px] bg-white flex flex-col gap-3 sm:gap-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="https://s3-alpha-sig.figma.com/img/91b7/6492/b0a508fac28f0dd9b5fe6195750e8b77?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gcBnhwJ7oiDMpvxDmQJb75-8Fjjp2fNrtH~gaRagbrOSoIJq-TPRHaKdDyHLKwdJO3vCrws8f--8LgiLB5Rv3yrkP~GFQsdzb5SuP98~NeZd07brInrv2Drd75D6LgX-5iNWxJGFk6vqPJGc8mU9u-Wct5eK4~jQ-ivg6-AZRUmkke7vLotvWrMONErWA0dMONh8rkMP-JH15YBMQkPV4e6lHxKSQ~ZnWR517FBqSZmZKBwt7lgCYRFd7oam~Zw5eeWjUgq~KHzr~vSgqxYNM4FV2~hx8fa0sawZBtS6-1DxtXzdSkCZKRnnVfbQofWZNsC406YXe2wL-1kMZkgPwQ__"
                                alt="Quick"
                                width={28}
                                height={28}
                                className="sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]"
                            />
                            <span className="text-strong-950 font-medium text-lg sm:text-xl md:text-2xl">{t("features_2.feature1.title")}</span>
                        </div>
                        <span className="text-sub-600 text-sm sm:text-base font-normal">{t("features_2.feature1.description")}</span>
                    </div>
                    <div className="p-5 sm:p-6 md:p-8 border border-soft-200 rounded-[20px] bg-white flex flex-col gap-3 sm:gap-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/svgs/certificate.svg"
                                alt="Professional"
                                width={28}
                                height={28}
                                className="sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]"
                            />
                            <span className="text-strong-950 font-medium text-lg sm:text-xl md:text-2xl">{t("features_2.feature2.title")}</span>
                        </div>
                        <span className="text-sub-600 text-sm sm:text-base font-normal">{t("features_2.feature2.description")}</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    <div className="p-5 sm:p-6 md:p-8 border border-soft-200 rounded-[20px] bg-white flex flex-col gap-3 sm:gap-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/svgs/security.svg"
                                alt="Security"
                                width={28}
                                height={28}
                                className="sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]"
                            />
                            <span className="text-strong-950 font-medium text-lg sm:text-xl md:text-2xl">{t("features_2.feature3.title")}</span>
                        </div>
                        <span className="text-sub-600 text-sm sm:text-base font-normal">{t("features_2.feature3.description")}</span>
                    </div>
                    <div className="p-5 sm:p-6 md:p-8 border border-soft-200 rounded-[20px] bg-white flex flex-col gap-3 sm:gap-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/svgs/schedule.svg"
                                alt="Schedule"
                                width={28}
                                height={28}
                                className="sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]"
                            />
                            <span className="text-strong-950 font-medium text-lg sm:text-xl md:text-2xl">{t("features_2.feature4.title")}</span>
                        </div>
                        <span className="text-sub-600 text-sm sm:text-base font-normal">{t("features_2.feature4.description")}</span>
                    </div>
                    <div className="p-5 sm:p-6 md:p-8 border border-soft-200 rounded-[20px] bg-white flex flex-col gap-3 sm:gap-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/svgs/commerce.svg"
                                alt="Commerce"
                                width={28}
                                height={28}
                                className="sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]"
                            />
                            <span className="text-strong-950 font-medium text-lg sm:text-xl md:text-2xl">{t("features_2.feature5.title")}</span>
                        </div>
                        <span className="text-sub-600 text-sm sm:text-base font-normal">{t("features_2.feature5.description")}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Discover;