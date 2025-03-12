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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface ReportMessageProps {
    children: React.ReactNode;
}

const formSchema = z.object({
    reportReason: z.enum(["spam", "harassment", "violation-of-rules"], {
        required_error: "Please select a reason for reporting.",
    }),
    detail: z.string().optional(),
})

const ReportMessage = ({ children }: ReportMessageProps) => {
    const [text, setText] = useState("");
    const maxChars = 200;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            detail: "",
        },
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }
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
                            <DialogTitle><span className="text-main-900 font-medium text-sm">Report Message</span></DialogTitle>
                            <span className="text-sub-600 font-normal text-xs">Select the reason for reporting the message.</span>
                        </div>
                    </div>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="border-b border-soft-200 w-full p-4"
                    >
                        <FormField
                            control={form.control}
                            name="reportReason"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex flex-col items-start gap-4 w-full"
                                        >
                                            <div className="flex items-start space-x-2 cursor-pointer">
                                                <RadioGroupItem value="spam" id="r1" />
                                                <Label htmlFor="r1" className="flex flex-col items-start gap-1">
                                                    <p className="text-sub-600 font-medium text-sm">Spam</p>
                                                    <span className="text-sub-600 font-normal text-xs">Unsolicited or irrelevant content.</span>
                                                </Label>
                                            </div>
                                            <div className="flex items-start space-x-2 cursor-pointer">
                                                <RadioGroupItem value="harassment" id="r2" />
                                                <Label htmlFor="r2" className="flex flex-col items-start gap-1">
                                                    <p className="text-sub-600 font-medium text-sm">Harassment</p>
                                                    <span className="text-sub-600 font-normal text-xs">Persistent, unwanted, or offensive behavior.</span>
                                                </Label>
                                            </div>
                                            <div className="flex items-start space-x-2 cursor-pointer">
                                                <RadioGroupItem value="violation-of-rules" id="r3" />
                                                <Label htmlFor="r3" className="flex flex-col items-start gap-1">
                                                    <p className="text-sub-600 font-medium text-sm">Violation of Rules</p>
                                                    <span className="text-sub-600 font-normal text-xs">Infringement of community guidelines or terms.</span>
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="detail"
                            render={() => (
                                <FormItem className="w-full pt-4">
                                    <FormLabel className="text-sub-600 font-medium">Detail</FormLabel>
                                    <FormControl className="w-full">
                                        <div className="relative my-0.5">
                                            <Textarea
                                                value={text}
                                                placeholder="Please describe the reason for reporting"
                                                className="w-full min-h-[120px] border-soft-200 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-sub-400 resize-none pr-3"
                                                onChange={(e) => {
                                                    const newText = e.target.value;
                                                    setText(newText);
                                                }}
                                                maxLength={maxChars}
                                            />
                                            <div className="absolute bottom-2 right-2 text-sub-400 text-xs flex items-center">
                                                <span className="w-[60px] text-right">{text.length}/{maxChars}</span>
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
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="button"
                                className="h-9 flex-1 disabled:cursor-auto group rounded-lg text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                                <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                                Confirm
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ReportMessage;