"use client";
import { useState } from "react";
import { Icons } from "@/components/icons";

interface MediaPlayerProps {
    url: string;
    filename: string;
}

const MediaPlayer = ({ url, filename }: MediaPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio] = useState(new Audio(url));

    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="border border-soft-200 w-full md:w-[248px] bg-[#FDFDFD] rounded-[12px] p-[14px] h-14 flex items-center justify-between gap-3">
            <span className="text-sub-600 font-medium text-sm truncate">{filename}</span>
            <button 
                onClick={togglePlay} 
                className={`flex-shrink-0 transition-colors ${isPlaying ? 'text-main-900' : 'text-sub-600'}`}
            >
                {isPlaying ? <Icons.pause_fill className="size-7" /> : <Icons.play_pause className="size-7" />}
            </button>
        </div>
    );
};

export default MediaPlayer; 