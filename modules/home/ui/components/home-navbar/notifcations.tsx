"use client"
import SettingsModal from "@/components/custom/modals/settings";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface NotificationsProps {
    children: React.ReactNode;
}

const Notifications = ({ children }: NotificationsProps) => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[360px] mt-4 py-0 border-soft-200 rounded-2xl z-50" align="end">
                    <div className="py-4 px-5 flex items-center justify-between border-b border-soft-200">
                        <span className="text-strong-950 font-medium">Notifications</span>
                        <span className="text-primary-base font-medium text-sm">Mark all as read</span>
                    </div>
                    <div className="flex flex-col p-2">
                        <div className="p-3 flex flex-col gap-1 items-start">
                            <p className="text-sub-600 font-medium text-sm"><span className="text-strong-950 font-medium">Wei Chen</span> joined to <span className="text-strong-950 font-medium">Final Presentation</span></p>
                            <span className="text-sub-600 font-normal text-xs">8 min ago</span>
                        </div>
                        <Separator className="bg-soft-200" />
                        <div className="p-3 flex flex-col gap-1 items-start">
                            <p className="text-sub-600 font-medium text-sm"><span className="text-strong-950 font-medium">Sophia Williams</span> invvites you <span className="text-strong-950 font-medium">synergy.fig</span> file with you</p>
                            <span className="text-sub-600 font-normal text-xs">2 hours ago</span>
                            <Button variant="outline" className="rounded-lg border-soft-200 cursor-pointer w-16 h-7 py-1 px-2.5 text-sub-600 font-medium text-sm">View</Button>
                        </div>
                        <Separator className="bg-soft-200" />
                        <div className="p-3 flex flex-col gap-1 items-start">
                            <p className="text-sub-600 font-medium text-sm"><span className="text-strong-950 font-medium">Arthur Taylor</span> uploaded an <span className="text-strong-950 font-medium">arthur.csv</span></p>
                            <span className="text-sub-600 font-normal text-xs">3 hours ago</span>
                        </div>
                        <Separator className="bg-soft-200" />
                        <div className="p-3 flex flex-col gap-1 items-start">
                            <p className="text-sub-600 font-medium text-sm"><span className="text-strong-950 font-medium">Laura Perez</span> commented on your post</p>
                            <span className="text-sub-600 font-normal text-xs">2 days ago</span>
                        </div>
                        <Separator className="bg-soft-200" />
                    </div>
                    <div onClick={() => setIsSettingsModalOpen(true)} className="pb-4 pt-3 cursor-pointer px-5 flex justify-end items-center gap-1.5 w-full">
                        <Icons.settings />
                        <span className="text-sub-600 font-medium text-xs">Manage</span>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <SettingsModal open={isSettingsModalOpen} setOpen={setIsSettingsModalOpen} />
        </>
    )
}

export default Notifications;