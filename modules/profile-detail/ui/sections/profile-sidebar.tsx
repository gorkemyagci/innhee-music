import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ProfileSidebar = () => {
    return <div className="w-[354px] h-full p-4 rounded-[20px] bg-white border border-soft-200 flex flex-col gap-6 items-center">
        <div className="flex flex-col items-center gap-4">
            <UserAvatar
                imageUrl="/assets/images/profile.png"
                name="James Brown"
                className="w-20 h-20 object-contain"
            />
            <div className="flex flex-col items-center gap-1">
                <p className="text-main-900 font-medium text-lg">James Brown</p>
                <span className="text-sub-600 font-normal text-xs">CEO</span>
            </div>
            <div className="flex items-center gap-6">
                <Button
                    type="button"
                    className={cn("w-[132px] h-10 flex items-center gap-1 disabled:cursor-auto group rounded-[10px] text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]")}>
                    <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                    <Icons.send className="stroke-white" />
                    Get In Touch
                </Button >
                <Button variant="outline" className="w-10 h-10 rounded-[10px] p-2.5 bg-white border-soft-200">
                    <Icons.save_2 className="size-5" />
                </Button>
            </div>
            <div className="flex items-center">
                <div className="flex items-center gap-1.5 pr-2.5">
                    <Icons.profile_star />
                    <span className="text-main-900 font-normal text-sm">Recommended...</span>
                </div>
                <div className="flex items-center py-0.5 pr-3 pl-0.5 bg-white shadow-sm rounded-full">
                    <Image
                        src="/assets/images/Avatar-5.png"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-white"
                        quality={100}
                    />
                    <Image
                        src="/assets/images/Avatar-6.png"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full -translate-x-2 border-2 border-white"
                        quality={100}
                    />
                    <span className="text-sub-600 font-normal text-base">+4</span>
                </div>
            </div>
            <div className="w-full flex flex-col gap-6 items-start">
                <div className="flex flex-col items-start gap-4">
                    <span className="text-soft-400 font-medium text-[11px]">COMMON TAGS</span>
                    <div className="flex flex-row flex-wrap gap-2">
                        <div className="border border-soft-200 h-8 p-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                            Brand Strategist
                        </div>
                        <div className="border border-soft-200 h-8 p-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                            Designer
                        </div>
                        <div className="border border-soft-200 h-8 p-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                            Figma
                        </div>
                        <div className="border border-soft-200 h-8 p-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                            +2
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-4">
                    <span className="text-soft-400 font-medium text-[11px]">OFFICIAL TAGS</span>
                    <div className="flex flex-row flex-wrap gap-2">
                        <div className="rounded-full h-8 p-2 pl-1 flex items-center justify-center gap-0.5 bg-weak-100 text-sub-600 font-medium text-xs">
                            <Icons.flaslight_fill />
                            TOP INDEPENDENT
                        </div>
                        <div className="rounded-full h-8 p-2 pl-1 flex items-center justify-center gap-0.5 bg-weak-100 text-sub-600 font-medium text-xs">
                            <Icons.flaslight_fill />
                            EARNED $50K+
                        </div>
                        <div className="rounded-full h-8 p-2 pl-1 flex items-center justify-center gap-0.5 bg-weak-100 text-sub-600 font-medium text-xs">
                            <Icons.flaslight_fill />
                            INDETITY VERIFIED
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 items-start">
                    <span className="text-soft-400 font-medium text-[11px]">ABOUT</span>
                    <p className="text-main-900 font-normal text-xs">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                </div>
                <div className="flex flex-col gap-4 items-start">
                    <span className="text-soft-400 font-medium text-[11px]">LANGUAGE</span>
                    <div className="flex items-center gap-[7px]">
                        <div className="flex items-center gap-0.5 text-sub-600 font-medium text-xs">
                            <Icons.language_circle />
                            India
                        </div>
                        <div className="flex items-center gap-0.5 text-sub-600 font-medium text-xs">
                            <Icons.language_circle />
                            English
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ProfileSidebar;