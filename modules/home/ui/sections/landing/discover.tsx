"use client"
import Image from "next/image";
import { useTranslations } from "next-intl";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { cn } from "@/lib/utils";

interface FeatureCard {
    title: string;
    description: string;
    icon: string;
    animation: string;
    isGif?: boolean;
}

const Discover = () => {
    const t = useTranslations("landing.features");
    
    const features: FeatureCard[] = [
        {
            title: t("items.quickAndFree.title"),
            description: t("items.quickAndFree.description"),
            icon: "/assets/svgs/rocket.svg",
            animation: "/assets/gifs/rocket.gif",
            isGif: true
        },
        {
            title: t("items.professional.title"),
            description: t("items.professional.description"),
            icon: "/assets/svgs/certificate.svg",
            animation: "/assets/animations/animations-6.json"
        },
        {
            title: t("items.security.title"),
            description: t("items.security.description"),
            icon: "/assets/svgs/security.svg",
            animation: "/assets/gifs/shield.gif",
            isGif: true
        },
        {
            title: t("items.schedule.title"),
            description: t("items.schedule.description"),
            icon: "/assets/svgs/schedule.svg",
            animation: "/assets/animations/animations-9.json"
        },
        {
            title: t("items.commerce.title"),
            description: t("items.commerce.description"),
            icon: "/assets/svgs/commerce.svg",
            animation: "/assets/animations/animations-7.json"
        }
    ];

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
                    {features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="group p-5 sm:p-6 md:p-8 border border-soft-200 rounded-[20px] bg-white flex flex-col gap-3 sm:gap-4 transition-all duration-300 hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-1 hover:border-gray-200">
                            <div className="flex items-center gap-2">
                                <div className="relative w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 duration-300">
                                        {feature.isGif ? (
                                            <Image
                                                src={feature.animation}
                                                alt={feature.title}
                                                width={50}
                                                height={50}
                                                className={cn("sm:w-[50px] sm:h-[50px] md:w-[54px] md:h-[54px] shrink-0 object-contain scale-[1.55]", feature.animation === "/assets/gifs/rocket.gif" && "-translate-y-[6px]")}
                                            />
                                        ) : (
                                            <DotLottieReact
                                                src={feature.animation}
                                                loop
                                                autoplay
                                                className="w-full h-full scale-[1.55]"
                                            />
                                        )}
                                    </div>
                                    <div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                                        <Image
                                            src={feature.icon}
                                            alt={feature.title}
                                            width={28}
                                            height={28}
                                            className="sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]"
                                        />
                                    </div>
                                </div>
                                <span className="text-strong-950 font-medium text-lg sm:text-xl md:text-2xl">{feature.title}</span>
                            </div>
                            <span className="text-sub-600 text-sm sm:text-base font-normal">{feature.description}</span>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {features.slice(2).map((feature, index) => (
                        <div key={index} className="group p-5 sm:p-6 md:p-8 border border-soft-200 rounded-[20px] bg-white flex flex-col gap-3 sm:gap-4 transition-all duration-300 hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-1 hover:border-gray-200">
                            <div className="flex items-center gap-2">
                                <div className="relative w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {feature.isGif ? (
                                            <Image
                                                src={feature.animation}
                                                alt={feature.title}
                                                width={28}
                                                height={28}
                                                className="sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px] scale-[1.40]"
                                            />
                                        ) : (
                                            <DotLottieReact
                                                src={feature.animation}
                                                loop
                                                autoplay
                                                className="w-full h-full scale-[1.55]"
                                            />
                                        )}
                                    </div>
                                    <div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                                        <Image
                                            src={feature.icon}
                                            alt={feature.title}
                                            width={28}
                                            height={28}
                                            className="sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]"
                                        />
                                    </div>
                                </div>
                                <span className="text-strong-950 font-medium text-lg sm:text-xl md:text-2xl">{feature.title}</span>
                            </div>
                            <span className="text-sub-600 text-sm sm:text-base font-normal">{feature.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Discover;