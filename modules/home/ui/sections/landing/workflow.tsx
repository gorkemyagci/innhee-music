"use client"
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface Step {
    title: string;
    icon: string;
    animation: string;
}

interface FooterFeature {
    title: string;
    description: string;
    icon: string;
    animation: string;
}

const Workflow = () => {
    const t = useTranslations("landing.workflow");
    
    const steps: Step[] = [
        {
            title: t("steps.communication"),
            icon: "/assets/svgs/communication.svg",
            animation: "/assets/animations/animations-8.json"
        },
        {
            title: t("steps.delivery"),
            icon: "/assets/svgs/delivery-date.svg",
            animation: "/assets/animations/animations-12.json"
        },
        {
            title: t("steps.complete"),
            icon: "/assets/svgs/double-check.svg",
            animation: "/assets/animations/animations-15.json"
        }
    ];

    const footerFeatures: FooterFeature[] = [
        {
            title: t("footer.support.title"),
            description: t("footer.support.description"),
            icon: "/assets/svgs/support.svg",
            animation: "/assets/animations/animations-5.json"
        },
        {
            title: t("footer.privacy.title"),
            description: t("footer.privacy.description"),
            icon: "/assets/svgs/file.svg",
            animation: "/assets/animations/animations-11.json"
        },
        {
            title: t("footer.guarantee.title"),
            description: t("footer.guarantee.description"),
            icon: "/assets/svgs/cashback.svg",
            animation: "/assets/animations/animations-10.json"
        }
    ];

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
                    <Icons.info_navigation className="w-full sm:w-[70%]" />
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
                            {steps.map((step, index) => (
                                <div key={index} className="group border border-[#CACFD8] relative rounded-lg flex items-center justify-center gap-2 w-full sm:w-64 z-10 bg-white px-3 sm:px-5 h-12 sm:h-14 transition-all duration-300 hover:bg-gray-50">
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 border border-[#DADADA] bg-white rounded-full w-2 h-2"></div>
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border border-[#DADADA] bg-white rounded-full w-2 h-2"></div>
                                    <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <DotLottieReact
                                                src={step.animation}
                                                loop
                                                autoplay
                                                className="w-full h-full scale-[1.55]"
                                            />
                                        </div>
                                        <div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                                            <Image
                                                src={step.icon}
                                                alt={step.title}
                                                width={20}
                                                height={20}
                                                className="sm:w-6 sm:h-6"
                                            />
                                        </div>
                                    </div>
                                    <span className="text-black font-medium text-xs">{step.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full items-center gap-4 sm:gap-6">
                    <Icons.info_sub_navigation className="w-full sm:w-auto" />
                    <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-6 sm:gap-8">
                        {footerFeatures.map((feature, index) => (
                            <div key={index} className="group flex w-full flex-col items-center gap-4 sm:gap-5">
                                <div className="relative w-7 h-7 sm:w-9 sm:h-9">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <DotLottieReact
                                            src={feature.animation}
                                            loop
                                            autoplay
                                            className="w-full h-full scale-[1.55]"
                                        />
                                    </div>
                                    <div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                                        <Image
                                            src={feature.icon}
                                            alt={feature.title}
                                            width={28}
                                            height={28}
                                            className="sm:w-9 sm:h-9"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-2 sm:gap-3">
                                    <span className="font-medium text-strong-950 text-sm sm:text-base">{feature.title}</span>
                                    <span className="text-sub-600 font-normal text-xs sm:text-sm max-w-sm text-center">{feature.description}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workflow;