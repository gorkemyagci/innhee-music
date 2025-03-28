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
import { useTranslations } from "next-intl";

interface SkillLevel {
    id: string;
    name: string;
}

const Preview = ({ form }: { form: UseFormReturn<jobPostingFormSchema> }) => {
    const t = useTranslations("jobPosting.preview");
    const [tab, setTab] = useQueryState("tab", { defaultValue: "basic-information" });
    const { jobPostingMenu } = useMockData();
    const isOpen = tab === "preview";
    const item = jobPostingMenu.find((item) => item.value === "preview");
    const { data: skillsData } = trpc.jobPosting.getAllSkillLevels.useQuery();
    const { data: toolsData } = trpc.jobPosting.getAllCandidateSources.useQuery();
    const utils = trpc.useUtils();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useQueryState("id", { defaultValue: "" });

    const [selectedSkillLevels, setSelectedSkillLevels] = useState<SkillLevel[]>([]);
    const [selectedTools, setSelectedTools] = useState<SkillLevel[]>([]);

    useEffect(() => {
        const subscription = form.watch((value) => {
            if (skillsData && Array.isArray(skillsData) && value.skillLevelIds && Array.isArray(value.skillLevelIds)) {
                const selectedLevels = skillsData.filter(level =>
                    value.skillLevelIds!.includes(level.id)
                );
                setSelectedSkillLevels(selectedLevels);
            }
            if (toolsData && Array.isArray(toolsData) && value.candidateSourceIds && Array.isArray(value.candidateSourceIds)) {
                const selectedToolItems = toolsData.filter(tool =>
                    value.candidateSourceIds!.includes(tool.id)
                );
                setSelectedTools(selectedToolItems);
            }
        });

        return () => subscription.unsubscribe();
    }, [form, skillsData, toolsData]);

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

    const update = trpc.jobPosting.updateJobPost.useMutation({
        onSuccess: () => {
            toast.success(t("updateSuccess"));
            utils.jobPosting.getMyJobPosts.invalidate();
            setIsModalOpen(true);
        },
        onError: (error) => {
            toast.error(error.message || t("updateError"));
        }
    })

    const handleSubmit = () => {
        const formData = form.getValues();
        update.mutate({
            ...formData,
            salaryCurrency: "CNY",
            deadline: formData.deadline.toISOString(),
            usage: formData.usage ? formData.usage.toUpperCase() : "PRIVATE",
            privacy: formData.privacy ? formData.privacy.toUpperCase() : "PRIVATE",
            status: "ACTIVE",
            id: id
        });
    }

    const formattedDeadline = form.getValues("deadline")
        ? format(new Date(form.getValues("deadline")), "dd MMM, yyyy")
        : t("notSet");

    const formattedAmount = form.getValues("salary")
        ? `¥ ${form.getValues("salary")}`
        : t("notSet");

    const getUsageValue = () => {
        const usage = form.getValues("usage");
        return usage ? usage.toLowerCase() : "";
    };

    const getPrivacyValue = () => {
        const privacy = form.getValues("privacy");
        return privacy ? privacy.toLowerCase() : "";
    };

    return <CardLayout isOpen={isOpen} toggleOpen={() => setTab(tab === "preview" ? "" : "preview")} item={item} onSubmit={handleSubmit} loading={update.isPending}>
        <div className="w-full flex flex-col gap-0">
            <div className="flex flex-col gap-0">
                <span className="bg-weak-50 py-1.5 px-3  h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    {t("step1.title")}
                </span>
                <div className="p-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sub-600 font-medium text-sm">{t("step1.subject")}</h3>
                        <p className="text-sub-600 font-normal text-sm">{form.getValues("subject") || t("notProvided")}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sub-600 font-medium text-sm">{t("step1.detail")}</h3>
                        <p className="text-sub-600 font-normal text-sm">{form.getValues("detail") || t("notProvided")}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-0">
                <span className="bg-weak-50 py-1.5 px-3 h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    {t("step2.title")}
                </span>
                <div className="p-4 flex flex-col gap-8">
                    <div className="flex flex-row justify-between gap-10 items-start">
                        <h3 className="text-gray-600 text-sm font-normal shrink-0">{t("step2.experienceLevels")}</h3>
                        <div className="flex flex-wrap gap-2 justify-end">
                            {selectedSkillLevels.length > 0 ? (
                                selectedSkillLevels.map(skill => (
                                    <div key={skill.id} className="border border-soft-200 h-6 py-1 px-2 rounded-md text-sub-600 font-medium text-xs">
                                        {skill.name}
                                    </div>
                                ))
                            ) : (
                                <span className="text-sub-600 text-xs">{t("step2.noSkillLevels")}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="text-gray-600 text-sm font-normal">{t("step2.candidateSources")}</h3>
                        <div className="flex flex-wrap gap-3 justify-end">
                            {selectedTools.length > 0 ? (
                                selectedTools.map(tool => (
                                    <div key={tool.id} className="border border-soft-200 h-6 py-1 px-2 rounded-md text-sub-600 font-medium text-xs">
                                        {tool.name}
                                    </div>
                                ))
                            ) : (
                                <span className="text-sub-600 text-xs">{t("step2.noCandidateSources")}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="text-gray-600 text-sm font-normal">{t("step2.file")}</h3>
                        <span className="text-sub-600 text-sm font-medium">
                            {t("step2.noFile")}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-0">
                <span className="bg-weak-50 py-1.5 px-3 h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    {t("step3.title")}
                </span>
                <div className="p-4 flex flex-col gap-3">
                    {getUsageValue() === "business" && (
                        <div className="flex flex-col items-start gap-2">
                            <p className="text-sub-600 font-medium text-sm">{t("step3.business.title")}</p>
                            <span className="text-sub-600 font-normal text-xs">{t("step3.business.description")}</span>
                        </div>
                    )}
                    {getUsageValue() === "private" && (
                        <div className="flex flex-col items-start gap-2">
                            <p className="text-sub-600 font-medium text-sm">{t("step3.private.title")}</p>
                            <span className="text-sub-600 font-normal text-xs">{t("step3.private.description")}</span>
                        </div>
                    )}
                    {!getUsageValue() && (
                        <div className="flex flex-col items-start gap-2">
                            <p className="text-sub-600 font-medium text-sm">{t("step3.noUsage")}</p>
                        </div>
                    )}

                    {getPrivacyValue() === "public" && (
                        <div className="flex flex-col items-start gap-2.5">
                            <p className="text-sub-600 font-medium text-sm">{t("step3.public.title")}</p>
                            <span className="text-sub-600 font-normal text-xs">{t("step3.public.description")}</span>
                        </div>
                    )}
                    {getPrivacyValue() === "private" && (
                        <div className="flex flex-col items-start gap-2.5">
                            <p className="text-sub-600 font-medium text-sm">{t("step3.private.title")}</p>
                            <span className="text-sub-600 font-normal text-xs">{t("step3.private.description")}</span>
                        </div>
                    )}
                    {!getPrivacyValue() && (
                        <div className="flex flex-col items-start gap-2.5">
                            <p className="text-sub-600 font-medium text-sm">{t("step3.noPrivacy")}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-0">
                <span className="bg-weak-50 py-1.5 px-3 h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    {t("step4.title")}
                </span>
                <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <p className="font-normal text-sm text-sub-600">{t("step4.deadline")}</p>
                        <span className="text-strong-950 text-sm font-medium">{formattedDeadline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-normal text-sm text-sub-600">{t("step4.orderAmount")}</p>
                        <span className="text-strong-950 text-sm font-medium">{formattedAmount}</span>
                    </div>
                    {form.getValues("budgetsActive") && (
                        <div className="flex items-center justify-between">
                            <p className="font-normal text-sm text-sub-600">{t("step4.budgetConfirm")}</p>
                            <span className="text-strong-950 text-sm font-medium">{t("step4.yes")}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <TransactionMethodDetails open={isModalOpen} setOpen={setIsModalOpen} />
    </CardLayout>
}

export default Preview;