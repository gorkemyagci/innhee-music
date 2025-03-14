import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";
import About from "@/modules/find-works/ui/sections/sidebar/about";
import CommonTags from "./common-tags";
import { useEffect, useState } from "react";

interface SidebarProps {
    data: any;
}

const Sidebar = ({ data }: SidebarProps) => {
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
        <div className={`${isMobile ? 'w-full' : 'w-[352px] shrink-0 max-h-[calc(100vh-120px)]'} shadow-sm bg-white border border-soft-200 rounded-[20px] pb-6`}>
            <div className="p-4 relative flex flex-col items-center gap-5">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center gap-1">
                        <UserAvatar
                            imageUrl="/assets/images/avatar2.png"
                            name={data?.user?.nickname}
                            className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} shrink-0 p-0.5`}
                        />
                        <p className={`${isMobile ? 'text-sm' : 'text-base'} font-medium text-sub-600`}>{data?.user?.nickname}</p>
                        <div className="flex items-center gap-0.5">
                            <Icons.star className={isMobile ? 'size-3.5' : 'size-4'} />
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
                <div className="flex items-center gap-3 md:gap-5">
                    <Button variant="outline" className="w-[85px] h-8 border-soft-200 rounded-lg bg-white flex items-center gap-1.5 text-sub-600 font-medium text-xs md:text-sm">
                        Follow <Icons.heart className="stroke-sub-600 size-3.5" />
                    </Button>
                    <Button
                        type="button"
                        className="w-[83px] h-8 disabled:cursor-auto group rounded-lg text-white text-xs md:text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                        <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                        Touch <Icons.send className="stroke-white size-3.5" />
                    </Button>
                </div>
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center gap-1.5">
                        <Icons.profile_star className={isMobile ? 'size-3.5' : 'size-4'} />
                        <span className="text-main-900 font-normal text-xs md:text-sm">Recent reviews</span>
                    </div>
                    <div className="bg-white rounded-full py-0.5 pr-2.5 pl-0.5 flex items-center shadow-sm">
                        <UserAvatar
                            imageUrl="/assets/images/avatar-3.png"
                            name="User Name"
                            className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} border-2 border-white`}
                        />
                        <UserAvatar
                            imageUrl="/assets/images/Avatar-5.png"
                            name="User Name"
                            className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} border-2 border-white -translate-x-2`}
                        />
                        <UserAvatar
                            imageUrl="/assets/images/Avatar-6.png"
                            name="User Name"
                            className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} border-2 border-white -translate-x-4`}
                        />
                        <span className="text-sub-600 font-normal text-xs -translate-x-1">+4</span>
                    </div>
                </div>
            </div>
            <Separator className="bg-soft-200" />
            <CommonTags />
            {data?.about && (
                <>
                    <Separator className="bg-soft-200" />
                    <About edit={false} aboutText={data?.about} />
                </>
            )}
        </div>
    );
}

export default Sidebar;