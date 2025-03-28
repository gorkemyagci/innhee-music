"use client"
import CardLayout from "../components/card-layout";
import { useQueryState } from "nuqs";
import { useMockData } from "@/lib/mockData";
import CustomSelect from "@/components/custom/select";
import { useState, useEffect, useRef } from "react";
import { Icons } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/trpc/client";
import { UseFormReturn } from "react-hook-form";
import { jobPostingFormSchema } from "../views/job-posting";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import nookies from "nookies";
import { useTranslations } from "next-intl";

interface SkillLevel {
    id: string;
    name: string;
}

interface Attachment {
    id: string;
    name: string;
    type: string;
    size: number;
}

interface FileWithId extends File {
    id: string;
}

interface SelectCategoryProps {
    form: UseFormReturn<jobPostingFormSchema>;
    initialSelectedSkillLevels?: Array<{ id: string; name: string }>;
    initialSelectedCandidateSources?: Array<{ id: string; name: string }>;
}

const SelectCategory = ({ form, initialSelectedSkillLevels, initialSelectedCandidateSources }: SelectCategoryProps) => {
    const { data: skillsData } = trpc.jobPosting.getAllSkillLevels.useQuery();
    const { data: toolsData } = trpc.jobPosting.getAllCandidateSources.useQuery();

    const deleteAttachmentMutation = trpc.jobPosting.deleteAttachment.useMutation({
        onSuccess: () => {
            toast.success("File deleted successfully");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to delete file");
        }
    });

    const [skillState, setSkillState] = useState({
        levels: [] as SkillLevel[],
        selected: initialSelectedSkillLevels || [] as SkillLevel[],
        selectedValue: ""
    });

    const [toolState, setToolState] = useState({
        items: [] as SkillLevel[],
        selected: initialSelectedCandidateSources || [] as SkillLevel[],
        selectedValue: ""
    });

    const [tab, setTab] = useQueryState("tab", { defaultValue: "basic-information" });

    const [files, setFiles] = useState<FileWithId[]>([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [jobPostId, setJobPostId] = useQueryState("id", { defaultValue: "" });

    const [playingFile, setPlayingFile] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const { jobPostingMenu } = useMockData();
    const isOpen = tab === "select-category";
    const item = jobPostingMenu.find((item) => item.value === "select-category");

    const t = useTranslations("jobPosting.selectCategory");

    useEffect(() => {
        const attachments = form.getValues("attachments") as Attachment[];
        if (attachments && attachments.length > 0) {
            const filesWithAttachments = attachments.map(attachment => ({
                id: attachment.id,
                name: attachment.name,
                type: attachment.type,
                size: attachment.size
            } as FileWithId));
            setFiles(filesWithAttachments);
        }
    }, [form]);

    useEffect(() => {
        if (skillsData && Array.isArray(skillsData)) {
            setSkillState(prev => ({ ...prev, levels: skillsData }));
        }

        if (toolsData && Array.isArray(toolsData)) {
            setToolState(prev => ({ ...prev, items: toolsData }));
        }
    }, [skillsData, toolsData]);

    useEffect(() => {
        if (initialSelectedSkillLevels) {
            setSkillState(prev => ({ ...prev, selected: initialSelectedSkillLevels }));
        }
        if (initialSelectedCandidateSources) {
            setToolState(prev => ({ ...prev, selected: initialSelectedCandidateSources }));
        }
    }, [initialSelectedSkillLevels, initialSelectedCandidateSources]);

    const skillLevelIds = form.watch("skillLevelIds");
    const candidateSourceIds = form.watch("candidateSourceIds");

    useEffect(() => {
        if (skillLevelIds && skillLevelIds.length > 0 && skillsData) {
            const selectedLevels = skillsData.filter((level: SkillLevel) => 
                skillLevelIds.includes(level.id)
            );
            setSkillState(prev => ({ ...prev, selected: selectedLevels }));
        }

        if (candidateSourceIds && candidateSourceIds.length > 0 && toolsData) {
            const selectedToolItems = toolsData.filter((tool: SkillLevel) => 
                candidateSourceIds.includes(tool.id)
            );
            setToolState(prev => ({ ...prev, selected: selectedToolItems }));
        }
    }, [skillLevelIds, candidateSourceIds, skillsData, toolsData]);
    useEffect(() => {
        const currentSkillLevelIds = skillState.selected.map(level => level.id);
        const formSkillLevelIds = form.getValues("skillLevelIds");
        
        if (JSON.stringify(currentSkillLevelIds) !== JSON.stringify(formSkillLevelIds)) {
            form.setValue("skillLevelIds", currentSkillLevelIds, { shouldValidate: true });
        }
    }, [skillState.selected, form]);

    useEffect(() => {
        const currentCandidateSourceIds = toolState.selected.map(tool => tool.id);
        const formCandidateSourceIds = form.getValues("candidateSourceIds");
        
        if (JSON.stringify(currentCandidateSourceIds) !== JSON.stringify(formCandidateSourceIds)) {
            form.setValue("candidateSourceIds", currentCandidateSourceIds, { shouldValidate: true });
        }
    }, [toolState.selected, form]);

    const skillLevelOptions = skillState.levels
        .filter(level => !skillState.selected.some(selected => selected.id === level.id))
        .map(level => ({
            value: level.id,
            label: level.name
        }));

    const toolOptions = toolState.items
        .filter(tool => !toolState.selected.some(selected => selected.id === tool.id))
        .map(tool => ({
            value: tool.id,
            label: tool.name
        }));

    const handleSelectSkillLevel = (value: string) => {
        const selectedLevel = skillState.levels.find(level => level.id === value);
        if (selectedLevel && skillState.selected.length < 4 && !skillState.selected.some(level => level.id === value)) {
            setSkillState(prev => ({
                ...prev,
                selected: [...prev.selected, selectedLevel],
                selectedValue: ""
            }));
        }
    };

    const handleSelectTool = (value: string) => {
        const selectedTool = toolState.items.find(tool => tool.id === value);
        if (selectedTool && toolState.selected.length < 4 && !toolState.selected.some(tool => tool.id === value)) {
            setToolState(prev => ({
                ...prev,
                selected: [...prev.selected, selectedTool],
                selectedValue: ""
            }));
        }
    };

    const handleRemoveSkillLevel = (id: string) => {
        setSkillState(prev => ({
            ...prev,
            selected: prev.selected.filter(level => level.id !== id)
        }));
    };

    const handleRemoveTool = (id: string) => {
        setToolState(prev => ({
            ...prev,
            selected: prev.selected.filter(tool => tool.id !== id)
        }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);

            const invalidFiles = newFiles.filter(file => {
                const type = file.type || '';
                return !type.includes('audio/mpeg') &&
                    !type.includes('audio/mp3') &&
                    !type.includes('video/mp4');
            });

            if (invalidFiles.length > 0) {
                toast.error('Please upload only MP3 or MP4 files');
                return;
            }

            const oversizedFiles = newFiles.filter(file =>
                file.size > 25 * 1024 * 1024
            );

            if (oversizedFiles.length > 0) {
                toast.error('File size should not exceed 25MB');
                return;
            }

            const currentAttachments = (form.getValues("attachments") || []) as Attachment[];
            if (currentAttachments.length + newFiles.length > 3) {
                toast.error('You can upload a maximum of 3 files');
                return;
            }

            if (!jobPostId) {
                toast.error("Please save the job post first before uploading attachments");
                return;
            }

            setIsUploading(true);
            setUploadProgress(0);

            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 300);

            try {
                const formData = new FormData();

                newFiles.forEach((file) => {
                    formData.append('attachments', file);
                });
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-post/${jobPostId}/attachments`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${useAuthStore.getState().token || nookies.get().token}`,
                    },
                    body: formData
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Upload failed');
                }

                const result = await response.json();

                clearInterval(progressInterval);
                setUploadProgress(100);
                const filesWithIds = newFiles.map((file, index) => ({
                    ...file,
                    id: result.attachments[index].id
                })) as FileWithId[];
                setFiles(prev => [...prev, ...filesWithIds]);
                const currentAttachments = (form.getValues("attachments") || []) as Attachment[];
                const newAttachments = filesWithIds.map(file => ({
                    id: file.id,
                    name: file.name,
                    type: file.type,
                    size: file.size
                })) as Attachment[];
                form.setValue("attachments", [...currentAttachments, ...newAttachments], { shouldValidate: true });

                toast.success("Files uploaded successfully");

            } catch (error) {
                clearInterval(progressInterval);
                setUploadProgress(0);
                toast.error(error instanceof Error ? error.message : "Failed to upload files");
            } finally {
                setIsUploading(false);
            }
        }
    };

    const removeFile = async (index: number) => {
        if (!jobPostId) {
            toast.error("Job post ID is required");
            return;
        }

        const fileToRemove = files[index];
        const attachmentId = fileToRemove.id;

        if (!attachmentId) {
            toast.error("Attachment ID is required");
            return;
        }

        try {
            setIsDeleting(index);
            if (playingFile === index) {
                if (audioRef.current) {
                    audioRef.current.pause();
                }
                setPlayingFile(null);
            } else if (playingFile !== null && playingFile > index) {
                setPlayingFile(playingFile - 1);
            }
            await deleteAttachmentMutation.mutateAsync({
                jobPostId: jobPostId,
                attachmentId: attachmentId
            });
            setFiles(prev => prev.filter((_, i) => i !== index));
            const currentAttachments = (form.getValues("attachments") || []) as Attachment[];
            form.setValue("attachments", currentAttachments.filter((_, i) => i !== index), { shouldValidate: true });

        } catch (error) {
            toast.error("Failed to delete file");
        } finally {
            setIsDeleting(null);
        }
    };

    const togglePlay = (index: number) => {
        if (playingFile === index) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setPlayingFile(null);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }

            setPlayingFile(index);

            if (audioRef.current) {
                audioRef.current.src = URL.createObjectURL(files[index]);
                audioRef.current.play().catch(error => {
                    toast.error("Failed to play audio file");
                    setPlayingFile(null);
                });
            }
        }
    };

    const isPlayableFile = (file: File) => {
        const type = file.type || '';
        return type.includes('audio/mpeg') ||
            type.includes('audio/mp3') ||
            type.includes('video/mp4');
    };

    const update = trpc.jobPosting.updateJobPost.useMutation();
    const handleSubmit = () => {
        update.mutate({
            ...form.getValues(),
            skillLevelIds: skillState.selected.map(level => level.id),
            candidateSourceIds: toolState.selected.map(tool => tool.id),
            id: jobPostId,
            deadline: form.getValues("deadline").toISOString(),
        });
    }


    return <CardLayout isOpen={isOpen} toggleOpen={() => setTab(tab === "select-category" ? "" : "select-category")} item={item} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 items-start w-full">
            <div className="flex flex-col items-start gap-0 w-full">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                        <span className="text-sub-600 font-medium text-sm">{t("skillLevels.title")}</span>
                        <span className="text-sub-600 font-normal text-sm">{t("skillLevels.max")}</span>
                        <Icons.info className="size-5 text-sub-600 ml-1" />
                    </div>
                </div>
                <CustomSelect
                    options={skillLevelOptions}
                    value={skillState.selectedValue}
                    onChange={handleSelectSkillLevel}
                    className="w-full mt-2"
                />
                <div className="flex flex-wrap gap-2 pt-2 w-full">
                    <AnimatePresence>
                        {skillState.selected.length > 0 && skillState.selected.map((skill) => (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center justify-center gap-0.5 pr-1 pl-2 h-6 rounded-md border border-soft-200 bg-white"
                            >
                                <span className="text-sub-600 text-xs font-medium">{skill.name}</span>
                                <button
                                    onClick={() => handleRemoveSkillLevel(skill.id)}
                                    className="flex items-center justify-center cursor-pointer"
                                >
                                    <Icons.close className="size-[14px] stroke-soft-400" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex flex-col items-start gap-0 w-full">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                        <span className="text-sub-600 font-medium text-sm">{t("tools.title")}</span>
                        <Icons.info className="size-5 text-sub-600 ml-1" />
                    </div>
                </div>
                <CustomSelect
                    options={toolOptions}
                    value={toolState.selectedValue}
                    onChange={handleSelectTool}
                    className="w-full mt-2"
                />
                <div className="flex flex-wrap gap-2 pt-2 w-full">
                    <AnimatePresence>
                        {toolState.selected.length > 0 && toolState.selected.map((tool) => (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center justify-center gap-0.5 pr-1 pl-2 h-6 rounded-md border border-soft-200 bg-white"
                            >
                                <span className="text-sub-600 text-xs font-medium">{tool.name}</span>
                                <button
                                    onClick={() => handleRemoveTool(tool.id)}
                                    className="flex items-center justify-center cursor-pointer"
                                >
                                    <Icons.close className="size-[14px] stroke-soft-400" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-col items-start gap-1">
                        <div className="flex flex-row items-center gap-1">
                            <p className="text-sub-600 font-medium text-sm">{t("files.title")}</p>
                            <span className="text-sub-600 font-normal text-sm">{t("files.limit")}</span>
                        </div>
                        <span className="text-sub-600 font-normal text-xs">{t("files.format")}</span>
                    </div>
                    <Button
                        variant="outline"
                        className="h-8 w-[68px] rounded-lg p-1.5 border-soft-200 text-sub-600 text-sm font-medium"
                        onClick={() => document.getElementById('file-upload')?.click()}
                        disabled={files.length >= 3 || isUploading}
                    >
                        {t("files.upload")}
                    </Button>
                    <Input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".mp3,.mp4,audio/mpeg,video/mp4"
                        disabled={files.length >= 3}
                    />
                </div>
                <audio ref={audioRef} className="hidden" onEnded={() => setPlayingFile(null)} />
                {files.length > 0 && (
                    <div className="mt-2 w-full space-y-3">
                        {files.map((file, index) => (
                            <div key={index} className="border border-soft-200 rounded-xl p-4 w-full">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        {isPlayableFile(file) ? (
                                            <div
                                                className="cursor-pointer hover:opacity-80 transition-opacity"
                                                onClick={() => togglePlay(index)}
                                            >
                                                {playingFile === index ? (
                                                    <Icons.pause_fill className="text-sub-600" />
                                                ) : (
                                                    <Icons.play_mini_fill className="text-sub-600" />
                                                )}
                                            </div>
                                        ) : (
                                            <Icons.file className="text-sub-600" />
                                        )}
                                        <div className="flex flex-col items-start gap-1">
                                            <p className="text-sm font-medium max-w-[200px] truncate">{file.name}</p>
                                            <p className="text-xs flex items-center gap-1 text-gray-500">
                                                {file.size ? (
                                                    file.size < 1024 * 1024
                                                        ? `${(file.size / 1024).toFixed(1)} KB`
                                                        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                                                ) : '0 KB'} •
                                                {isUploading ?
                                                    <span className="flex items-center gap-1">
                                                        <Icons.uploading className="animate-spin" />
                                                        {t("files.uploading")}
                                                    </span> :
                                                    <span className="flex items-center gap-1">
                                                        <Icons.select_box_circle />
                                                        {t("files.uploaded")}
                                                    </span>
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="cursor-pointer"
                                        disabled={isUploading || isDeleting === index}
                                    >
                                        {isDeleting === index ? (
                                            <Icons.uploading className="animate-spin" />
                                        ) : (
                                            <Icons.trash />
                                        )}
                                    </button>
                                </div>
                                {isUploading && <Progress value={uploadProgress} className="h-1" />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </CardLayout>
}

export default SelectCategory;