"use client"
import CardLayout from "../components/card-layout";
import { useQueryState } from "nuqs";
import { jobPostingMenu } from "@/lib/mockData";
import CustomSelect from "@/components/custom/select";
import { useState, useEffect } from "react";
import { Icons } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { X } from "lucide-react";
import { trpc } from "@/trpc/client";
import { UseFormReturn } from "react-hook-form";
import { jobPostingFormSchema } from "../views/job-posting";

interface SkillLevel {
    id: string;
    name: string;
}
const SelectCategory = ({ form }: { form: UseFormReturn<jobPostingFormSchema> }) => {
    const { data: skillsData } = trpc.jobPosting.getAllSkillLevels.useQuery();
    const { data: toolsData } = trpc.jobPosting.getAllCandidateSources.useQuery();
    const [skillLevels, setSkillLevels] = useState<SkillLevel[]>([]);
    const [tools, setTools] = useState<SkillLevel[]>([]);
    const [selectedSkillLevels, setSelectedSkillLevels] = useState<SkillLevel[]>([]);
    const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>("");
    const [selectedTools, setSelectedTools] = useState<SkillLevel[]>([]);
    const [selectedTool, setSelectedTool] = useState<string>("");
    const [tab, setTab] = useQueryState("tab", { defaultValue: "basic-information" });

    // PDF upload states
    const [pdfFiles, setPdfFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    // Initialize from form values if they exist
    useEffect(() => {
        const formSkillLevelIds = form.getValues("skillLevelIds");
        const formCandidateSourceIds = form.getValues("candidateSourceIds");

        // If we have form values and API data, initialize selected items
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

    // Update form values when selections change
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFile = e.target.files[0];

            // Check if file is PDF
            if (!newFile.type.includes('pdf')) {
                alert('Please upload a PDF file');
                return;
            }

            // Check file size (max 25MB)
            if (newFile.size > 25 * 1024 * 1024) {
                alert('File size should not exceed 25MB');
                return;
            }

            setPdfFiles([newFile]);

            // Simulate upload progress
            setIsUploading(true);
            setUploadProgress(0);

            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsUploading(false);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 300);
        }
    };

    const removeFile = () => {
        setPdfFiles([]);
        setUploadProgress(0);
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
                    {selectedSkillLevels.length > 0 && (
                        <span
                            className="text-sub-600 font-medium text-xs border-b border-sub-600 cursor-pointer"
                            onClick={handleClearAll}
                        >
                            Clear
                        </span>
                    )}
                </div>
                {skillLevelOptions.length > 0 && selectedSkillLevels.length < 4 && (
                    <CustomSelect
                        options={skillLevelOptions}
                        value={selectedSkillLevel}
                        onChange={handleSelectSkillLevel}
                        className="w-full mt-2"
                    />
                )}
                <div className="flex flex-wrap gap-2 pt-2 w-full">
                    <AnimatePresence>
                        {selectedSkillLevels.length > 0 ? (
                            selectedSkillLevels.map((skill) => (
                                <motion.div
                                    key={skill.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex items-center justify-center gap-0.5 pr-1 pl-2 h-6 rounded-md border border-sub-600 bg-white"
                                >
                                    <span className="text-sub-600 text-xs font-medium">{skill.name}</span>
                                    <button
                                        onClick={() => handleRemoveSkillLevel(skill.id)}
                                        className="flex items-center justify-center cursor-pointer"
                                    >
                                        <Icons.close className="size-[14px] stroke-sub-600" />
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
                    {selectedTools.length > 0 && (
                        <span
                            className="text-sub-600 font-medium text-xs border-b border-sub-600 cursor-pointer"
                            onClick={handleClearAllTools}
                        >
                            Clear
                        </span>
                    )}
                </div>
                {toolOptions.length > 0 && selectedTools.length < 4 && (
                    <CustomSelect
                        options={toolOptions}
                        value={selectedTool}
                        onChange={handleSelectTool}
                        className="w-full mt-2"
                    />
                )}
                <div className="flex flex-wrap gap-2 pt-2 w-full">
                    <AnimatePresence>
                        {selectedTools.length > 0 ? (
                            selectedTools.map((tool) => (
                                <motion.div
                                    key={tool.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex items-center justify-center gap-0.5 pr-1 pl-2 h-6 rounded-md border border-sub-600 bg-white"
                                >
                                    <span className="text-sub-600 text-xs font-medium">{tool.name}</span>
                                    <button
                                        onClick={() => handleRemoveTool(tool.id)}
                                        className="flex items-center justify-center cursor-pointer"
                                    >
                                        <Icons.close className="size-[14px] stroke-sub-600" />
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
                            <span className="text-sub-600 font-normal text-sm">(PDF files only)</span>
                        </div>
                        <span className="text-sub-600 font-normal text-xs">PDF format and 25 MB size limitation</span>
                    </div>
                    <Button
                        variant="outline"
                        className="h-8 w-[68px] rounded-lg p-1.5 border-soft-200 text-sub-600 text-sm font-medium"
                        onClick={() => document.getElementById('pdf-upload')?.click()}
                    >
                        Upload
                    </Button>
                    <Input
                        type="file"
                        id="pdf-upload"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf"
                    />
                </div>

                {pdfFiles.length > 0 && (
                    <div className="mt-2 border border-soft-200 rounded-xl p-4 w-full">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col items-start gap-1">
                                    <p className="text-sm font-medium">{pdfFiles[0].name}</p>
                                    <p className="text-xs flex items-center gap-1 text-gray-500">
                                        {Math.round(pdfFiles[0].size / 1024)} KB •
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
                                onClick={removeFile}
                                className="cursor-pointer"
                            >
                                <Icons.trash />
                            </button>
                        </div>
                        <Progress value={uploadProgress} className="h-1" />
                    </div>
                )}
            </div>
        </div>
    </CardLayout>
}

export default SelectCategory;