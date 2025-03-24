import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { FaFacebook, FaLinkedin, FaDropbox } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useTranslations } from "next-intl";

const Share = ({ loggedIn = false }: { loggedIn?: boolean }) => {
    const t = useTranslations("referral.share");
    
    return (
        <div className="w-full flex flex-col gap-4 md:gap-5 px-4 md:px-8 lg:px-0">
            <div className={cn("flex flex-col gap-2", {
                "items-start": !loggedIn,
                "items-center": loggedIn
            })}>
                <p className="text-strong-950 font-medium text-lg md:text-xl">{t("title")}</p>
                <span className="text-neutral-500 font-medium text-xs md:text-sm text-left">{t("subtitle")}</span>
            </div>
            <div className={cn("w-full flex flex-col md:flex-row items-start md:items-center", {
                "md:gap-10 lg:gap-40": !loggedIn,
                "gap-4 md:gap-6 lg:gap-10": loggedIn
            })}>
                <div className={cn("flex flex-col items-start gap-2 w-full", {
                    "bg-weak-50 p-4 rounded-2xl": loggedIn,
                })}>
                    <p className="text-strong-950 font-medium text-xs md:text-sm">{t("referralLink")}</p>
                    <div className="border border-soft-200 w-full rounded-xl px-2 bg-white h-9 md:h-10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Icons.links className="size-4 md:size-5" />
                            <span className="text-soft-400 text-xs md:text-sm">{t("placeholder")}</span>
                        </div>
                        <div className="cursor-pointer">
                            <Icons.copy className="size-4 md:size-5" />
                        </div>
                    </div>
                </div>
                <div className={cn("flex flex-col mt-4 md:mt-0 items-start gap-2 md:gap-3 w-full md:w-auto", {
                    "bg-weak-50 p-4 rounded-2xl": loggedIn,
                })}>
                    <p className="text-strong-950 font-medium text-xs md:text-sm">{t("shareVia")}</p>
                    <div className="flex items-center gap-3 md:gap-5 w-full justify-start">
                        <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center shadow-sm rounded-xl">
                            <FaFacebook className="size-4 md:size-5 fill-[#0062E0]" />
                        </div>
                        <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center shadow-sm rounded-xl">
                            <FaLinkedin className="size-4 md:size-5 fill-[#0077B5]" />
                        </div>
                        <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center shadow-sm rounded-xl">
                            <FaXTwitter className="size-4 md:size-5 fill-[#010101]" />
                        </div>
                        <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center shadow-sm rounded-xl">
                            <FaDropbox className="size-4 md:size-5 fill-[#0061ff]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share;