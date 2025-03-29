"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { useTranslations } from "next-intl";
import Link from "next/link";

const UserHead = ({ user, chatRoomId }: { user: any, chatRoomId: string }) => {
    const t = useTranslations("orderDetails.userHead");
    return (
        <div className="w-full p-4 border border-soft-200 rounded-[12px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-[18px]">
            <div className="flex flex-row items-center gap-2 md:gap-3">
                <UserAvatar
                    imageUrl="/assets/images/avatar-4-1.png"
                    name="Cleve Music"
                    className="w-12 md:w-20 h-12 md:h-20 shrink-0 p-0.5"
                />
                <div className="flex flex-col items-start gap-1">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-1">
                        <span className="text-surface-700 font-medium text-base md:text-lg">{user?.nickname || "Unknown"}</span>
                        <div className="flex items-center gap-0.5">
                            <Icons.star />
                            <span className="text-sub-600 font-normal text-xs">{t("rating")}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                        <Icons.google />
                        <Icons.google />
                        <Icons.google />
                        <span className="text-sub-600 font-medium text-xs">{t("special")}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
                <Link href={`/chat?chatId=${chatRoomId}`}>
                    <Button variant="outline" className="flex-1 md:flex-none rounded-lg h-9 bg-white border-soft-200 flex items-center justify-center text-sub-600 font-medium text-sm">Message</Button>
                </Link>
                <Button variant="outline" className="w-9 h-9 rounded-lg border-soft-200 flex items-center justify-center">
                    <Icons.more />
                </Button>
            </div>
        </div>
    )
}

export default UserHead;