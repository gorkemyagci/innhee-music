"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import moment from "moment";
import { useTranslations } from "next-intl";

interface MilestoneItemProps {
    item: {
        id: string;
        title: string;
        amount: number;
        amountCurrency: string;
        description?: string;
        deadline: string;
        completed: boolean;
        paid: boolean;
        createdAt: string;
        updatedAt: string;
    };
    index: number;
    previousMilestone?: MilestoneItemProps['item'];
}

const MilestoneItem = ({ item, index, previousMilestone }: MilestoneItemProps) => {
    const t = useTranslations("orderDetails.milestoneItem");
    
    return (
        <div key={index} className="flex relative items-center w-full justify-between">
            <div className="flex relative flex-row items-center gap-3">
                {item.completed && (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0FAEC]">
                        <Icons.check_line />
                    </div>
                )}
                <Icons.line_item className="absolute top-full -translate-y-2 left-0 translate-x-2.5" />
                {!item.completed && (
                    <div className={cn(
                        "flex items-center border-2 justify-center w-5 h-5 rounded-full bg-white",
                        previousMilestone?.completed
                            ? "border-sub-600"
                            : "border-soft-400"
                    )}>
                        <Icons.chat_history_line_vector className={cn("translate-x-[1px] -translate-y-[0.5px]", !previousMilestone?.completed && "stroke-soft-400")} />
                    </div>
                )}
                <div className="flex flex-col items-start gap-1">
                    <span className="text-strong-950 font-medium text-sm">{item.title}</span>
                    <span className="text-strong-950 font-normal text-xs">${item.amount} {item.amountCurrency} {item?.description || ""}</span>
                </div>
            </div>
            {item.createdAt !== null && !item.completed && (
                <span className="text-sub-600 font-normal text-xs">{moment(item.deadline).format("DD MMM, YYYY")}</span>
            )}
            {previousMilestone?.completed && item.completed && (
                <Button variant="outline" className="text-strong-950 font-normal text-sm py-1 px-2 rounded-md h-7">{t("confirmPayment")}</Button>
            )}
        </div>
    )
}

export default MilestoneItem;