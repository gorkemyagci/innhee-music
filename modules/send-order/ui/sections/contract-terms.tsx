"use client";

import { Icons } from "@/components/icons";
import { FormField, FormLabel } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { useState, useEffect } from "react";
import { DatePickerForm } from "@/components/custom/form-elements/date-picker";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface ContractTermsProps {
    form: UseFormReturn<any>;
}

const ContractTerms = ({ form }: ContractTermsProps) => {
    const t = useTranslations("sendOrder.contractTerms");
    const [amountInput, setAmountInput] = useState<string>("");
    const options = [
        {
            title: t("paymentTypes.oneTime.title"),
            description: t("paymentTypes.oneTime.description"),
            link: "#",
            value: "one-time"
        },
        {
            title: t("paymentTypes.installment.title"),
            description: t("paymentTypes.installment.description"),
            link: "#",
            value: "installment"
        },
    ];

    const selectedOption = options.findIndex(option => option.value === form.watch("paymentType"));

    useEffect(() => {
        const paymentType = form.watch("paymentType");
        const currentMilestones = form.getValues("milestones") || [];

        if (paymentType === "installment" && currentMilestones.length === 0) {
            form.setValue("milestones", [{
                title: "",
                amount: 0,
                deadline: "",
                currency: "CNY"
            }]);
        }
    }, [form.watch("paymentType")]);

    const updateMilestone = (index: number, field: string, value: any) => {
        const currentMilestones = form.getValues("milestones") || [];
        if (currentMilestones.length > 0) {
            const updatedMilestones = [...currentMilestones];
            updatedMilestones[index] = {
                ...updatedMilestones[index],
                [field]: value
            };
            form.setValue("milestones", updatedMilestones);
        }
    };

    const addMilestone = () => {
        const currentMilestones = form.getValues("milestones") || [];
        form.setValue("milestones", [...currentMilestones, {
            title: "",
            amount: 0,
            deadline: "",
            currency: "CNY"
        }]);
    };

    const removeMilestone = (index: number) => {
        const currentMilestones = form.getValues("milestones") || [];
        if (currentMilestones.length <= 1) return;
        
        const updatedMilestones = currentMilestones.filter((_: any, i: number) => i !== index);
        form.setValue("milestones", updatedMilestones);
    };

    return <div className="w-full flex flex-col gap-5 items-start">
        <h4 className="text-strong-950 font-medium text-[24px] lg:text-[32px]">{t("title")}</h4>
        <div className="flex flex-col sm:flex-row gap-6 w-full">
            {options.map((option, index) => (
                <div
                    key={index}
                    className={cn("border-[1.5px] border-soft-200 rounded-[12px] transition-all duration-200 cursor-pointer hover:bg-weak-50 w-full h-40 p-5 flex flex-col items-start gap-2", {
                        "border-[1.5px] border-primary-base": index === selectedOption
                    })}
                    onClick={() => form.setValue("paymentType", option.value)}
                >
                    <div className="flex flex-col items-start gap-4">
                        <Icons.exchange_cny_fill className="size-8 fill-strong-950" />
                        <div className="flex flex-col items-start gap-1">
                            <p className="text-strong-950 font-medium text-xl">{option.title}</p>
                            <span className="text-sub-600 font-normal text-xs">{option.description}</span>
                        </div>
                    </div>
                    <Link href="#" prefetch className="text-strong-950 font-medium text-xs border-b border-strong-950">{option.value === "one-time" ? t("paymentTypes.oneTime.learnMore") : t("paymentTypes.installment.learnMore")}</Link>
                </div>
            ))}
        </div>
        <div className="w-full flex flex-col items-start gap-4">
            {form.watch("paymentType") === "installment" ? (
                form.watch("milestones")?.map((milestone: any, index: number) => (
                    <div key={index} className={cn("flex w-full flex-col sm:flex-row items-start sm:items-center transition-all duration-200 gap-5", index === 0 && form.watch("milestones")?.length > 1 ? "pr-10" : "")}>
                        <FormField
                            control={form.control}
                            name={`milestones.${index}.title`}
                            render={({ field }) => (
                                <FormItem className="space-y-1 w-full">
                                    <FormLabel className="text-sub-600 text-sm font-medium">
                                        {t("milestone.title", { index: index + 1 })}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter the milestone"
                                            className="h-10 outline-none placeholder:text-sm focus:outline-none focus:ring-0 rounded-[10px] p-2.5 border border-soft-200 shadow-none"
                                            value={field.value || ""}
                                            onChange={(e) => updateMilestone(index, "title", e.target.value)}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`milestones.${index}.amount`}
                            render={({ field }) => (
                                <FormItem className="space-y-1 w-full">
                                    <FormLabel className="text-sub-600 text-sm font-medium">
                                        {t("amount.label")}
                                    </FormLabel>
                                    <FormControl>
                                        <div className="flex w-full">
                                            <div className="relative w-full flex-1">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sub-600">¥</span>
                                                <Input
                                                    type="number"
                                                    placeholder={t("amount.placeholder")}
                                                    className="w-full pl-8 h-10 border-r-0 rounded-r-none border-soft-200 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-b"
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(parseFloat(e.target.value) || 0);
                                                    }}
                                                />
                                            </div>
                                            <Select defaultValue="CNY">
                                                <SelectTrigger className="w-28 h-10 border-l-0 rounded-l-none border-soft-200 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="border-soft-200">
                                                    <SelectItem value="CNY" className="cursor-pointer">
                                                        <div className="flex items-center gap-2">
                                                            <Image
                                                                src="/assets/svgs/china.svg"
                                                                alt="CNY"
                                                                width={20}
                                                                height={20}
                                                                loading="lazy"
                                                                quality={100}
                                                            />
                                                            <span className="text-strong-950 font-normal text-sm">CNY</span>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="USD" className="cursor-pointer">USD</SelectItem>
                                                    <SelectItem value="EUR" className="cursor-pointer">EUR</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DatePickerForm
                            form={form}
                            name={`milestones.${index}.deadline`}
                            label={t("deadline.label")}
                            className="shadow-sm border border-soft-200 h-10 py-0 w-full rounded-[10px] flex items-center justify-center"
                            icon={<Icons.calendar_line className="size-5" />}
                            customLabel={
                                <div className="flex items-center gap-1">
                                    <span className="text-sub-600 font-medium text-sm">{t("deadline.label")}</span>
                                    <Icons.info />
                                </div>
                            }
                            formItemClassName="w-full"
                        />
                        {index > 0 && (
                            <Icons.delete_bin_line 
                                className="size-5 cursor-pointer shrink-0" 
                                onClick={() => removeMilestone(index)} 
                            />
                        )}
                    </div>
                ))
            ) : (
                <div className="w-full flex flex-col sm:flex-row gap-5">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem className="space-y-1 w-full">
                                <FormLabel className="text-sub-600 text-sm font-medium">
                                    {t("amount.label")}
                                </FormLabel>
                                <FormControl>
                                    <div className="flex w-full">
                                        <div className="relative w-full flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sub-600">¥</span>
                                            <Input
                                                type="number"
                                                placeholder={t("amount.placeholder")}
                                                className="w-full pl-8 h-10 border-r-0 rounded-r-none border-soft-200 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-b"
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(parseFloat(e.target.value) || 0);
                                                }}
                                            />
                                        </div>
                                        <Select defaultValue="CNY">
                                            <SelectTrigger className="w-28 h-10 border-l-0 rounded-l-none border-soft-200 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="border-soft-200">
                                                <SelectItem value="CNY" className="cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        <Image
                                                            src="/assets/svgs/china.svg"
                                                            alt="CNY"
                                                            width={20}
                                                            height={20}
                                                            loading="lazy"
                                                            quality={100}
                                                        />
                                                        <span className="text-strong-950 font-normal text-sm">CNY</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="USD" className="cursor-pointer">USD</SelectItem>
                                                <SelectItem value="EUR" className="cursor-pointer">EUR</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DatePickerForm
                        form={form}
                        name="deadline"
                        label={t("deadline.label")}
                        className="shadow-sm border border-soft-200 h-10 py-0 w-full rounded-[10px] flex items-center justify-center"
                        icon={<Icons.calendar_line className="size-5" />}
                        customLabel={
                            <div className="flex items-center gap-1">
                                <span className="text-sub-600 font-medium text-sm">{t("deadline.label")}</span>
                                <Icons.info />
                            </div>
                        }
                        formItemClassName="w-full"
                    />
                </div>
            )}
        </div>
        {form.watch("paymentType") === "installment" && (
            <div
                onClick={addMilestone}
                className="flex cursor-pointer items-center gap-1 border border-soft-200 py-1 px-2 rounded-lg"
            >
                <span className="text-sub-600 font-medium text-sm">{t("milestone.add")}</span>
            </div>
        )}
    </div>
}

export default ContractTerms;