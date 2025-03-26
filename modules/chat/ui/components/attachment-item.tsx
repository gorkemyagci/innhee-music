import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Paperclip } from "lucide-react";

const AttachmentItem = ({ file, index, removeAttachment }: { file: File & { preview?: string }, index: number, removeAttachment: (index: number) => void }) => {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            key={index}
            className="flex flex-col items-start gap-1 sm:gap-2 w-[100px] sm:w-[124px]"
        >
            <div className="relative group w-full">
                <div className={cn(
                    "rounded-[12px] overflow-hidden"
                )}>
                    <div className="absolute inset-0 bg-black/50 rounded-lg" />
                    {file.preview ? (
                        <img
                            src={file.preview}
                            alt={file.name}
                            className="w-full h-[90px] sm:h-[104px] object-cover"
                        />
                    ) : (
                        <div className="w-full h-[90px] sm:h-[104px] flex items-center justify-center">
                            <Paperclip size={20} className="text-gray-400 sm:size-24" />
                        </div>
                    )}
                </div>
                <button
                    onClick={() => removeAttachment(index)}
                    className="text-white cursor-pointer absolute top-1 sm:top-2 right-1 sm:right-2"
                >
                    <Icons.close className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>
            <div className="w-full px-1">
                <p className="text-[11px] sm:text-xs font-medium text-main-900 truncate">
                    {file.name}
                </p>
                <p className="text-[10px] sm:text-xs text-sub-600">
                    {(file.size / 1024).toFixed(2)} KB
                </p>
            </div>
        </motion.div>
    )
}

export default AttachmentItem;