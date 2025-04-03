import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface OrderItemProps {
    item: any;
}

const OrderItem = ({ item }: OrderItemProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        
        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, []);

    return (
        <div className={cn(
            "flex flex-col w-full items-start p-3 md:p-4 gap-3 md:gap-4 border-b border-soft-200",
            "hover:bg-gray-50 transition-colors duration-200"
        )}>
            <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex flex-col items-start gap-2 md:gap-4 w-full">
                    <p className="text-strong-950 font-medium text-base md:text-xl line-clamp-2">{item.title}</p>
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                        {item.skills.slice(0, 3).map((skill: any, index: number) => (
                            <div key={index} className="bg-white border border-soft-200 rounded-md py-0.5 px-2 h-5 md:h-6 flex items-center justify-center">
                                <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">{skill}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-strong-950 font-normal text-xs md:text-sm line-clamp-3 max-w-full md:max-w-[85%]">{item.description}</p>
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                        <Badge className="flex h-6 md:h-7 items-center gap-0.5 py-1 md:py-1.5 px-2 md:px-3 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                            <Icons.timeline className="size-3 md:size-3.5" /> {item.timeline.daysAgo} days ago
                        </Badge>
                        {item.timeline.deadlineDate && (
                            <Badge className="flex h-6 md:h-7 items-center gap-0.5 py-1 md:py-1.5 px-2 md:px-3 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                                <Icons.calendar_line className="size-3 md:size-3.5" />Deadline date
                            </Badge>
                        )}
                        <Badge className="flex h-6 md:h-7 items-center gap-0.5 py-1 md:py-1.5 px-2 md:px-3 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                            <Icons.users className="size-3 md:size-3.5" /> {item.timeline.sentProposal} sent proposal
                        </Badge>
                        {item.timeline.businessContract && (
                            <Badge className="flex h-6 md:h-7 items-center gap-0.5 py-1 md:py-1.5 px-2 md:px-3 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                                <Icons.group_line_users className="size-3 md:size-3.5" /> Business contract
                            </Badge>
                        )}
                    </div>
                </div>
                <div className={`flex ${isMobile ? 'flex-row justify-between mt-3' : 'gap-4 flex-col items-end'}`}>
                    <div className="flex flex-col gap-1 md:gap-2">
                        <span className="text-[#525866] font-medium text-xs md:text-sm">
                            {item.priceType}
                        </span>
                        <span className="text-strong-950 font-medium text-sm md:text-xl">${typeof item.price === 'number' ? item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : item.price}</span>
                    </div>
                    <Button
                        variant={item.status !== "Apply Now" ? "secondary" : "outline"}
                        size={isMobile ? "sm" : "default"}
                        className={cn(
                            "font-medium text-xs md:text-sm h-8 md:h-10 rounded-[10px] p-2 md:p-2.5",
                            item.status === "Apply Now" ? "border border-soft-200" : "bg-weak-100"
                        )}
                    >
                        {item.status}
                        {item.status === "Apply Now" && <Icons.chevron_short_right className="size-2.5 ml-1" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OrderItem;