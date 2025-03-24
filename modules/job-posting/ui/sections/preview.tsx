"use client"
import CardLayout from "../components/card-layout";
import { useMockData } from "@/lib/mockData";
import { useQueryState } from "nuqs";
import { UseFormReturn } from "react-hook-form";
import { jobPostingFormSchema } from "../views/job-posting";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import TransactionMethodDetails from "@/components/custom/modals/transaction-method-details";

interface SkillLevel {
    id: string;
    name: string;
}

const Preview = ({ form }: { form: UseFormReturn<jobPostingFormSchema> }) => {
    const [tab, setTab] = useQueryState("tab", { defaultValue: "basic-information" });
    const { jobPostingMenu } = useMockData();
    const isOpen = tab === "preview";
    const item = jobPostingMenu.find((item) => item.value === "preview");
    const { data: skillsData } = trpc.jobPosting.getAllSkillLevels.useQuery();
    const { data: toolsData } = trpc.jobPosting.getAllCandidateSources.useQuery();
    const utils = trpc.useUtils();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedSkillLevels, setSelectedSkillLevels] = useState<SkillLevel[]>([]);
    const [selectedTools, setSelectedTools] = useState<SkillLevel[]>([]);

    // Watch for changes in form values
    useEffect(() => {
        const subscription = form.watch((value) => {
            // Update skill levels when form values change
            if (skillsData && Array.isArray(skillsData) && value.skillLevelIds && Array.isArray(value.skillLevelIds)) {
                const selectedLevels = skillsData.filter(level =>
                    value.skillLevelIds!.includes(level.id)
                );
                setSelectedSkillLevels(selectedLevels);
            }

            // Update tools when form values change
            if (toolsData && Array.isArray(toolsData) && value.candidateSourceIds && Array.isArray(value.candidateSourceIds)) {
                const selectedToolItems = toolsData.filter(tool =>
                    value.candidateSourceIds!.includes(tool.id)
                );
                setSelectedTools(selectedToolItems);
            }
        });

        return () => subscription.unsubscribe();
    }, [form, skillsData, toolsData]);

    // Initial load of skill levels and tools data
    useEffect(() => {
        if (skillsData && Array.isArray(skillsData)) {
            const formSkillLevelIds = form.getValues("skillLevelIds");
            const selectedLevels = skillsData.filter(level =>
                formSkillLevelIds.includes(level.id)
            );
            setSelectedSkillLevels(selectedLevels);
        }
    }, [skillsData, form]);

    useEffect(() => {
        if (toolsData && Array.isArray(toolsData)) {
            const formCandidateSourceIds = form.getValues("candidateSourceIds");
            const selectedToolItems = toolsData.filter(tool =>
                formCandidateSourceIds.includes(tool.id)
            );
            setSelectedTools(selectedToolItems);
        }
    }, [toolsData, form]);

    const create = trpc.jobPosting.createJob.useMutation({
        onSuccess: (data) => {
            toast.success("Job posting created successfully");
            utils.jobPosting.getMyJobPosts.invalidate();
            setIsModalOpen(true);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create job posting");
        }
    })

    const handleSubmit = () => {
        const formData = form.getValues();
        create.mutate({
            ...formData,
            salaryCurrency: "CNY",
            deadline: formData.deadline.toISOString(),
            usage: formData.usage ? formData.usage.toUpperCase() : "PRIVATE",
            privacy: formData.privacy ? formData.privacy.toUpperCase() : "PRIVATE",
        });

    }

    const formattedDeadline = form.getValues("deadline")
        ? format(new Date(form.getValues("deadline")), "dd MMM, yyyy")
        : "Not set";

    const formattedAmount = form.getValues("salary")
        ? `¥ ${form.getValues("salary")}`
        : "Not set";

    return <CardLayout isOpen={isOpen} toggleOpen={() => setTab(tab === "preview" ? "" : "preview")} item={item} onSubmit={handleSubmit} loading={create.isPending}>
        <div className="w-full flex flex-col gap-0">
            <div className="flex flex-col gap-0">
                <span className="bg-weak-50 py-1.5 px-3  h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    STEP 1 DESCRIPTON
                </span>
                <div className="p-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sub-600 font-medium text-sm">Subject</h3>
                        <p className="text-sub-600 font-normal text-sm">{form.getValues("subject") || "Not provided"}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sub-600 font-medium text-sm">Detail</h3>
                        <p className="text-sub-600 font-normal text-sm">{form.getValues("detail") || "Not provided"}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-0">
                <span className="bg-weak-50 py-1.5 px-3 h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    STEP 2 TAGS
                </span>
                <div className="p-4 flex flex-col gap-8">
                    {/* Experience Levels */}
                    <div className="flex flex-row justify-between gap-10 items-start">
                        <h3 className="text-gray-600 text-sm font-normal shrink-0">Experience Levels</h3>
                        <div className="flex flex-wrap gap-2 justify-end">
                            {selectedSkillLevels.length > 0 ? (
                                selectedSkillLevels.map(skill => (
                                    <div key={skill.id} className="border border-soft-200 h-6 py-1 px-2 rounded-md text-sub-600 font-medium text-xs">
                                        {skill.name}
                                    </div>
                                ))
                            ) : (
                                <span className="text-sub-600 text-xs">No skill levels selected</span>
                            )}
                        </div>
                    </div>

                    {/* Candidate Sources */}
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="text-gray-600 text-sm font-normal">Candidate Sources</h3>
                        <div className="flex flex-wrap gap-3 justify-end">
                            {selectedTools.length > 0 ? (
                                selectedTools.map(tool => (
                                    <div key={tool.id} className="border border-soft-200 h-6 py-1 px-2 rounded-md text-sub-600 font-medium text-xs">
                                        {tool.name}
                                    </div>
                                ))
                            ) : (
                                <span className="text-sub-600 text-xs">No candidate sources selected</span>
                            )}
                        </div>
                    </div>

                    {/* File */}
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="text-gray-600 text-sm font-normal">File</h3>
                        <span className="text-sub-600 text-sm font-medium">
                            No file uploaded
                        </span>
                    </div>
                </div>
            </div>


            <div className="flex flex-col gap-0">
                <span className="bg-weak-50 py-1.5 px-3 h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    STEP 3 PRIVACY
                </span>
                <div className="p-4 flex flex-col gap-3">
                    {form.getValues("usage") === "business" && (
                        <div className="flex flex-col items-start gap-2">
                            <p className="text-sub-600 font-medium text-sm">Business</p>
                            <span className="text-sub-600 font-normal text-xs">For purposes such as signing contracts and issuing.</span>
                        </div>
                    )}
                    {form.getValues("usage") === "private" && (
                        <div className="flex flex-col items-start gap-2">
                            <p className="text-sub-600 font-medium text-sm">Private</p>
                            <span className="text-sub-600 font-normal text-xs">For purposes such as hobbies and interests.</span>
                        </div>
                    )}
                    {!form.getValues("usage") && (
                        <div className="flex flex-col items-start gap-2">
                            <p className="text-sub-600 font-medium text-sm">No usage type selected</p>
                        </div>
                    )}

                    {form.getValues("privacy") === "public" && (
                        <div className="flex flex-col items-start gap-2.5">
                            <p className="text-sub-600 font-medium text-sm">Public</p>
                            <span className="text-sub-600 font-normal text-xs">Any worker can apply for the job.</span>
                        </div>
                    )}
                    {form.getValues("privacy") === "private" && (
                        <div className="flex flex-col items-start gap-2.5">
                            <p className="text-sub-600 font-medium text-sm">Private</p>
                            <span className="text-sub-600 font-normal text-xs">Only those who have been invited can take part in the work.</span>
                        </div>
                    )}
                    {!form.getValues("privacy") && (
                        <div className="flex flex-col items-start gap-2.5">
                            <p className="text-sub-600 font-medium text-sm">No privacy type selected</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-0">
                <span className="bg-weak-50 py-1.5 px-3 h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    STEP 4 ORDER AMOUNT & DATE
                </span>
                <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <p className="font-normal text-sm text-sub-600">Deadline</p>
                        <span className="text-strong-950 text-sm font-medium">{formattedDeadline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-normal text-sm text-sub-600">Order Amount</p>
                        <span className="text-strong-950 text-sm font-medium">{formattedAmount}</span>
                    </div>
                    {form.getValues("budgetsActive") && (
                        <div className="flex items-center justify-between">
                            <p className="font-normal text-sm text-sub-600">Budget to be confirmed</p>
                            <span className="text-strong-950 text-sm font-medium">Yes</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <TransactionMethodDetails open={isModalOpen} setOpen={setIsModalOpen} />
    </CardLayout>
}

export default Preview;