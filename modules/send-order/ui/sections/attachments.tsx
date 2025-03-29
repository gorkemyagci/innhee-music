"use client"
import { Icons } from "@/components/icons";
import { UseFormReturn } from "react-hook-form";
import { useRef } from "react";
import { useTranslations } from "next-intl";

interface Attachment {
    name: string;
    size: number;
    type: string;
    file: File;
}

interface AttachmentsProps {
    form: UseFormReturn<any>;
}

const Attachments = ({ form }: AttachmentsProps) => {
    const t = useTranslations("sendOrder.attachments");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const attachments = form.watch("attachments") || [];

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newAttachments = Array.from(files).map(file => ({
                name: file.name,
                size: file.size,
                type: file.type,
                file: file
            }));
            form.setValue("attachments", [...attachments, ...newAttachments]);
        }
    };

    const handleRemoveFile = (index: number) => {
        const newAttachments = attachments.filter((_: Attachment, i: number) => i !== index);
        form.setValue("attachments", newAttachments);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 ' + t("fileSize.bytes");
        const k = 1024;
        const sizes = [t("fileSize.bytes"), t("fileSize.kb"), t("fileSize.mb"), t("fileSize.gb")];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return <div className="w-full flex flex-col items-start gap-5">
        {attachments?.length > 0 && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {attachments.map((attachment: Attachment, index: number) => (
                    <div key={index} className="border border-soft-200 w-full rounded-[12px] px-4 py-2 flex flex-row items-start justify-between">
                        <div className="flex flex-col items-start gap-1">
                            <p className="text-strong-950 font-normal line-clamp-1 truncate max-w-[200px] text-sm">{attachment.name}</p>
                            <span className="text-sub-600 font-normal text-xs">{formatFileSize(attachment.size)}</span>
                        </div>
                        <Icons.delete_bin_line
                            className="size-5 cursor-pointer"
                            onClick={() => handleRemoveFile(index)}
                        />
                    </div>
                ))}
            </div>
        )}
        <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileSelect}
            multiple
            accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
        />
        <div
            className="flex cursor-pointer items-center gap-1 border border-soft-200 py-1 px-2 rounded-lg"
            onClick={() => fileInputRef.current?.click()}
        >
            <Icons.links_line className="size-5 fill-sub-600" />
            <span className="text-sub-600 font-medium text-sm">{t("add")}</span>
        </div>
    </div>
}

export default Attachments;