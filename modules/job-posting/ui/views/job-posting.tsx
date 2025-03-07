"use client"
import { useQueryState } from "nuqs";
import BasicInformation from "../sections/basic-information";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense } from "react";
import SelectCategory from "../sections/select-cateogry";
import Usage from "../sections/usage";
import Preview from "../sections/preview";

const formSchema = z.object({
    subject: z.string().min(1, { message: "Subject is required" }),
    detail: z.string().min(1, { message: "Detail is required" }),
    amount: z.number().min(1, { message: "Amount is required" }),
    deadline: z.date(),
    budgetConfirmed: z.boolean(),
});

export type jobPostingFormSchema = z.infer<typeof formSchema>;

const JobPostingSuspense = () => {
    const [tab, setTab] = useQueryState("tab", { defaultValue: "basic-information" });
    const form = useForm<jobPostingFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subject: "",
            detail: "",
            amount: 0,
            deadline: new Date(),
            budgetConfirmed: false,
        },
    });

    return (
        <div className="flex-1 mx-auto flex flex-col gap-5 justify-center items-center">
            <div className="flex flex-col items-center gap-1.5">
                <span className="text-main-900 font-medium text-3xl">Create job</span>
                <p className="text-[#525866] font-medium text-lg">Define details, set the budget and outline preferences</p>
            </div>
            <div className="flex flex-col gap-4">
                <BasicInformation form={form} />
                <SelectCategory />
                <Usage />
                <Preview />
            </div>
        </div>
    )
}

const JobPosting = () => {
    return (
        <Suspense fallback={<></>}>
            <JobPostingSuspense />
        </Suspense>
    )
}

export default JobPosting;