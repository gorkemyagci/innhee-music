import React from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Feature {
    id: string;
    title: string;
    description: string;
    icon: React.ReactElement;
}

const Choose = () => {
    const t = useTranslations("landing.choose");
    const features = [
        {
            id: "1",
            title: t("cards.gathering.title"),
            description: "",
            icon: <Icons.post_your_audio className="shrink-0" />
        },
        {
            id: "2",
            title: t("cards.production.title"),
            description: t("cards.production.description"),
            icon: <Icons.creative className="shrink-0" />
        },
        {
            id: "3",
            title: t("cards.songPost.title"),
            description: "",
            icon: <Icons.mixer className="shrink-0" />
        },
        {
            id: "4",
            title: t("cards.hardware.title"),
            description: t("cards.hardware.description"),
            icon: <Icons.air_conditioning className="shrink-0" />
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
                            "flex flex-col items-start gap-4 sm:gap-6 px-4 sm:px-6",
                            "sm:border-r border-disabled-300 last:border-r-0",
                        )}
                    >
                        {item.icon}
                        <div className="flex flex-col items-start gap-2 sm:gap-3">
                            <h6 className="text-strong-950 font-medium text-lg sm:text-xl">{item.title}</h6>
                            {item.description && <p className="text-sub-600 text-xs sm:text-sm md:text-[13.5px] font-normal">{item.description}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default Choose;