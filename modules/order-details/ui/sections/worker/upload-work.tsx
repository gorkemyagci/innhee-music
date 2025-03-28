"use client"
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface FileWithProgress {
    id: string;
    name: string;
    size: number;
    type: string;
    progress: number;
    uploading: boolean;
    file?: File;
}

const UploadWork = () => {
    const [files, setFiles] = useState<FileWithProgress[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const t = useTranslations("orderDetails.uploadWork");

    const createFileWithProgress = (file: File): FileWithProgress => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        uploading: true,
        file: file
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            const fileWithProgress = createFileWithProgress(selectedFile);
            setFiles(prev => [...prev, fileWithProgress]);
            simulateUpload(fileWithProgress.id);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const selectedFile = e.dataTransfer.files[0];
            const fileWithProgress = createFileWithProgress(selectedFile);
            setFiles(prev => [...prev, fileWithProgress]);
            simulateUpload(fileWithProgress.id);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const simulateUpload = (fileId: string) => {
        const interval = setInterval(() => {
            setFiles(prev => {
                const newFiles = [...prev];
                const fileIndex = newFiles.findIndex(f => f.id === fileId);
                if (fileIndex === -1) {
                    clearInterval(interval);
                    return prev;
                }

                const file = newFiles[fileIndex];
                if (file.progress >= 100) {
                    clearInterval(interval);
                    newFiles[fileIndex] = { ...file, uploading: false };
                    return newFiles;
                }

                newFiles[fileIndex] = { ...file, progress: file.progress + 10 };
                return newFiles;
            });
        }, 300);
    };

    const removeFile = (fileId: string) => {
        setFiles(prev => prev.filter(file => file.id !== fileId));
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    };

    const handleDownload = (file: FileWithProgress) => {
        if (!file.file) return;
        const url = URL.createObjectURL(file.file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="border border-soft-200 rounded-2xl">
            <div className="px-4 py-3 h-12 flex items-center justify-start border-b border-soft-200">
                <span className="text-strong-950 font-medium">{t("title")}</span>
            </div>
            <div className="p-4">
                <div
                    className={cn(
                        "border border-dashed rounded-[12px] p-8 flex flex-col items-center justify-center gap-5 transition-colors duration-200",
                        isDragging ? "border-primary-base bg-primary-50" : "border-[#CDD0D5]"
                    )}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <Icons.upload_cloud className={cn("size-6", isDragging && "text-primary-base")} />
                    <div className="flex flex-col items-center gap-1">
                        <p className={cn("text-sm font-medium", isDragging ? "text-primary-base" : "text-strong-950")}>
                            {isDragging ? t("dropHere") : t("chooseFile")}
                        </p>
                        <p className="text-xs font-normal text-soft-400">{t("fileTypes")}</p>
                    </div>
                    <label htmlFor="file-upload" className="mt-2">
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".jpeg,.jpg,.png,.pdf,.mp4"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            className="h-8 rounded-lg py-1.5 px-4 text-sub-600 shadow-none font-medium text-sm cursor-pointer"
                            onClick={() => document.getElementById('file-upload')?.click()}
                        >
                            {t("browseFile")}
                        </Button>
                    </label>
                </div>

                {files.map((file) => (
                    <div key={file.id} className="border relative justify-between items-center flex border-soft-200 rounded-lg p-4 pl-[14px] mt-4">
                        <div className="flex items-start w-full gap-1 justify-between mb-3">
                            <div className="w-full">
                                <div className="flex flex-col w-full items-start gap-1">
                                    <span className="text-sm font-medium text-sub-600 w-3/4 truncate">{file.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-sub-600 font-normal">
                                            {formatFileSize(file.size)}
                                        </span>
                                        <span className="text-xs text-sub-600 font-normal">
                                            {new Date().toLocaleDateString('en-US', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false
                                            })}
                                        </span>
                                        {file?.uploading && (
                                            <Icons.loader className="animate-spin" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {file.uploading && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="h-8 px-3 py-2 hover:bg-transparent absolute top-2 right-2"
                                    onClick={() => removeFile(file.id)}
                                >
                                    <Icons.close className="w-5 h-5 text-sub-600" />
                                </Button>
                            )}
                        </div>
                        {!file.uploading && file.progress === 100 && (
                            <Button
                                variant="outline"
                                className="h-8 px-4 py-2 rounded-lg text-sub-600 hover:text-sub-600 hover:bg-transparent"
                                onClick={() => handleDownload(file)}
                            >
                                {t("download")}
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UploadWork;