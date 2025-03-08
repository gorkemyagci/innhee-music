"use client"
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { ProjectItemProps } from "@/lib/types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const ProjectItem = ({ item }: ProjectItemProps) => {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    // Check screen size when component mounts and when window resizes
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 640);
            setIsTablet(width >= 640 && width < 1024);
        };
        
        // Initial check
        checkScreenSize();
        
        // Add event listener for window resize
        window.addEventListener("resize", checkScreenSize);
        
        // Cleanup
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <div className={cn(
            "flex flex-col w-full items-start p-4 gap-4 border-b border-soft-200",
            "hover:bg-gray-50 transition-colors duration-200"
        )}>
            {/* Header with user info and save button */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <UserAvatar
                        imageUrl={item.clientAvatar}
                        name={item.clientName}
                        className="h-8 w-8 md:h-10 md:w-10"
                    />
                    <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sub-600 font-medium text-xs">{item.clientName}</p>
                            <div className="flex items-center gap-1">
                                <Icons.star />
                                <span className="text-sub-600 font-normal text-xs">{item.rating}({item.reviewCount})</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 md:gap-2.5">
                            <div className="flex items-center gap-1">
                                <Icons.dollar_square className="size-3 md:size-4" />
                                <span className="text-sub-500 text-[10px] md:text-xs font-medium">{item.jobType}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Icons.map className="size-3 md:size-4" />
                                <span className="text-sub-500 text-[10px] md:text-xs font-medium">{item.workType}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Icons.star className="size-3 md:size-4 fill-blue-800" />
                                <span className="text-sub-600 text-[10px] md:text-xs font-medium">{item.specialization}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <Icons.save className="size-4 md:size-5" />
                </Button>
            </div>

            {/* Main content */}
            <div className={cn(
                "w-full",
                (isMobile || isTablet) ? "flex flex-col gap-4" : "flex flex-row items-center justify-between"
            )}>
                {/* Left side - project details */}
                <div className="flex flex-col items-start gap-3 md:gap-4 w-full">
                    <p className="text-strong-950 font-medium text-lg md:text-xl line-clamp-2">{item.title}</p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                        {item.skills.slice(0, isMobile ? 3 : undefined).map((skill, index) => (
                            <div key={index} className="bg-white border border-soft-200 rounded-md py-0.5 px-2 h-5 md:h-6 flex items-center justify-center">
                                <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">{skill}</span>
                            </div>
                        ))}
                        {isMobile && item.skills.length > 3 && (
                            <div className="bg-white border border-soft-200 rounded-md py-0.5 px-2 h-5 flex items-center justify-center">
                                <span className="text-sub-600 font-medium text-[10px] whitespace-nowrap">+{item.skills.length - 3}</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Description - hide on mobile */}
                    {!isMobile && (
                        <p className="text-strong-950 font-normal text-sm line-clamp-2">{item.description}</p>
                    )}
                    
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                        <Badge className="flex items-center gap-0.5 py-1 md:py-1.5 px-2 md:px-3 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                            <Icons.timeline className="size-3 md:size-3.5" /> {item.deadline}
                        </Badge>
                        {!isMobile && (
                            <Badge className="flex items-center gap-0.5 py-1 md:py-1.5 px-2 md:px-3 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                                <Icons.calendar_line className="size-3 md:size-3.5" />Deadline date
                            </Badge>
                        )}
                        <Badge className="flex items-center gap-0.5 py-1 md:py-1.5 px-2 md:px-3 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                            <Icons.users className="size-3 md:size-3.5" /> {item.proposalsSent} sent
                        </Badge>
                    </div>
                </div>

                {/* Right side - price and apply button */}
                <div className={cn(
                    "flex items-center gap-4",
                    isMobile ? "w-full justify-between mt-2" : "flex-col items-end"
                )}>
                    <div className={cn(
                        "flex gap-2",
                        isMobile ? "flex-row items-center" : "flex-col items-end"
                    )}>
                        <span className="text-[#525866] font-medium text-xs md:text-sm">{item.priceType}</span>
                        <span className="text-strong-950 font-medium text-base md:text-xl">${typeof item.price === 'number' ? item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : item.price}</span>
                    </div>
                    <Button 
                        variant="outline" 
                        size={isMobile ? "sm" : "default"}
                        className={cn(
                            "border border-soft-200 text-sub-600 font-medium text-sm",
                            isMobile ? "h-8 rounded-lg px-3" : "h-10 rounded-[10px] p-2.5"
                        )}
                    >
                        Apply Now
                        {pathname === "/find-jobs" && (
                            <Icons.chevron_short_right className="size-2.5 ml-1" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProjectItem;