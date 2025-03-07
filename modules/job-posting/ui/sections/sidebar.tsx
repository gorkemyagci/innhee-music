"use client"
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { jobPostingMenu } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { Suspense } from "react";


const SidebarSuspense = () => {
    const [tab, setTab] = useQueryState("tab", { defaultValue: "basic-information" });
    return (
        <div className="w-[264px] bg-weak-50 pt-5 pb-4 px-4 min-h-[calc(100vh-114px)] rounded-[16px] flex flex-col justify-between">
            <div className="flex flex-col gap-4 items-start">
                <span className="text-soft-400 text-xs font-medium">Transfer Sequence</span>
                <div className="flex flex-col items-start gap-2 w-full">
                    {jobPostingMenu.map((item, index) => (
                        <div key={index} onClick={() => setTab(item.value)} className={cn("flex items-center justify-between p-2 cursor-pointer hover:bg-white gap-2.5 rounded-[10px] h-9 w-full group", {
                            "bg-white": tab === item.value,
                        })}>
                            <div className="flex items-center gap-2.5">
                                <span className={cn("w-5 h-5 rounded-full bg-white group-hover:bg-[#525866] group-hover:text-white transition-all duration-100 flex items-center justify-center p-0.5 text-sub-600 font-medium text-xs", {
                                    "bg-[#525866] text-white": tab === item.value,
                                })}>
                                    {item.id}
                                </span>
                                <span className={cn("text-sm font-medium text-sub-600 group-hover:text-strong-950 transition-all duration-100", {
                                    "text-strong-950": tab === item.value,
                                })}>{item.title}</span>
                            </div>
                            <span className={cn("opacity-0 group-hover:opacity-100 transition-all duration-100", {
                                "opacity-100": tab === item.value,
                            })}> <Icons.chevron_short_right /></span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center gap-4">
                <span className="text-sub-600 font-normal text-sm">Having touble with transfer?</span>
                <Button className="bg-white w-full h-10 rounded-[10px] flex items-center gap-1 text-sm text-sub-600 font-medium">
                    <Icons.headphone />
                    Contact</Button>
            </div>
        </div>
    )
}

const Sidebar = () => {
    return (
        <Suspense fallback={<></>}>
            <SidebarSuspense />
        </Suspense>
    )
}

export default Sidebar;