"use client";

import { Icons } from "@/components/icons";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
    const t = useTranslations("auth.layout");
    const locale = useLocale();
    const pathname = usePathname();


    const handleLanguageChange = () => {
        const newLocale = locale === "us" ? "zh" : "us";
        const segments = pathname.split('/');
        if (segments[1] === 'us' || segments[1] === 'zh') {
            segments[1] = newLocale;
        } else {
            segments.splice(1, 0, newLocale);
        }
        const newPath = segments.join('/');
        window.location.href = newPath;
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="focus:outline-none focus-within:outline-none focus:ring-0">
                <button className="flex items-center gap-1 md:gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
                    <Icons.global className="size-4 md:size-5" />
                    <span className="text-sub-600 text-xs md:text-sm font-normal flex items-center gap-0">
                        {t("language")}
                        <Icons.dropdown className="size-3 md:size-4" />
                    </span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[120px] border-soft-200">
                <DropdownMenuItem
                    onClick={() => handleLanguageChange()}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <Image
                        src="/assets/svgs/usa-flag.svg"
                        alt="USA Flag"
                        width={16}
                        height={16}
                        className="size-4"
                    />
                    <span>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleLanguageChange()}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <Image
                        src="/assets/svgs/china-flag.svg"
                        alt="China Flag"
                        width={16}
                        height={16}
                        className="size-4"
                    />
                    <span>中文</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSwitcher; 