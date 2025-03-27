"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";
import About from "@/modules/dashboard/ui/sections/sidebar/about";
import Skills from "@/modules/dashboard/ui/sections/sidebar/skills";
import Awards from "./awards";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const Sidebar = ({ data, isOwner }: { data: any, isOwner: boolean }) => {
    const t = useTranslations("talent.sidebar");
    const { user: currentAuthUser, initializeFromToken } = useAuthStore();
    const router = useRouter();
    useEffect(() => {
        initializeFromToken();
    }, [initializeFromToken]);
    const create = trpc.chat.createRoom.useMutation({
        onSuccess: (response) => {
            const roomId = response.id;
            router.push(`/chat?chatId=${roomId}`);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    const createRoom = async () => {
        await create.mutate({
            userIds: [data?.id]
        });
    };
    return <div className="w-full md:w-[352px] shrink-0 min-h-[calc(100vh-120px)] shadow-sm bg-white border border-soft-200 rounded-[20px] pb-6">
        <div className="p-4 relative flex flex-col items-center gap-5">
            <div className="flex flex-col items-center gap-2">
                {!isOwner && (
                    <Icons.heart className="absolute top-4 right-4 size-5 cursor-pointer" />
                )}
                <div className="flex flex-col items-center gap-1">
                    <UserAvatar
                        imageUrl="/assets/images/avatar2.png"
                        name={data?.user?.nickname}
                        className="w-20 h-20 shrink-0 p-0.5"
                    />
                    <p className="text-base font-medium text-sub-600">{data?.user?.nickname || t("unknown")}</p>
                    <div className="flex items-center gap-0.5">
                        <Icons.star />
                        <span className="text-sub-600 font-normal text-xs">4.9(125)</span>
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
            </div>
            {!isOwner && (
                <div className="flex items-center gap-5">
                    <Button variant="outline" className="w-[69px] h-8 border-soft-200 rounded-lg bg-white flex items-center gap-1.5 text-sub-600 font-medium text-sm">
                        {t("hire")} <Icons.chevron_short_right className="fill-sub-600 size-3" />
                    </Button>
                    <Button
                        type="button"
                        onClick={createRoom}
                        className="w-[83px] h-8 disabled:cursor-auto group rounded-lg text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                        <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                        {t("touch")} <Icons.send className="stroke-white" />
                    </Button>
                </div>
            )}
            <div className="flex items-center w-full justify-between">
                <div className="flex items-center gap-1.5">
                    <Icons.profile_star />
                    <span className="text-main-900 font-normal text-sm">{t("recentReviews")}</span>
                </div>
                <div className="bg-white rounded-full py-0.5 pr-2.5 pl-0.5 flex items-center shadow-sm">
                    <UserAvatar
                        imageUrl="/assets/images/avatar-3.png"
                        name={t("userName")}
                        className="w-8 h-8 border-2 border-white"
                    />
                    <UserAvatar
                        imageUrl="/assets/images/Avatar-5.png"
                        name={t("userName")}
                        className="w-8 h-8 border-2 border-white -translate-x-2"
                    />
                    <UserAvatar
                        imageUrl="/assets/images/Avatar-6.png"
                        name={t("userName")}
                        className="w-8 h-8 border-2 border-white -translate-x-4"
                    />
                    <span className="text-sub-600 font-normal text-sm -translate-x-1">+4</span>
                </div>
            </div>
        </div>
        <Separator className="bg-soft-200" />
        {data?.skills && (
            <>
                <Skills edit={false} skills={data?.skills} />
                <Separator className="bg-soft-200" />
            </>
        )}
        <Awards />
        {data?.about && (
            <>
                <Separator className="bg-soft-200" />
                <About edit={isOwner} aboutText={data?.about} />
            </>
        )}
    </div>
}

export default Sidebar;