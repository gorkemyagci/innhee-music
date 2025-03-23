import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";

const Sidebar = () => {
    return <div className="w-full lg:max-w-[320px] border border-soft-200 rounded-[20px] p-5 flex flex-col gap-6 items-center">
        <div className="flex flex-col items-center gap-2 p-4">
            <div className="flex flex-col items-center gap-1">
                <UserAvatar
                    imageUrl="/assets/images/avatar-4-1.png"
                    name="Cleve Music"
                    className="w-20 h-20 shrink-0 p-0.5"
                />
                <p className="text-sub-600 font-medium text-base">Cleve Music</p>
                <div className="flex items-center gap-0.5">
                    <Icons.star />
                    <span className="text-sub-600 font-normal text-xs">4.9(125)</span>
                </div>
            </div>
            <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1">
                    <Icons.google />
                    <span className="text-sub-600 font-medium text-xs">Google</span>
                </div>
                <div className="flex items-center gap-1">
                    <Icons.google />
                    <span className="text-sub-600 font-medium text-xs">Google</span>
                </div>
            </div>
        </div>
        <Separator className="bg-soft-200 w-full" />
        <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col items-start gap-2.5">
                <span className="text-strong-950 font-medium text-sm">About</span>
                <p className="text-sub-600 text-xs font-normal">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer too</p>
            </div>
            <div className="flex items-center gap-4">
                <Icons.twitch className="size-[18px]" />
                <Icons.x className="size-[18px]" />
                <Icons.google className="size-[18px]" />
            </div>
        </div>
        <Separator className="bg-soft-200 w-full" />
        <div className="w-full flex flex-col items-start gap-3">
            <span className="text-strong-950 font-medium text-sm">Skills</span>
            <div className="flex flex-wrap items-center gap-2">
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Grammy
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Billboard Music
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    American Music
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    BRIT
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    MTV Music
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Eurovision Awards
                </div>
            </div>
        </div>
        <Separator className="bg-soft-200 w-full" />
        <div className="w-full flex flex-col items-start gap-3">
            <span className="text-strong-950 font-medium text-sm">Tools</span>
            <div className="flex flex-wrap items-center gap-2">
                <div className="border border-soft-200 h-6 shrink-0 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Products <span className="text-soft-400 font-normal pl-1 text-xs flex items-center gap-1">(4) <Icons.close className="size-3" /></span>
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Grammy
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Billboard Music
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    American Music
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    BRIT
                </div>
            </div>
        </div>
    </div>
}

export default Sidebar; 