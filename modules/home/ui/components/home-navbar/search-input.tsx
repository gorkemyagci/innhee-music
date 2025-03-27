"use client";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const SearchInput = () => {
    const t = useTranslations("header");
    const router = useRouter();

    return (
        <div 
            onClick={() => router.push("/find-jobs?tab=projects")}
            className="bg-white border border-[#E1E4EA] rounded-xl w-[220px] h-10 flex items-center pl-3 pr-2.5 py-2.5 cursor-pointer hover:border-[#DA6733] transition-colors"
        >
            <Icons.search />
            <Input 
                className="bg-transparent shadow-none border-none placeholder:text-[#99A0AE] focus-visible:ring-0 focus-visible:ring-offset-0 pointer-events-none" 
                placeholder={t("search.placeholder")} 
            />
        </div>
    );
}

export default SearchInput;