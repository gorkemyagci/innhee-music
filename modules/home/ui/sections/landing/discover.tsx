import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const Discover = async () => {
    const t = await getTranslations("landing.features");
    return (
        <div className="py-10 max-w-[1440px] w-full mx-auto md:py-12 lg:py-16 px-4 md:px-8 lg:px-20 flex flex-col gap-8 md:gap-10 lg:gap-14 items-center">
            <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-4">
                    <h3 className="text-strong-950 text-[2.5rem] font-medium">{t("title")}</h3>
                    <p className="text-sub-600 text-lg font-normal max-w-xl text-center">{t("items.quickAndFree.description")}</p>
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
                            <span className="text-strong-950 font-medium text-lg sm:text-xl md:text-2xl">{t("items.quickAndFree.title")}</span>
                        </div>
                        <span className="text-sub-600 text-sm sm:text-base font-normal">{t("items.quickAndFree.description")}</span>
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
                            <span className="text-strong-950 font-medium text-lg sm:text-xl md:text-2xl">{t("items.professional.title")}</span>
                        </div>
                        <span className="text-sub-600 text-sm sm:text-base font-normal">{t("items.professional.description")}</span>
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
                            <span className="text-strong-950 font-medium text-lg sm:text-xl md:text-2xl">{t("items.security.title")}</span>
                        </div>
                        <span className="text-sub-600 text-sm sm:text-base font-normal">{t("items.security.description")}</span>
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
                            <span className="text-strong-950 font-medium text-lg sm:text-xl md:text-2xl">{t("items.schedule.title")}</span>
                        </div>
                        <span className="text-sub-600 text-sm sm:text-base font-normal">{t("items.schedule.description")}</span>
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
                            <span className="text-strong-950 font-medium text-lg sm:text-xl md:text-2xl">{t("items.commerce.title")}</span>
                        </div>
                        <span className="text-sub-600 text-sm sm:text-base font-normal">{t("items.commerce.description")}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Discover;