"use client"
import ApplyJob from "@/components/custom/modals/apply-job";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { ProjectItemType } from "@/lib/types";
import moment from "moment";
import { useTranslations } from "next-intl";

const Info = ({ item }: { item: ProjectItemType }) => {
    const t = useTranslations("jobDetail.info");
    return <div className="border w-full border-soft-200 rounded-[20px] bg-white shadow-sm p-4 md:p-5 flex flex-col items-center gap-4 md:gap-5">
        <div className="border-b border-soft-200 pb-4 md:pb-5 w-full relative flex flex-col items-center gap-2">
            <div className="absolute top-0 right-0">
                <Icons.heart className="cursor-pointer" />
            </div>
            <div className="flex flex-col items-center gap-1">
                <UserAvatar
                    imageUrl="/assets/images/Avatar-4.png"
                    name="John Doe"
                    className="w-16 h-16 md:w-18 md:h-18 p-0.5 shrink-0"
                />
                <p className="text-[#0d0d10] font-medium text-base">{item?.employer.nickname || t("unknown")}</p>
                <div className="flex items-center gap-0.5">
                    <Icons.star />
                    <span className="text-sub-600 font-normal text-xs">{t("rating")}</span>
                </div>
            </div>
            <div className="flex items-center gap-2.5 pt-1">
                <div className="flex items-center gap-1">
                    <Icons.google className="size-3.5 md:size-4" />
                    <span className="text-sub-600 text-xs font-medium">Google</span>
                </div>
                <div className="flex items-center gap-1">
                    <Icons.google className="size-3.5 md:size-4" />
                    <span className="text-sub-600 text-xs font-medium">Google</span>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-start gap-3 w-full">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5">
                    <Icons.exchange_cny_fill />
                    <p className="text-sub-600 font-normal text-sm">{t("budget")}</p>
                </div>
                <span className="text-strong-950 font-medium text-xl md:text-2xl">${item?.salary}</span>
            </div>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5">
                    <Icons.time_line />
                    <p className="text-sub-600 font-normal text-sm">{t("releaseTime")}</p>
                </div>
                <span className="text-sub-600 font-medium text-sm">3 hours</span>
            </div>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5">
                    <Icons.calendar_line className="fill-sub-600 size-4.5" />
                    <p className="text-sub-600 font-normal text-sm">{t("deadline")}</p>
                </div>
                <span className="text-sub-600 font-medium text-sm">{moment(item?.deadline).format("MMM DD, YYYY")}</span>
            </div>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5">
                    <Icons.group_line_users className="fill-sub-600 size-4.5" />
                    <p className="text-sub-600 font-normal text-sm">{t("proposals")}</p>
                </div>
                <span className="text-sub-600 font-medium text-sm">5</span>
            </div>
        </div>
        <div className="flex items-center w-full gap-3">
            <Button variant="outline" className="h-9 flex-1 border-soft-200 rounded-lg bg-white flex items-center justify-center gap-1.5 text-sub-600 font-medium text-xs md:text-sm">
                {t("message")} <Icons.send className="flex-shrink-0" />
            </Button>
            <ApplyJob jobId={item?.id}>
                <Button
                    type="button"
                    className="h-9 flex-1 disabled:cursor-auto group rounded-lg text-white text-xs md:text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                    <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                    {t("apply")} <Icons.chevron_short_right className="fill-white size-3 flex-shrink-0" />
                </Button>
            </ApplyJob>
        </div>
    </div>
}

export default Info;