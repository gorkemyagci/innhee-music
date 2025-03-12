"use client";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";
import { useState } from "react";

const List = () => {
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);

    const handlePlayClick = (index: number) => {
        if (playingIndex === index) {
            setPlayingIndex(null);
            return;
        }
        setPlayingIndex(index);
        setTimeout(() => {
            setPlayingIndex(null);
        }, 5000);
    };

    return <div className="bg-white w-full rounded-[20px] p-4 flex flex-col items-start gap-4 shadow-sm">
        <p className="text-strong-950 font-medium text-base">List</p>
        <Separator className="bg-soft-200 w-full" />
        {new Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex h-12 w-full items-center justify-between">
                <div className="flex items-center gap-2">
                    <UserAvatar
                        imageUrl="/assets/images/avatar-3.png"
                        name="Cleve Music"
                    />
                    <div className="flex flex-col items-start">
                        <p className="text-[#222530] font-medium text-sm">Cleve Music</p>
                        <div className="flex items-center gap-0.5">
                            <Icons.star />
                            <span className="text-sub-600 font-normal text-xs">4.9(125)</span>
                        </div>
                    </div>
                </div>
                <div
                    className="cursor-pointer"
                    onClick={() => handlePlayClick(i)}
                >
                    {playingIndex === i ? <Icons.pause_fill /> : <Icons.play_mini_fill />}
                </div>
            </div>
        ))}
    </div>
}

export default List;