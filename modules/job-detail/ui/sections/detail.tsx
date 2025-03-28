"use client"
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import FAQ from "../components/FAQ";
import { ProjectItemType } from "@/lib/types";
import { useTranslations } from "next-intl";
import MediaPlayer from "../components/media-player";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface DetailProps {
    item: ProjectItemType;
}

const Detail = ({ item }: DetailProps) => {
    const t = useTranslations("jobDetail.detail");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const isMediaFile = (filename: string) => {
        const isAudio = filename.match(/\.(mp3|wav|ogg)(?:_\d+)?$/i);
        const isVideo = filename.match(/\.(mp4|mov|avi)(?:_\d+)?$/i);
        return isAudio || isVideo;
    };

    const handleAttachmentClick = (attachment: any) => {
        window.open(attachment.url, '_blank');
    };

    return <div className="w-full rounded-[20px] p-4 md:p-6 border border-[#E2E4E9] shadow-sm flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col md:flex-row md:items-center w-full md:justify-between gap-3">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <p className="text-strong-950 font-medium text-xl md:text-2xl capitalize">{item?.subject}</p>
                <Badge className="flex h-7 w-fit items-center gap-0.5 py-1 md:py-1.5 px-2 md:px-3 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                    <Icons.group_line_users className="size-3 md:size-3.5" /> {t("businessContract")}
                </Badge>
            </div>
            <Icons.save className="cursor-pointer" />
        </div>
        <Separator className="bg-soft-200" />
        <div className="flex flex-col items-start gap-3">
            <span className="text-[#161922] font-semibold text-base">{t("title")}</span>
            <p className="text-[#525866] font-medium text-sm">
                {item?.detail}
            </p>
            <ul className="list-disc list-inside text-[#525866] font-medium text-sm">
                <li>Neque sodales ut etiam sit amet nisl purus. Non tellus orci ac auctor.</li>
                <li>Neque sodales ut etiam sit amet nisl purus. Non tellus orci ac auctor.</li>
                <li>Neque sodales ut etiam sit amet nisl purus. Non tellus orci ac auctor.</li>
            </ul>
        </div>
        <Separator className="bg-soft-200" />
        {(item?.skillLevels ?? []).length > 0 && (
            <>
                <div className="w-full flex flex-col items-start gap-3">
                    <span className="text-[#161922] font-semibold text-base tracking-[-1.5%]">{t("skills")}</span>
                    <div className="flex flex-wrap items-center gap-2">
                        {(item?.skillLevels ?? []).map((skill: { name: string }, index: number) => (
                            <div key={index} className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                                {skill.name}
                            </div>
                        ))}
                    </div>
                </div>
                <Separator className="bg-soft-200" />
            </>
        )}
        {(item?.attachments ?? []).length > 0 && (
            <>
                <div className="w-full flex flex-col items-start gap-3">
                    <span className="text-[#161922] font-semibold text-base tracking-[-1.5%]">{t("attachments")}</span>
                    {(item?.attachments ?? []).map((attachment, index) => (
                        isMediaFile(attachment.filename) ? (
                            <MediaPlayer
                                key={index}
                                url={attachment.url}
                                filename={attachment.filename}
                            />
                        ) : (
                            <div 
                                key={index} 
                                onClick={() => handleAttachmentClick(attachment)}
                                className={`border border-soft-200 w-full md:w-[248px] bg-[#FDFDFD] rounded-[12px] p-[14px] h-14 flex items-center justify-between gap-3 cursor-pointer hover:bg-soft-50 transition-colors`}
                            >
                                <span className="text-sub-600 font-medium text-sm truncate">{attachment.filename}</span>
                                <Icons.file className="size-7 flex-shrink-0" />
                            </div>
                        )
                    ))}
                </div>
                <Separator className="bg-soft-200" />
            </>
        )}
        <FAQ />

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-4xl p-0">
                {selectedImage && (
                    <img 
                        src={selectedImage} 
                        alt="Attachment preview" 
                        className="w-full h-auto object-contain"
                    />
                )}
            </DialogContent>
        </Dialog>
    </div>
}

export default Detail;