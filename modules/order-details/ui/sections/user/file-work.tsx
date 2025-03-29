"use client"
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Attachment {
    id: string;
    filename: string;
    path: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

interface FileWorkProps {
    data: {
        attachments?: Attachment[];
    };
}

const FileWork = ({ data }: FileWorkProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const t = useTranslations("orderDetails.fileWork");

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    };

    const handleDownload = (file: Attachment) => {
        window.open(file.url, '_blank');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    return (
        <div className="border border-soft-200 rounded-2xl">
            <motion.div
                onClick={() => setIsOpen(!isOpen)}
                className={cn("w-full h-12 py-3 px-4 rounded-t-2xl flex items-center justify-between cursor-pointer", !isOpen && "rounded-b-2xl")}
            >
                <span className="text-strong-950 font-medium">{t("title")}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 0 : 180 }}
                    transition={{ duration: 0.2 }}
                >
                    <Icons.arrow_down className="fill-sub-600" />
                </motion.div>
            </motion.div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full relative rounded-b-2xl overflow-hidden"
                    >
                        <div className="p-4">
                            {data.attachments && data.attachments.length > 0 ? (
                                data.attachments.map((file) => (
                                    <div key={file.id} className="border relative justify-between items-center flex border-soft-200 rounded-lg p-4 pl-[14px] mt-4 first:mt-0">
                                        <div className="flex items-start w-full gap-1 justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col w-full items-start gap-1">
                                                    <span className="text-sm font-medium text-sub-600 truncate max-w-[200px]">{file.filename}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-sub-600 font-normal">
                                                            {formatDate(file.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="h-8 px-4 py-2 rounded-lg text-sub-600 hover:text-sub-600 hover:bg-transparent ml-4"
                                                onClick={() => handleDownload(file)}
                                            >
                                                {t("download")}
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 text-sub-600">
                                    No files available
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FileWork;