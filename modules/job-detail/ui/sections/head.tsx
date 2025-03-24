import ReportMessage from "@/components/custom/modals/report-message";
import { Icons } from "@/components/icons";
import { useTranslations } from "next-intl";

const Head = () => {
    const t = useTranslations("jobDetail");
    
    return <div className="w-full h-10 flex items-center justify-between pr-2.5">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <span className="text-xs md:text-sm font-medium text-sub-600">{t("findWorks")}</span>
            <Icons.chevron_short_right className="flex-shrink-0" />
            <span className="text-sub-600 font-medium text-xs md:text-sm">{t("projectDetail")}</span>
        </div>
        <ReportMessage>
            <span className="cursor-pointer flex-shrink-0">
                <Icons.flag_line />
            </span>
        </ReportMessage>
    </div>
}

export default Head;