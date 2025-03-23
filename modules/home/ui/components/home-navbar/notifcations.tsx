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
import { useTranslations } from "next-intl";

interface NotificationsProps {
    children: React.ReactNode;
}

const Notifications = ({ children }: NotificationsProps) => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const t = useTranslations();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[360px] mt-5 py-0 border-soft-200 rounded-2xl z-[99999]" align="end">
                    <div className="py-4 px-5 flex items-center justify-between border-b border-soft-200">
                        <span className="text-strong-950 font-medium">{t("notifications.title")}</span>
                        <span className="text-primary-base font-medium text-sm">{t("notifications.markAllAsRead")}</span>
                    </div>
                    <div className="flex flex-col p-2">
                        <div className="p-3 flex flex-col gap-1 items-start">
                            <p className="text-sub-600 font-medium text-sm">
                                {t("notifications.items.joined", { name: "Wei Chen", project: "Final Presentation" })}
                            </p>
                            <span className="text-sub-600 font-normal text-xs">{t("notifications.timeAgo.minutes", { count: 8 })}</span>
                        </div>
                        <Separator className="bg-soft-200" />
                        <div className="p-3 flex flex-col gap-1 items-start">
                            <p className="text-sub-600 font-medium text-sm">
                                {t("notifications.items.invites", { name: "Sophia Williams", file: "synergy.fig" })}
                            </p>
                            <span className="text-sub-600 font-normal text-xs">{t("notifications.timeAgo.hours", { count: 2 })}</span>
                            <Button variant="outline" className="rounded-lg mt-1.5 border-soft-200 cursor-pointer w-16 h-7 py-1 px-2.5 text-sub-600 font-medium text-sm">{t("notifications.view")}</Button>
                        </div>
                        <Separator className="bg-soft-200" />
                        <div className="p-3 flex flex-col gap-1 items-start">
                            <p className="text-sub-600 font-medium text-sm">
                                {t("notifications.items.uploaded", { name: "Arthur Taylor", file: "arthur.csv" })}
                            </p>
                            <span className="text-sub-600 font-normal text-xs">{t("notifications.timeAgo.hours", { count: 3 })}</span>
                        </div>
                        <Separator className="bg-soft-200" />
                        <div className="p-3 flex flex-col gap-1 items-start">
                            <p className="text-sub-600 font-medium text-sm">
                                {t("notifications.items.commented", { name: "Laura Perez" })}
                            </p>
                            <span className="text-sub-600 font-normal text-xs">{t("notifications.timeAgo.days", { count: 2 })}</span>
                        </div>
                        <Separator className="bg-soft-200" />
                    </div>
                    <div onClick={() => setIsSettingsModalOpen(true)} className="pb-4 pt-3 cursor-pointer px-5 flex justify-end items-center gap-1.5 w-full">
                        <Icons.settings />
                        <span className="text-sub-600 font-medium text-xs">{t("notifications.manage")}</span>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <SettingsModal open={isSettingsModalOpen} setOpen={setIsSettingsModalOpen} />
        </>
    )
}

export default Notifications;