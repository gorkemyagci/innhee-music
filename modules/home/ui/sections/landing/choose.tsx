"use client"
import React from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface Feature {
    id: string;
    title: string;
    description: string;
    chinaDescription?: string;
    icon: React.ReactElement;
    animation: string;
}

const Choose = () => {
    const t = useTranslations("landing.choose");
    const locale = useLocale();
    const isChinese = locale === "zh";

    const features = [
        {
            id: "1",
            title: t("cards.gathering.title"),
            description: "",
            chinaDescription: "各类风格，完善的实录条件与能力，提供您最需要的声音",
            icon: <Icons.post_your_audio className="shrink-0" />,
            animation: "/assets/animations/animations-2.json"
        },
        {
            id: "2",
            title: t("cards.production.title"),
            description: t("cards.production.description"),
            icon: <Icons.creative className="shrink-0" />,
            animation: "/assets/animations/animations-1.json"
        },
        {
            id: "3",
            title: t("cards.songPost.title"),
            description: "",
            chinaDescription: "按需匹配的一切音视频相关混音、后期。",
            icon: <Icons.mixer className="shrink-0" />,
            animation: "/assets/animations/animations-4.json"
        },
        {
            id: "4",
            title: t("cards.hardware.title"),
            description: t("cards.hardware.description"),
            icon: <Icons.air_conditioning className="shrink-0" />,
            animation: "/assets/animations/animations-3.json"
        }
    ];

    return <div className="max-w-[1200px] py-20 mx-auto flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3">
            <h3 className="text-strong-950 text-[2.5rem] font-medium">{t("title")}</h3>
        </div>
        <div className="w-full max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-disabled-300 border-b py-6">
                {features.map((item: Feature, index: number) => (
                    <div
                        key={index}
                        className={cn(
                            "group flex flex-col items-start gap-4 sm:gap-6 px-4 sm:px-6",
                            "sm:border-r border-disabled-300 last:border-r-0",
                        )}
                    >
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <DotLottieReact
                                    src={item.animation}
                                    loop
                                    autoplay
                                    className="w-full h-full scale-[1.32]"
                                />
                            </div>
                            <div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                                {item.icon}
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-2 sm:gap-3">
                            <h6 className="text-strong-950 font-medium text-lg sm:text-xl">{item.title}</h6>
                            {item.description && <p className="text-sub-600 text-xs sm:text-sm md:text-[13.5px] font-normal">{item.description}</p>}
                            {item.chinaDescription && (
                                <p className="text-sub-600 text-xs sm:text-sm md:text-[13.5px] font-normal">
                                    {isChinese ? item.chinaDescription : item.description}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default Choose;