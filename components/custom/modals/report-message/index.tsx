"use client"
import { Icons } from "@/components/icons";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormItem, FormField, FormControl, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";

interface ReportMessageProps {
    children: React.ReactNode;
}

const formSchema = z.object({
    reportReason: z.enum(["spam", "harassment", "violation-of-rules"], {
        required_error: "Please select a reason for reporting.",
    }),
    detail: z.string().optional(),
})

const REPORT_REASONS = ["spam", "harassment", "violation-of-rules"] as const;

const ReportMessage = ({ children }: ReportMessageProps) => {
    const t = useTranslations("modals.reportMessage");
    const [selectedReason, setSelectedReason] = useState<typeof REPORT_REASONS[number] | "">("");
    const [detail, setDetail] = useState<string>("");
    const maxChars = 200;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            detail: "",
        },
    });
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.setValue("reportReason", selectedReason as "spam" | "harassment" | "violation-of-rules");
        form.setValue("detail", detail);
    };
    
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white gap-0 rounded-3xl p-0 overflow-hidden">
                <DialogHeader className="p-0 flex items-start border-b border-soft-200 justify-between w-full">
                    <div className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-soft-200 flex items-center justify-center bg-white">
                            <Icons.flag_line className="fill-sub-600" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <DialogTitle><span className="text-main-900 font-medium text-sm">{t("title")}</span></DialogTitle>
                            <span className="text-sub-600 font-normal text-xs">{t("subtitle")}</span>
                        </div>
                    </div>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit}
                        className="border-b border-soft-200 w-full p-4"
                    >
                        <FormField
                            control={form.control}
                            name="reportReason"
                            render={() => (
                                <FormItem className="space-y-4">
                                    <FormControl>
                                        <div className="space-y-2">
                                            <Label>{t("reasons.title")}</Label>
                                            <div className="space-y-2">
                                                {REPORT_REASONS.map((reason) => (
                                                    <div key={reason} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={reason}
                                                            checked={selectedReason === reason}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) setSelectedReason(reason);
                                                            }}
                                                        />
                                                        <Label htmlFor={reason}>{t(`reasons.${reason}`)}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="detail"
                            render={() => (
                                <FormItem className="w-full pt-4">
                                    <FormLabel className="text-sub-600 font-medium">{t("detail.label")}</FormLabel>
                                    <FormControl className="w-full">
                                        <div className="relative my-0.5">
                                            <Textarea
                                                value={detail}
                                                placeholder={t("detail.placeholder")}
                                                className="w-full min-h-[120px] border-soft-200 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-sub-400 resize-none pr-3"
                                                onChange={(e) => {
                                                    const newText = e.target.value;
                                                    setDetail(newText);
                                                    form.setValue("detail", newText);
                                                }}
                                                maxLength={maxChars}
                                            />
                                            <div className="absolute bottom-2 right-2 text-sub-400 text-xs flex items-center">
                                                <span className="w-[60px] text-right">{detail.length}/{maxChars}</span>
                                                <Icons.resize className="ml-1 size-4 flex-shrink-0" />
                                            </div>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Separator className="bg-soft-200 w-full mt-4" />
                        <div className="flex items-center w-full gap-3 pt-4 px-4">
                            <DialogClose asChild>
                                <Button variant="outline" className="h-9 flex-1 border-soft-200 rounded-lg bg-white flex items-center gap-1.5 text-sub-600 font-medium text-sm">
                                    {t("buttons.cancel")}
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="h-9 flex-1 disabled:cursor-auto group rounded-lg text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]"
                                disabled={!selectedReason}
                            >
                                <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                                {t("buttons.submit")}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ReportMessage;