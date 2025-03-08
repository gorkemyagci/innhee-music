"use client"
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { ProjectItemProps } from "@/lib/types";
import { usePathname } from "next/navigation";

const ProjectItem = ({ item }: ProjectItemProps) => {
    const pathname = usePathname();
    return (
        <div className="flex flex-col w-full items-start p-4 gap-4">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <UserAvatar
                        imageUrl={item.clientAvatar}
                        name={item.clientName}
                    />
                    <div className="flex flex-col items-start gap-1.5">
                        <div className="flex items-center gap-2">
                            <p className="text-sub-600 font-medium text-xs">{item.clientName}</p>
                            <div className="flex items-center gap-1">
                                <Icons.star />
                                <span className="text-sub-600 font-normal text-xs">{item.rating}({item.reviewCount})</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="flex items-center gap-1">
                                <Icons.dollar_square className="size-3.5 md:size-4" />
                                <span className="text-sub-500 text-[10px] md:text-xs font-medium">{item.jobType}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Icons.map className="size-3.5 md:size-4" />
                                <span className="text-sub-500 text-[10px] md:text-xs font-medium">{item.workType}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Icons.star className="size-3.5 md:size-4 fill-blue-800" />
                                <span className="text-sub-600 text-[10px] md:text-xs font-medium">{item.specialization}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Icons.save className="size-5" />
            </div>
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-col items-start gap-4">
                    <p className="text-strong-950 font-medium text-xl">{item.title}</p>
                    <div className="flex flex-wrap items-center gap-2">
                        {item.skills.map((skill, index) => (
                            <div key={index} className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 flex items-center justify-center">
                                <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">{skill}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-strong-950 font-normal text-sm line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge className="flex items-center gap-0.5 py-1.5 md:py-2 px-3 md:px-4 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                            <Icons.timeline className="size-3 md:size-3.5" /> {item.deadline}
                        </Badge>
                        <Badge className="flex items-center gap-0.5 py-1.5 md:py-2 px-3 md:px-4 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                            <Icons.calendar_line className="size-3 md:size-3.5" />Deadline date
                        </Badge>
                        <Badge className="flex items-center gap-0.5 py-1.5 md:py-2 px-3 md:px-4 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                            <Icons.users className="size-3 md:size-3.5" /> {item.proposalsSent} sent
                        </Badge>
                    </div>
                </div>
                <div className="flex flex-col gap-4 items-end">
                    <div className="flex flex-col gap-2 items-end">
                        <span className="text-[#525866] font-medium text-sm">{item.priceType}</span>
                        <span className="text-strong-950 font-medium text-xl">${typeof item.price === 'number' ? item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : item.price}</span>
                    </div>
                    <Button variant="outline" className="h-10 rounded-[10px] p-2.5 border border-soft-200 text-sub-600 font-medium text-sm">Apply Now
                        {pathname === "/find-jobs" && (
                            <Icons.chevron_short_right className="size-2.5" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProjectItem;