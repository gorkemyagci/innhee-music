"use client"
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FileData {
    id: string;
    name: string;
    size: number;
    uploadDate: string;
}

const staticFiles: FileData[] = [
    {
        id: "1",
        name: "Project_Design_Final.pdf",
        size: 2500000,
        uploadDate: "15 Mar, 2024 14:30"
    },
    {
        id: "2",
        name: "Logo_Assets.zip",
        size: 15000000,
        uploadDate: "15 Mar, 2024 14:30"
    },
    {
        id: "3",
        name: "Documentation.pdf",
        size: 1200000,
        uploadDate: "15 Mar, 2024 14:30"
    }
];

const FileWork = () => {
    const [isOpen, setIsOpen] = useState(true);

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    };

    const handleDownload = (file: FileData) => {
        // Simüle edilmiş indirme - gerçek uygulamada API'den dosya URL'i alınacak
        console.log(`Downloading file: ${file.name}`);
    };

    return (
        <div className="border border-soft-200 rounded-2xl">
            <motion.div
                onClick={() => setIsOpen(!isOpen)}
                className={cn("w-full h-12 py-3 px-4 rounded-t-2xl flex items-center justify-between cursor-pointer", !isOpen && "rounded-b-2xl")}
            >
                <span className="text-strong-950 font-medium">Work files</span>
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
                            {staticFiles.map((file) => (
                                <div key={file.id} className="border relative justify-between items-center flex border-soft-200 rounded-lg p-4 pl-[14px] mt-4 first:mt-0">
                                    <div className="flex items-start w-full gap-1 justify-between">
                                        <div className="w-full">
                                            <div className="flex flex-col w-full items-start gap-1">
                                                <span className="text-sm font-medium text-sub-600 w-3/4 truncate">{file.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-sub-600 font-normal">
                                                        {formatFileSize(file.size)}
                                                    </span>
                                                    <span className="text-xs text-sub-600 font-normal">
                                                        {file.uploadDate}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="h-8 px-4 py-2 rounded-lg text-sub-600 hover:text-sub-600 hover:bg-transparent"
                                            onClick={() => handleDownload(file)}
                                        >
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FileWork;