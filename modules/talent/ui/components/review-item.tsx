import { Icons } from "@/components/icons";
import UserAvatar from "@/components/user-avatar";

const ReviewItem = () => {
    return (
        <div className="p-3 md:p-4 w-full flex flex-col items-start rounded-[16px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.015)]">
            <div className="flex w-full border-b border-soft-200 pb-3 md:pb-4 items-start justify-between">
                <div className="flex items-center gap-2">
                    <UserAvatar
                        imageUrl="/assets/images/avatar-3.png"
                        name="Cleve Music"
                        className="w-10 h-10 md:w-12 md:h-12"
                    />
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sub-600 font-medium text-xs md:text-sm">Cleve Music</p>
                            <div className="flex items-center gap-0.5">
                                <Icons.star className="size-3 md:size-4" />
                                <span className="text-sub-600 font-normal text-[10px] md:text-xs">4.9(125)</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center">
                            <div className="flex items-center gap-1 pr-2 pl-1">
                                <Icons.google className="size-3 md:size-4" />
                                <span className="text-sub-600 font-medium text-[10px] md:text-xs">Google</span>
                            </div>
                            <div className="flex items-center gap-1 pr-2 pl-1">
                                <Icons.google className="size-3 md:size-4" />
                                <span className="text-sub-600 font-medium text-[10px] md:text-xs">Google</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="bg-[#F2F2F2] h-5 py-1 px-2 text-main-900 font-medium text-[10px] md:text-[11px] flex items-center justify-between rounded-full">PARTNER</span>
            </div>
            <div className="w-full pt-3 md:pt-4 flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-0">
                <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-1">
                        <p className="text-strong-950 font-medium text-base md:text-xl">Contract title text here...</p>
                        <div className="flex items-center gap-0.5">
                            <Icons.star className="size-3 md:size-4" />
                            <span className="text-sub-600 font-normal text-[10px] md:text-xs">4.9</span>
                        </div>
                    </div>
                    <p className="text-sub-600 font-normal text-xs md:text-sm">Working with Ralph on a UX audit for our website was a game-changer. Ralph didn't just identify pain points-he offered innovative solutions that empowered me to make key business decisions with confidence.</p>
                </div>
                <span className="text-strong-950 font-medium text-base md:text-lg mt-2 md:mt-0">$1000.00 </span>
            </div>
        </div>
    )
}

export default ReviewItem;