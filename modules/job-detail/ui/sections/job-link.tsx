"use client";
import { Icons } from "@/components/icons";
import { useState } from "react";
import { toast } from "sonner";

const JobLink = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        toast.success("Copied to clipboard");
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return <div className="w-full flex flex-col items-start gap-2">
        <span className="text-strong-950 font-medium text-sm">Job Link</span>
        <div className="h-10 w-full border border-soft-200 flex items-center justify-between pr-3 rounded-[10px]">
            <div className="p-2.5 pl-3 flex items-center gap-2 overflow-hidden">
                <Icons.links_line className="flex-shrink-0" />
                <span className="text-soft-400 font-normal text-xs md:text-sm truncate">https://www.google.com/</span>
            </div>
            <Icons.copy className="cursor-pointer flex-shrink-0" onClick={handleCopy} />
        </div>
    </div>
}

export default JobLink;