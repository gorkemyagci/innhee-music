"use client"
import { Checkbox } from "@/components/ui/checkbox";
import CardLayout from "../components/card-layout";
import { useMockData } from "@/lib/mockData";
import { useQueryState } from "nuqs";
import { UseFormReturn } from "react-hook-form";
import { jobPostingFormSchema } from "../views/job-posting";
import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import { useTranslations } from "next-intl";

const Usage = ({ form }: { form: UseFormReturn<jobPostingFormSchema> }) => {
    const t = useTranslations("jobPosting.usage");
    const [tab, setTab] = useQueryState("tab", { defaultValue: "basic-information" });
    const [jobPostId] = useQueryState("id", { defaultValue: "" });
    const [usageType, setUsageType] = useState<string>("");
    const [privacyType, setPrivacyType] = useState<string>("");
    const { jobPostingMenu } = useMockData();
    
    const isOpen = tab === "usage";
    const item = jobPostingMenu.find((item) => item.value === "usage");
    
    // Initialize from form values
    useEffect(() => {
        const formUsage = form.getValues("usage");
        const formPrivacy = form.getValues("privacy");
        
        if (formUsage) {
            setUsageType(formUsage.toLowerCase());
        }
        
        if (formPrivacy) {
            setPrivacyType(formPrivacy.toLowerCase());
        }
    }, [form]);
    
    // Update form when values change
    useEffect(() => {
        form.setValue("usage", usageType.toUpperCase());
    }, [usageType, form]);
    
    useEffect(() => {
        form.setValue("privacy", privacyType.toUpperCase());
    }, [privacyType, form]);
    
    const handleUsageChange = (checked: boolean, value: string) => {
        if (checked) {
            setUsageType(value.toLowerCase());
        } else {
            setUsageType("");
        }
    };
    
    const handlePrivacyChange = (checked: boolean, value: string) => {
        if (checked) {
            setPrivacyType(value.toLowerCase());
        } else {
            setPrivacyType("");
        }
    };

    const update = trpc.jobPosting.updateJobPost.useMutation();

    const handleSubmit = () => {
        update.mutate({
            ...form.getValues(),
            id: jobPostId,
            usage: usageType.toUpperCase(),
            privacy: privacyType.toUpperCase(),
            deadline: form.getValues("deadline").toISOString(),
        });
    }
    return <CardLayout isOpen={isOpen} toggleOpen={() => setTab(tab === "usage" ? "" : "usage")} item={item} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 items-start w-full">
            <div className="flex flex-col gap-4 w-full">
                <span className="bg-weak-50 py-1.5 px-3 rounded-md h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    {t("usageSection.title")}
                </span>
                <div className="flex flex-col items-start gap-4">
                    <div className="flex items-start gap-2">
                        <Checkbox 
                            checked={usageType === "business"} 
                            onCheckedChange={(checked) => handleUsageChange(checked as boolean, "business")}
                            className="data-[state=checked]:bg-[#525866] data-[state=checked]:border-[#525866] cursor-pointer" 
                        />
                        <div className="flex flex-col items-start gap-2">
                            <span className="text-sub-600 font-medium text-sm">{t("usageSection.business.title")}</span>
                            <span className="text-sub-600 font-normal text-xs">{t("usageSection.business.description")}</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Checkbox 
                            checked={usageType === "private"} 
                            onCheckedChange={(checked) => handleUsageChange(checked as boolean, "private")}
                            className="data-[state=checked]:bg-[#525866] data-[state=checked]:border-[#525866] cursor-pointer" 
                        />
                        <div className="flex flex-col items-start gap-2">
                            <span className="text-sub-600 font-medium text-sm">{t("usageSection.private.title")}</span>
                            <span className="text-sub-600 font-normal text-xs">{t("usageSection.private.description")}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <span className="bg-weak-50 py-1.5 px-3 rounded-md h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    {t("privacySection.title")}
                </span>
                <div className="flex flex-col items-start gap-4">
                    <div className="flex items-start gap-2">
                        <Checkbox 
                            checked={privacyType === "public"} 
                            onCheckedChange={(checked) => handlePrivacyChange(checked as boolean, "public")}
                            className="data-[state=checked]:bg-[#525866] data-[state=checked]:border-[#525866] cursor-pointer" 
                        />
                        <div className="flex flex-col items-start gap-2">
                            <span className="text-sub-600 font-medium text-sm">{t("privacySection.public.title")}</span>
                            <span className="text-sub-600 font-normal text-xs">{t("privacySection.public.description")}</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Checkbox 
                            checked={privacyType === "private"} 
                            onCheckedChange={(checked) => handlePrivacyChange(checked as boolean, "private")}
                            className="data-[state=checked]:bg-[#525866] data-[state=checked]:border-[#525866] cursor-pointer" 
                        />
                        <div className="flex flex-col items-start gap-2">
                            <span className="text-sub-600 font-medium text-sm">{t("privacySection.private.title")}</span>
                            <span className="text-sub-600 font-normal text-xs">{t("privacySection.private.description")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </CardLayout>
}

export default Usage;