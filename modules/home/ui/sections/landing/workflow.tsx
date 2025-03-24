import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const Workflow = async () => {
    const t = await getTranslations("landing.workflow");
    return (
        <div className="py-6 sm:py-8 md:py-12 lg:py-16 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-20 flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-14 items-center">
            <h3 className="text-strong-950 text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] font-medium text-center">{t("title")}</h3>
            <div className="flex flex-col items-center gap-6 w-full max-w-[1200px] mx-auto">
                <div className="flex flex-col items-center gap-4 sm:gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 lg:gap-12">
                        <Button variant="outline" className="border-soft-200 rounded-full py-2 sm:py-2.5 px-3 hover:bg-white w-full sm:w-auto">
                            <Icons.flaslight_fill className="fill-[#47C2FF] w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-strong-950 font-medium text-sm sm:text-base">{t("projectTypes.individual")}</span>
                        </Button>
                        <Button variant="outline" className="border-soft-200 rounded-full py-2 sm:py-2.5 px-3 hover:bg-white w-full sm:w-auto">
                            <Icons.flaslight_fill className="fill-[#47C2FF] w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-strong-950 font-medium text-sm sm:text-base">{t("projectTypes.commercial")}</span>
                        </Button>
                        <Button variant="outline" className="border-soft-200 rounded-full py-2 sm:py-2.5 px-3 hover:bg-white w-full sm:w-auto">
                            <Icons.flaslight_fill className="fill-[#47C2FF] w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-strong-950 font-medium text-sm sm:text-base">{t("projectTypes.team")}</span>
                        </Button>
                    </div>
                    <Icons.info_navigation className="w-full sm:w-auto" />
                </div>
                <div className="border border-[#CACFD8] rounded-[20px] sm:rounded-[32px] max-w-[440px] h-auto sm:h-[450px] w-full flex flex-col items-center justify-center p-4 sm:p-6">
                    <div className="border border-soft-200 w-full sm:w-[360px] rounded-[12px] p-3 sm:p-4 flex flex-col gap-3 sm:gap-[18px]">
                        <div className="flex items-start w-full justify-between">
                            <div className="flex items-center gap-1">
                                <UserAvatar
                                    imageUrl="/assets/images/avatar-3.png"
                                    name={t("artist.name")}
                                />
                                <div className="flex flex-col items-start gap-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sub-600 font-medium text-xs">{t("artist.name")}</span>
                                        <div className="flex items-center gap-0.5">
                                            <Icons.star className="w-3 h-3 sm:w-4 sm:h-4" />
                                            <span className="text-sub-600 font-normal text-xs">{t("artist.rating")}({t("artist.reviews")})</span>
                                        </div>
                                    </div>
                                    <span className="text-sub-600 text-xs font-medium">{t("artist.role")}</span>
                                </div>
                            </div>
                            <Icons.heart className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <Separator className="bg-soft-200" />
                        <div className="flex flex-wrap gap-2">
                            {["Mixing", "Singing", "Jazz", "Hip pop", "K pop"].map((skill: string, index: number) => (
                                <div key={index} className="border border-soft-200 text-sub-600 text-xs font-medium rounded-md h-6 px-2 py-1 flex items-center justify-center">
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col mt-5 w-full relative">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 border border-[#DADADA] z-10 bg-white rounded-full w-2 h-2"></div>
                        <Icons.line className="absolute top-0 left-1/2 -translate-x-1/2 w-full sm:w-auto" />
                        <div className="relative h-[1px] w-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-soft-200 to-transparent"></div>
                        </div>
                        <div className="flex flex-col items-center gap-3 sm:gap-5 w-full mt-5">
                            <div className="border border-[#CACFD8] relative rounded-lg flex items-center gap-2 w-full sm:w-64 z-10 bg-white px-3 sm:px-5 h-12 sm:h-14">
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 border border-[#DADADA] bg-white rounded-full w-2 h-2"></div>
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border border-[#DADADA] bg-white rounded-full w-2 h-2"></div>
                                <Image
                                    src="/assets/svgs/communication.svg"
                                    alt="communication"
                                    width={20}
                                    height={20}
                                    className="sm:w-6 sm:h-6"
                                />
                                <span className="text-black font-medium text-xs">{t("steps.communication")}</span>
                            </div>
                            <div className="border border-[#CACFD8] relative rounded-lg flex items-center gap-2 w-full sm:w-64 z-10 bg-white px-3 sm:px-5 h-12 sm:h-14">
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 border border-[#DADADA] bg-white rounded-full w-2 h-2"></div>
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border border-[#DADADA] bg-white rounded-full w-2 h-2"></div>
                                <Image
                                    src="/assets/svgs/delivery-date.svg"
                                    alt="delivery-date"
                                    width={20}
                                    height={20}
                                    className="sm:w-6 sm:h-6"
                                />
                                <span className="text-black font-medium text-xs">{t("steps.delivery")}</span>
                            </div>
                            <div className="border border-[#CACFD8] relative rounded-lg flex items-center gap-2 w-full sm:w-64 z-10 bg-white px-3 sm:px-5 h-12 sm:h-14">
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 border border-[#DADADA] bg-white rounded-full w-2 h-2"></div>
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border border-[#DADADA] bg-white rounded-full w-2 h-2"></div>
                                <Image
                                    src="/assets/svgs/double-check.svg"
                                    alt="double-check"
                                    width={20}
                                    height={20}
                                    className="sm:w-6 sm:h-6"
                                />
                                <span className="text-black font-medium text-xs">{t("steps.complete")}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full items-center gap-4 sm:gap-6">
                    <Icons.info_sub_navigation className="w-full sm:w-auto" />
                    <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-6 sm:gap-8">
                        <div className="flex w-full flex-col items-center gap-4 sm:gap-5">
                            <Image
                                src="/assets/svgs/support.svg"
                                alt="support"
                                width={28}
                                height={28}
                                className="sm:w-9 sm:h-9"
                            />
                            <div className="flex flex-col items-center gap-2 sm:gap-3">
                                <span className="font-medium text-strong-950 text-sm sm:text-base">{t("footer.support.title")}</span>
                                <span className="text-sub-600 font-normal text-xs sm:text-sm max-w-sm text-center">{t("footer.support.description")}</span>
                            </div>
                        </div>
                        <div className="flex w-full flex-col items-center gap-4 sm:gap-5">
                            <Image
                                src="/assets/svgs/file.svg"
                                alt="privacy"
                                width={28}
                                height={28}
                                className="sm:w-9 sm:h-9"
                            />
                            <div className="flex flex-col items-center gap-2 sm:gap-3">
                                <span className="font-medium text-strong-950 text-sm sm:text-base">{t("footer.privacy.title")}</span>
                                <span className="text-sub-600 font-normal text-xs sm:text-sm max-w-sm text-center">{t("footer.privacy.description")}</span>
                            </div>
                        </div>
                        <div className="flex w-full flex-col items-center gap-4 sm:gap-5">
                            <Image
                                src="/assets/svgs/cashback.svg"
                                alt="cashback"
                                width={28}
                                height={28}
                                className="sm:w-9 sm:h-9"
                            />
                            <div className="flex flex-col items-center gap-2 sm:gap-3">
                                <span className="font-medium text-strong-950 text-sm sm:text-base">{t("footer.guarantee.title")}</span>
                                <span className="text-sub-600 font-normal text-xs sm:text-sm max-w-sm text-center">{t("footer.guarantee.description")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workflow;