"use client"
import { Icons } from "@/components/icons";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import SubmitButton from "@/modules/auth/ui/components/submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerForm } from "@/components/custom/form-elements/date-picker";
import { UseFormReturn } from "react-hook-form";
import { jobPostingFormSchema } from "../views/job-posting";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const BasicInformation = ({ form }: { form: UseFormReturn<jobPostingFormSchema> }) => {
    const t = useTranslations("jobPosting.basicInfo");
    const [id, setId] = useQueryState("id", { defaultValue: "" });
    const [tab, setTab] = useQueryState("tab", { defaultValue: "basic-information" });
    const [text, setText] = useState("");
    const [amountInput, setAmountInput] = useState('');
    const maxChars = 200;
    const utils = trpc.useUtils();

    useEffect(() => {
        const detail = form.getValues("detail") || "";
        setText(detail);
        const salary = form.getValues("salary");
        if (salary && salary > 0) {
            setAmountInput(salary.toString());
        }
    }, [form]);

    const onSubmit = (data: jobPostingFormSchema) => {
        setTab("select-category");
    };

    const toggleOpen = () => {
        setTab(tab === "basic-information" ? "" : "basic-information");
    };

    const isOpen = tab === "basic-information";

    const create = trpc.jobPosting.createJob.useMutation({
        onSuccess: (data) => {
            if (data?.id) {
                toast.success(t("createSuccess"));
                utils.jobPosting.getMyJobPosts.invalidate();
                setTab("select-category");
                setId(data.id);
            } else {
                toast.error(t("createError"));
            }
        },
        onError: (error) => {
            toast.error(error.message || t("createError"));
        }
    })

    const handleNext = () => {
        if (!id) {
            const data = {
                "subject": form.getValues("subject"),
                "detail": form.getValues("detail"),
                "salary": form.getValues("salary"),
                "salaryCurrency": form.getValues("salaryCurrency") || "CNY",
                "deadline": form.getValues("deadline").toISOString(),
                "budgetsActive": form.getValues("budgetsActive"),
                "usage": form.getValues("usage") ? form.getValues("usage").toUpperCase() : "PRIVATE",
                "privacy": form.getValues("privacy") ? form.getValues("privacy").toUpperCase() : "PRIVATE",
                "skillLevelIds": form.getValues("skillLevelIds"),
                "candidateSourceIds": form.getValues("candidateSourceIds"),
                "status": "INACTIVE"
            }
            create.mutate(data);
            return;
        }
        setTab("select-category");
    }

    return (
        <Card className={cn("w-full lg:w-[440px] border-soft-200 rounded-[20px] shadow-none", !isOpen && "pb-2")}>
            <CardHeader
                onClick={toggleOpen}
                className={cn("bg-transparent border-soft-200 pb-4 pr-6 pl-5 flex flex-row items-center justify-between cursor-pointer", !isOpen ? "border-b-none" : "border-b")}
            >
                <div className="flex items-center gap-3">
                    <span className="rounded-full flex items-center justify-center h-10 w-10 border border-soft-200 text-strong-950 font-medium text-sm">01</span>
                    <span className="text-strong-950 font-medium text-sm">{t("title")}</span>
                </div>
                <motion.div
                    className="w-6 h-6 rounded-md border border-soft-200 flex items-center justify-center p-0.5"
                    animate={{ rotate: isOpen ? 90 : 270 }}
                    transition={{ duration: 0.3 }}
                >
                    <Icons.chevron_short_right />
                </motion.div>
            </CardHeader>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        <CardContent className="space-y-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel className="block text-sub-600 text-sm font-medium">
                                                    {t("subject.label")}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder={t("subject.placeholder")}
                                                        className="bg-transparent shadow-none h-10 hover:border-weak-50 hover:bg-weak-50 transition-all duration-200 border border-soft-200 placeholder:text-[#99A0AE] focus-visible:ring-0 focus-visible:ring-offset-0"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="detail"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel className="block text-sub-600 text-sm font-medium">
                                                    {t("detail.label")}
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Textarea
                                                            value={text}
                                                            placeholder={t("detail.placeholder")}
                                                            className="w-full min-h-[120px] max-h-[300px] border-soft-200 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-sub-400 resize-none pr-3 overflow-y-auto break-words whitespace-pre-wrap text-wrap"
                                                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}
                                                            onChange={(e) => {
                                                                const newText = e.target.value;
                                                                setText(newText);
                                                                field.onChange(newText);
                                                            }}
                                                            maxLength={maxChars}
                                                        />
                                                        <div className="absolute bottom-2 right-2 text-sub-400 text-xs flex items-center">
                                                            <span className="w-[60px] text-right">{text.length}/{maxChars}</span>
                                                            <Icons.resize className="ml-1 size-4 flex-shrink-0" />
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex sm:flex-row flex-col items-start sm:items-center w-full gap-4">
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="salary"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-1">
                                                        <FormLabel className="text-sub-600 text-sm font-medium">
                                                            {t("amount.label")}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <div className="flex">
                                                                <div className="relative w-[104px] flex-1">
                                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sub-600">¥</span>
                                                                    <Input
                                                                        type="number"
                                                                        placeholder={t("amount.placeholder")}
                                                                        className="w-full pl-8 h-10 border-r-0 rounded-r-none border-soft-200 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-b"
                                                                        value={amountInput}
                                                                        onChange={(e) => {
                                                                            setAmountInput(e.target.value);
                                                                            field.onChange(parseFloat(e.target.value) || 0);
                                                                        }}
                                                                    />
                                                                </div>
                                                                <Select defaultValue="CNY">
                                                                    <SelectTrigger className="w-24 h-10 border-l-0 rounded-l-none border-soft-200 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
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
                                                                                <span className="text-sub-600 font-normal text-sm">CNY</span>
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
                                        </div>
                                        <DatePickerForm
                                            form={form}
                                            name="deadline"
                                            label={t("deadline.label")}
                                            className="shadow-sm border border-soft-200 h-10 py-0 w-40 rounded-[10px] flex items-center justify-center"
                                            icon={<Icons.calendar_line className="size-5" />}
                                            customLabel={
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sub-600 font-medium text-sm">{t("deadline.label")}</span>
                                                    <Icons.info />
                                                </div>
                                            }
                                            disablePastDates
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="budgetsActive"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="h-5"
                                                    />
                                                </FormControl>
                                                <FormLabel
                                                    className="text-strong-950 font-normal text-sm cursor-pointer"
                                                >
                                                    {t("budgetConfirm")}
                                                </FormLabel>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        </CardContent>
                        <Separator className="bg-soft-200 my-5" />
                        <CardFooter className="flex justify-end p-5 pb-0 pt-0">
                            <SubmitButton text={t("next")} className="h-9 w-14 rounded-lg" onClick={handleNext} loading={create.isPending} disabled={create.isPending} />
                        </CardFooter>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
};

export default BasicInformation;