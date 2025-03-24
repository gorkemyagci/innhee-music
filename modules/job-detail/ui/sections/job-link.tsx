"use client";
import { Icons } from "@/components/icons";
import { useState } from "react";
import { toast } from "sonner";
import { ProjectItemType } from "@/lib/types";
import { useTranslations } from "next-intl";

interface JobLinkProps {
    item: ProjectItemType
}

const JobLink = ({ item }: JobLinkProps) => {
    const t = useTranslations("jobDetail.jobLink");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const url = `https://innhee.vercel.app/jobs/details/${item?.id}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                setCopied(true);
                toast.success(t("copySuccess"));
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
            })
            .catch(err => {
                toast.error(t("copyError"));
            });
    }

    return <div className="w-full flex flex-col items-start gap-2">
        <span className="text-strong-950 font-medium text-sm">{t("title")}</span>
        <div className="h-10 w-full border border-soft-200 flex items-center justify-between pr-3 rounded-[10px]">
            <div className="p-2.5 pl-3 flex items-center gap-2 overflow-hidden">
                <Icons.links_line className="flex-shrink-0" />
                <span className="text-soft-400 font-normal text-xs md:text-sm truncate lg:max-w-64">innhee.com/jobs/details/{item?.id}</span>
            </div>
            <Icons.copy className={`cursor-pointer flex-shrink-0 ${copied ? 'text-green-500' : ''}`} onClick={handleCopy} />
        </div>
    </div>
}

export default JobLink;