import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const Footer = async () => {
    const t = await getTranslations("Footer");
    return (
        <footer className="w-full max-w-[1200px] bg-white flex flex-col items-center gap-4 md:gap-6">
            <div className="w-full px-4 md:px-6 xl:px-5 flex flex-col lg:flex-row items-start gap-8 lg:gap-0 lg:pb-3 lg:justify-between mx-auto pt-8 md:pt-10">
                <div className="flex flex-col items-start gap-3 w-full lg:max-w-lg">
                    <Icons.logo />
                    <span className="text-black text-base md:text-lg font-light">{t("description")}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full lg:w-auto">
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="text-strong-950 font-medium text-base md:text-lg tracking-tight">{t("title")}</span>
                        <ul className="flex flex-col items-start gap-3 md:gap-4">
                            <li className="text-sub-600 font-medium text-xs md:text-sm">
                                <Link href="#">
                                    {t("Contact")}
                                </Link>
                            </li>
                            <li className="text-sub-600 font-medium text-xs md:text-sm">
                                <Link href="#">
                                    {t("HelpCenter")}
                                </Link>
                            </li>
                            <li className="text-sub-600 font-medium text-xs md:text-sm">
                                <Link href="#">
                                    {t("PrivacyPolicy")}
                                </Link>
                            </li>
                            <li className="text-sub-600 font-medium text-xs md:text-sm">
                                <Link href="#">
                                    {t("Terms")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="text-strong-950 font-medium text-base md:text-lg tracking-tight">{t("title_buyers")}</span>
                        <ul className="flex flex-col items-start gap-3 md:gap-4">
                            <li className="text-sub-600 font-medium text-xs md:text-sm">
                                <Link href="#">
                                    {t("FindWorker")}
                                </Link>
                            </li>
                            <li className="text-sub-600 font-medium text-xs md:text-sm">
                                <Link href="#">
                                    {t("FindServices")}
                                </Link>
                            </li>
                            <li className="text-sub-600 font-medium text-xs md:text-sm">
                                <Link href="#">
                                    {t("FindProjects")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="text-strong-950 font-medium text-base md:text-lg tracking-tight">For Workers</span>
                        <ul className="flex flex-col items-start gap-3 md:gap-4">
                            <li className="text-sub-600 font-medium text-xs md:text-sm">
                                <Link href="#">
                                    {t("FindWorker")}
                                </Link>
                            </li>
                            <li className="text-sub-600 font-medium text-xs md:text-sm">
                                <Link href="#">
                                    {t("FindServices")}
                                </Link>
                            </li>
                            <li className="text-sub-600 font-medium text-xs md:text-sm">
                                <Link href="#">
                                    {t("ApplyForCertification")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="text-strong-950 font-medium text-base md:text-lg tracking-tight">{t("SocialMedia")}</span>
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-weak-50 flex items-center justify-center">
                                <Icons.instagram className="size-4 md:size-[18px] fill-sub-600" />
                            </div>
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-weak-50 flex items-center justify-center">
                                <Icons.dribble className="size-4 md:size-[18px] fill-sub-600" />
                            </div>
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-weak-50 flex items-center justify-center">
                                <Icons.youtube className="size-4 md:size-[18px] fill-sub-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Separator className="bg-soft-200" />
            <div className="pb-8 md:pb-10 pt-3 md:pt-4 w-full flex items-center justify-center px-4 text-center">
                <span className="text-soft-400 text-xs md:text-sm font-normal">{t("copyright")}</span>
            </div>
        </footer>
    )
}

export default Footer;