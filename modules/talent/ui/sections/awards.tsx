import { useTranslations } from "next-intl";

const Awards = () => {
    const t = useTranslations("talent.awards");

    return (
        <div className="p-4 flex flex-col items-start gap-3">
            <span className="text-main-900 font-medium text-xs">{t("title")}</span>
            <div className="flex flex-wrap w-full gap-2">
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    {t("items.grammy")}
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    {t("items.billboardMusic")}
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    {t("items.americanMusic")}
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    {t("items.brit")}
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    {t("items.mtvMusic")}
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    {t("items.eurovisionAwards")}
                </div>
            </div>
        </div>
    )
}

export default Awards;