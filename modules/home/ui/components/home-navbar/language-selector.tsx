"use client"
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";

const LanguageSelector = () => {
    const pathname = usePathname();
    const locale = useLocale();

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
        <button
            onClick={handleLanguageChange}
            className="flex items-center justify-center w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity"
        >
            <Image
                src={locale === "us" ? "/assets/svgs/china-flag.svg" : "/assets/svgs/usa-flag.svg"}
                alt={locale === "us" ? "Switch to Chinese" : "Switch to English"}
                width={24}
                height={24}
                className="rounded-full"
            />
        </button>
    );
};

export default LanguageSelector; 