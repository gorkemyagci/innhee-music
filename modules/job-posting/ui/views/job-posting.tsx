"use client"
import { useQueryState } from "nuqs";
import BasicInformation from "../sections/basic-information";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useEffect, useState } from "react";
import SelectCategory from "../sections/select-cateogry";
import Usage from "../sections/usage";
import Preview from "../sections/preview";
import { trpc } from "@/trpc/client";
import JobPostingSkeleton from "../components/skeleton";
import { useTranslations } from "next-intl";

export const formSchema = z.object({
    subject: z.string().min(1, { message: "Subject is required" }),
    detail: z.string().min(1, { message: "Detail is required" }),
    salary: z.number().min(1, { message: "Salary is required" }),
    salaryCurrency: z.string(),
    deadline: z.date(),
    budgetsActive: z.boolean(),
    usage: z.string(),
    privacy: z.string(),
    skillLevelIds: z.array(z.string()),
    candidateSourceIds: z.array(z.string()),
    status: z.string(),
    attachments: z.array(z.object({
        id: z.string(),
        name: z.string(),
        type: z.string(),
        size: z.number()
    })).optional()
});

export type jobPostingFormSchema = z.infer<typeof formSchema>;

const JobPostingSuspense = () => {
    const t = useTranslations("jobPosting");
    const [jobPostId] = useQueryState("id", { defaultValue: "" });
    const { data } = trpc.jobPosting.getJobPostById.useQuery({
        id: jobPostId
    }, {
        enabled: !!jobPostId
    });

    const [selectedSkillLevels, setSelectedSkillLevels] = useState<Array<{ id: string; name: string }>>([]);
    const [selectedCandidateSources, setSelectedCandidateSources] = useState<Array<{ id: string; name: string }>>([]);

    const form = useForm<jobPostingFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subject: "",
            detail: "",
            salary: 0,
            salaryCurrency: "CNY",
            deadline: new Date(),
            budgetsActive: false,
            usage: "",
            privacy: "",
            skillLevelIds: [],
            candidateSourceIds: [],
            status: "INACTIVE",
            attachments: []
        },
    });

    useEffect(() => {
        if (data) {
            if (data.skillLevels) {
                setSelectedSkillLevels(data.skillLevels.map((level: { id: string; name: string }) => ({
                    id: level.id,
                    name: level.name
                })));
            }
            if (data.candidateSources) {
                setSelectedCandidateSources(data.candidateSources.map((source: { id: string; name: string }) => ({
                    id: source.id,
                    name: source.name
                })));
            }
            form.reset({
                subject: data.subject,
                detail: data.detail,
                salary: data.salary,
                salaryCurrency: data.salaryCurrency,
                deadline: new Date(data.deadline),
                budgetsActive: data.budgetsActive,
                usage: data.usage,
                privacy: data.privacy,
                skillLevelIds: data.skillLevels?.map((level: { id: string }) => level.id) || [],
                candidateSourceIds: data.candidateSources?.map((source: { id: string }) => source.id) || [],
                status: data.status,
                attachments: data.attachments?.map((attachment: { id: string; filename: string }) => ({
                    id: attachment.id,
                    name: attachment.filename,
                    type: attachment.filename.endsWith('.mp4') ? 'video/mp4' : 'audio/mpeg',
                    size: 0
                })) || []
            });
        }
    }, [data, form]);

    return (
        <>
            <div className="flex-1 mx-auto flex flex-col gap-5 justify-center items-center">
                <div className="flex flex-col items-center gap-1.5">
                    <span className="text-main-900 font-medium text-[32px]">{jobPostId ? t("editJob") : t("createJob")}</span>
                    <p className="text-[#525866] font-medium text-lg">{t("subtitle")}</p>
                </div>
                <div className="flex flex-col gap-8 pb-20 md:pb-0">
                    <BasicInformation form={form} />
                    <SelectCategory 
                        form={form} 
                        initialSelectedSkillLevels={selectedSkillLevels}
                        initialSelectedCandidateSources={selectedCandidateSources}
                    />
                    <Usage form={form} />
                    <Preview form={form} />
                </div>
            </div>
        </>
    )
}

const JobPosting = () => {
    return (
        <Suspense fallback={<JobPostingSkeleton />}>
            <JobPostingSuspense />
        </Suspense>
    )
}

export default JobPosting;