"use client"
import CardLayout from "../components/card-layout";
import { useQueryState } from "nuqs";
import { jobPostingMenu } from "@/lib/mockData";
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

interface SkillLevel {
    id: string;
    name: string;
}
const SelectCategory = ({ form }: { form: UseFormReturn<jobPostingFormSchema> }) => {
    const { data: skillsData } = trpc.jobPosting.getAllSkillLevels.useQuery();
    const { data: toolsData } = trpc.jobPosting.getAllCandidateSources.useQuery();
    const addAttachmentsMutation = trpc.jobPosting.addAttachmentsToJobPost.useMutation({
        onSuccess: (data) => {
            setIsUploading(false);
            setUploadProgress(100);
            toast.success("Files uploaded successfully");
        },
        onError: (error) => {
            setIsUploading(false);
            toast.error(`Upload failed: ${error.message}`);
        }
    });
    
    const [skillLevels, setSkillLevels] = useState<SkillLevel[]>([]);
    const [tools, setTools] = useState<SkillLevel[]>([]);
    const [selectedSkillLevels, setSelectedSkillLevels] = useState<SkillLevel[]>([]);
    const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>("");
    const [selectedTools, setSelectedTools] = useState<SkillLevel[]>([]);
    const [selectedTool, setSelectedTool] = useState<string>("");
    const [tab, setTab] = useQueryState("tab", { defaultValue: "basic-information" });

    const [files, setFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [jobPostId, setJobPostId] = useQueryState("id", { defaultValue: "" });
    
    const [playingFile, setPlayingFile] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const formSkillLevelIds = form.getValues("skillLevelIds");
        const formCandidateSourceIds = form.getValues("candidateSourceIds");

        if (skillsData && Array.isArray(skillsData) && formSkillLevelIds.length > 0) {
            const selectedLevels = skillsData.filter(level =>
                formSkillLevelIds.includes(level.id)
            );
            setSelectedSkillLevels(selectedLevels);
        }

        if (toolsData && Array.isArray(toolsData) && formCandidateSourceIds.length > 0) {
            const selectedToolItems = toolsData.filter(tool =>
                formCandidateSourceIds.includes(tool.id)
            );
            setSelectedTools(selectedToolItems);
        }
    }, [skillsData, toolsData, form]);

    useEffect(() => {
        if (skillsData && Array.isArray(skillsData)) {
            setSkillLevels(skillsData);
        }
    }, [skillsData]);

    useEffect(() => {
        if (toolsData && Array.isArray(toolsData)) {
            setTools(toolsData);
        }
    }, [toolsData]);

    useEffect(() => {
        const skillLevelIds = selectedSkillLevels.map(level => level.id);
        form.setValue("skillLevelIds", skillLevelIds);
    }, [selectedSkillLevels, form]);

    useEffect(() => {
        const candidateSourceIds = selectedTools.map(tool => tool.id);
        form.setValue("candidateSourceIds", candidateSourceIds);
    }, [selectedTools, form]);

    const isOpen = tab === "select-category";
    const item = jobPostingMenu.find((item) => item.value === "select-category");

    const skillLevelOptions = skillLevels
        .filter(level => !selectedSkillLevels.some(selected => selected.id === level.id))
        .map(level => ({
            value: level.id,
            label: level.name
        }));

    const toolOptions = tools
        .filter(tool => !selectedTools.some(selected => selected.id === tool.id))
        .map(tool => ({
            value: tool.id,
            label: tool.name
        }));

    const handleSelectSkillLevel = (value: string) => {
        const selectedLevel = skillLevels.find(level => level.id === value);
        if (selectedLevel && selectedSkillLevels.length < 4 && !selectedSkillLevels.some(level => level.id === value)) {
            setSelectedSkillLevels([...selectedSkillLevels, selectedLevel]);
            setSelectedSkillLevel("");
        }
    };

    const handleSelectTool = (value: string) => {
        const selectedTool = tools.find(tool => tool.id === value);
        if (selectedTool && selectedTools.length < 4 && !selectedTools.some(tool => tool.id === value)) {
            setSelectedTools([...selectedTools, selectedTool]);
            setSelectedTool("");
        }
    };

    const handleRemoveSkillLevel = (id: string) => {
        setSelectedSkillLevels(selectedSkillLevels.filter(level => level.id !== id));
    };

    const handleRemoveTool = (id: string) => {
        setSelectedTools(selectedTools.filter(tool => tool.id !== id));
    };

    const handleClearAll = () => {
        setSelectedSkillLevels([]);
    };

    const handleClearAllTools = () => {
        setSelectedTools([]);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            
            const invalidFiles = newFiles.filter(file => 
                !file.type.includes('audio/mpeg') && 
                !file.type.includes('audio/mp3') && 
                !file.type.includes('video/mp4')
            );
            
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
            
            if (files.length + newFiles.length > 3) {
                toast.error('You can upload a maximum of 3 files');
                return;
            }
            
            setFiles(prev => [...prev, ...newFiles]);
            
            setIsUploading(true);
            setUploadProgress(0);
            
            if (!jobPostId) {
                toast.error("Please save the job post first before uploading attachments");
                setIsUploading(false);
                return;
            }
            
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
                await addAttachmentsMutation.mutateAsync({
                    jobPostId: jobPostId,
                    attachments: newFiles
                });
                
                clearInterval(progressInterval);
                setUploadProgress(100);
                
            } catch (error) {
                clearInterval(progressInterval);
                setUploadProgress(0);
            }
        }
    };

    const removeFile = (index: number) => {
        if (playingFile === index) {
            // Stop playing if removing the currently playing file
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setPlayingFile(null);
        } else if (playingFile !== null && playingFile > index) {
            setPlayingFile(playingFile - 1);
        }
        setFiles(prev => prev.filter((_, i) => i !== index));
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
        return file.type.includes('audio/mpeg') || 
               file.type.includes('audio/mp3') || 
               file.type.includes('video/mp4');
    };

    return <CardLayout isOpen={isOpen} toggleOpen={() => setTab(tab === "select-category" ? "" : "select-category")} item={item}>
        <div className="flex flex-col gap-5 items-start w-full">
            <div className="flex flex-col items-start gap-0 w-full">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                        <span className="text-sub-600 font-medium text-sm">Skill Levels</span>
                        <span className="text-sub-600 font-normal text-sm">(max. 4)</span>
                        <Icons.info className="size-5 text-sub-600 ml-1" />
                    </div>
                </div>
                <CustomSelect
                    options={skillLevelOptions}
                    value={selectedSkillLevel}
                    onChange={handleSelectSkillLevel}
                    className="w-full mt-2"
                />
                <div className="flex flex-wrap gap-2 pt-2 w-full">
                    <AnimatePresence>
                        {selectedSkillLevels.length > 0 ? (
                            selectedSkillLevels.map((skill) => (
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
                            ))
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex flex-col items-start gap-0 w-full">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                        <span className="text-sub-600 font-medium text-sm">Tools</span>
                        <Icons.info className="size-5 text-sub-600 ml-1" />
                    </div>
                </div>
                <CustomSelect
                    options={toolOptions}
                    value={selectedTool}
                    onChange={handleSelectTool}
                    className="w-full mt-2"
                />
                <div className="flex flex-wrap gap-2 pt-2 w-full">
                    <AnimatePresence>
                        {selectedTools.length > 0 ? (
                            selectedTools.map((tool) => (
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
                            ))
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-col items-start gap-1">
                        <div className="flex flex-row items-center gap-1">
                            <p className="text-sub-600 font-medium text-sm">Add Download File</p>
                            <span className="text-sub-600 font-normal text-sm">(Up to 3 audio files)</span>
                        </div>
                        <span className="text-sub-600 font-normal text-xs">MP3 format and 25 mb size limitations</span>
                    </div>
                    <Button
                        variant="outline"
                        className="h-8 w-[68px] rounded-lg p-1.5 border-soft-200 text-sub-600 text-sm font-medium"
                        onClick={() => document.getElementById('file-upload')?.click()}
                        disabled={files.length >= 3 || isUploading}
                    >
                        Upload
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

                {/* Hidden audio element for playing files */}
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
                                            <p className="text-sm font-medium">{file.name}</p>
                                            <p className="text-xs flex items-center gap-1 text-gray-500">
                                                {Math.round(file.size / 1024)} KB •
                                                {isUploading ?
                                                    <span className="flex items-center gap-1">
                                                        <Icons.uploading className="animate-spin" />
                                                        Uploading...
                                                    </span> :
                                                    <span className="flex items-center gap-1">
                                                        <Icons.select_box_circle />
                                                        Uploaded
                                                    </span>
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="cursor-pointer"
                                        disabled={isUploading}
                                    >
                                        <Icons.trash />
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