import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { timelineData } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface MilestoneItemProps {
    item: {
        status: string;
        title: string;
        amount: number;
        description?: string;
        date: string;
    };
    index: number;
}

const MilestoneItem = ({ item, index }: MilestoneItemProps) => {
    return (
        <div key={index} className="flex relative items-center w-full justify-between">
            <div className="flex relative flex-row items-center gap-3">
                {item.status === "completed" && (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0FAEC]">
                        <Icons.check_line />
                    </div>
                )}
                <Icons.line_item className="absolute top-full -translate-y-2 left-0 translate-x-2.5" />
                {item.status === "pending" && (
                    <div className={cn(
                        "flex items-center border-2 justify-center w-5 h-5 rounded-full bg-white",
                        index > 0 && timelineData[index - 1].status === "completed"
                            ? "border-sub-600"
                            : "border-soft-400"
                    )}>
                        <Icons.chat_history_line_vector className={cn("translate-x-[1px] -translate-y-[0.5px]", index > 0 && timelineData[index - 1].status !== "completed" && "stroke-soft-400")} />
                    </div>
                )}
                <div className="flex flex-col items-start gap-1">
                    <span className="text-strong-950 font-medium text-sm">{item.title}</span>
                    <span className="text-strong-950 font-normal text-xs">${item.amount} {item?.description || ""}</span>
                </div>
            </div>
            {item.date !== null && (
                <span className="text-sub-600 font-normal text-xs">{item.date}</span>
            )}
            {index > 1 && timelineData[index - 1].status === "completed" && (
                <Button variant="outline" className="text-strong-950 font-normal text-sm py-1 px-2 rounded-md h-7">Confirm Payment</Button>
            )}
        </div>
    )
}

export default MilestoneItem;