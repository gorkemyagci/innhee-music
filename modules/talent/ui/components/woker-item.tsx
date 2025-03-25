import { Icons } from "@/components/icons";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

// Define TypeScript interfaces for the data structure
interface Attachment {
  id: string;
  filename: string;
  path: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface PortfolioItem {
  id: string;
  portfolioId: string;
  title: string;
  description: string;
  displayOnProfile: boolean;
  disableComments: boolean;
  createdAt: string;
  updatedAt: string;
  attachments?: Attachment[];
}

const WokerItem = ({ index, item }: { index: number, item: PortfolioItem }) => {
    const [expanded, setExpanded] = useState(false);
    const t = useTranslations("talent.wokerItem");

    // Function to determine if the attachment is audio, video, or document
    const getFileType = (filename: string) => {
        if (!filename) return 'unknown';
        const extension = filename.split('_').pop()?.split('.').pop()?.toLowerCase();
        
        if (extension === 'mp3' || extension === 'wav' || extension === 'ogg') return 'audio';
        if (extension === 'mp4' || extension === 'webm' || extension === 'mov') return 'video';
        if (extension === 'pdf') return 'pdf';
        return 'unknown';
    };

    // Get the first attachment if it exists
    const firstAttachment = item?.attachments && item.attachments.length > 0 ? item.attachments[0] : null;
    const fileType = firstAttachment ? getFileType(firstAttachment.filename) : 'unknown';

    // Function to get a display name for the attachment
    const getAttachmentDisplayName = (filename: string) => {
        const parts = filename.split('_');
        if (parts.length > 1) {
            return parts[parts.length - 1]; // Get the last part after splitting by underscore
        }
        return filename;
    };

    // Handle opening attachments
    const handleOpenAttachment = (url: string) => {
        if (url) {
            window.open(url, '_blank');
        }
    };

    // Function to get file type display name
    const getFileTypeDisplayName = (type: string) => {
        switch (type) {
            case 'pdf':
                return t("fileTypes.pdf");
            case 'audio':
                return t("fileTypes.audio");
            case 'video':
                return t("fileTypes.video");
            default:
                return t("fileTypes.attachment");
        }
    };

    return (
        <div key={index} className="w-full">
            {/* Mobile view (collapsed/expanded with animation) */}
            <div className="md:hidden w-full">
                <div className="flex items-center justify-between w-full py-3">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Icons.play_pause className="flex-shrink-0 cursor-pointer" />
                            {expanded && (
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
                                />
                            )}
                        </div>
                        <div className="flex flex-col items-start gap-1">
                            <span className="text-main-900 font-medium text-sm">{item?.title || t("untitled")}</span>
                            <span className="text-soft-400 font-medium text-xs">{item?.description || t("noDescription")}</span>
                            {firstAttachment && (
                                <span className="text-soft-400 font-medium text-xs">
                                    {getFileTypeDisplayName(fileType)}
                                </span>
                            )}
                        </div>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1 h-auto rounded-full hover:bg-gray-100"
                        onClick={() => setExpanded(!expanded)}
                    >
                        <motion.div
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                        </motion.div>
                    </Button>
                </div>
                
                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ 
                                height: "auto", 
                                opacity: 1,
                                transition: {
                                    height: { duration: 0.3 },
                                    opacity: { duration: 0.2, delay: 0.1 }
                                }
                            }}
                            exit={{ 
                                height: 0, 
                                opacity: 0,
                                transition: {
                                    height: { duration: 0.3 },
                                    opacity: { duration: 0.2 }
                                }
                            }}
                            className="overflow-hidden"
                        >
                            <div className="py-3 px-2 mb-3 flex flex-col gap-4 bg-gray-50 rounded-lg">
                                {/* Display attachments */}
                                {item?.attachments && item.attachments.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-soft-400 font-medium text-xs">{t("attachments")}:</span>
                                        {item.attachments.map((attachment, idx) => {
                                            const attFileType = getFileType(attachment.filename);
                                            
                                            return (
                                                <div key={idx} className="flex items-center gap-2 p-1 rounded">
                                                    <div className="relative">
                                                        {attFileType === 'pdf' && <Icons.profile_star className="size-4" />}
                                                        {attFileType === 'audio' && <Icons.play_pause className="size-4" />}
                                                        {attFileType === 'video' && <Icons.play_pause className="size-4" />}
                                                    </div>
                                                    <a 
                                                        href={attachment.url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 hover:underline text-xs truncate max-w-[200px]"
                                                    >
                                                        {getAttachmentDisplayName(attachment.filename)}
                                                    </a>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                
                                <div className="flex flex-wrap items-center gap-1.5">
                                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs bg-white">
                                        {t("skills.mixing")}
                                    </div>
                                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs bg-white">
                                        {t("skills.singing")}
                                    </div>
                                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs bg-white">
                                        {t("skills.jazz")}
                                    </div>
                                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs bg-white">
                                        {t("skills.hipPop")}
                                    </div>
                                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs bg-white">
                                        {t("skills.kPop")}
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="flex items-center gap-1.5">
                                            <Icons.time_line className="size-3.5" />
                                            <span className="text-main-900 font-medium text-[15px]">0:22</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Icons.calendar_line className="size-3.5" />
                                            <span className="text-soft-400 font-medium text-[13px]">112 BPM</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Icons.save className="cursor-pointer" />
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-1.5">
                                    <Icons.profile_star className="size-3.5" />
                                    <span className="text-soft-400 font-medium text-xs">{t("workPath")}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Desktop view */}
            <div className="hidden md:flex w-full items-center justify-between py-4">
                <div className="flex items-center gap-2">
                    <Icons.play_pause className="flex-shrink-0 cursor-pointer" />
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-main-900 font-medium">{item?.title || t("untitled")}</span>
                        <span className="text-soft-400 font-medium text-xs">{item?.description || t("noDescription")}</span>
                        {firstAttachment && (
                            <span className="text-soft-400 font-medium text-xs">
                                {getFileTypeDisplayName(fileType)}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                        {t("skills.mixing")}
                    </div>
                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                        {t("skills.singing")}
                    </div>
                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                        {t("skills.jazz")}
                    </div>
                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                        {t("skills.hipPop")}
                    </div>
                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                        {t("skills.kPop")}
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-main-900 font-medium text-[15px]">0:22</span>
                        <span className="text-soft-400 font-medium text-[13px]">112 BPM</span>
                    </div>
                    <span className="text-soft-400 font-medium text-sm">{t("workPath")}</span>
                    <Icons.save className="cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default WokerItem;