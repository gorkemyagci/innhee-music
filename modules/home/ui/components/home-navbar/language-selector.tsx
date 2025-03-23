"use client"
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const LanguageSelector = () => {
    const pathname = usePathname();
    const locale = useLocale();
    const handleLanguageChange = (newLocale: string) => {
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
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                    <Icons.global className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[120px] border-soft-200">
                <DropdownMenuItem className="cursor-pointer" onClick={() => handleLanguageChange("us")}>
                    <span className="mr-2">🇺🇸</span>
                    {locale === "zh" ? "美国" : "USA"}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => handleLanguageChange("zh")}>
                    <span className="mr-2">🇨🇳</span>
                    {locale === "us" ? "China" : "中国"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSelector; 