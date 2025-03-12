"use client";
import { Icons } from "@/components/icons";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputElement from "../../form-elements/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface ApplyJobProps {
    children: React.ReactNode;
}

const formSchema = z.object({
    amount: z.number().min(1),
    description: z.string().optional(),
    hide: z.boolean().optional(),
})

const ApplyJob = ({ children }: ApplyJobProps) => {
    const [text, setText] = useState("");
    const maxChars = 200;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 0,
            description: "",
            hide: false,
        },
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[400px] bg-white rounded-3xl p-0 gap-0 overflow-hidden">
                <DialogHeader className="p-0 flex items-start border-b border-soft-200 justify-between w-full">
                    <div className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-soft-200 flex items-center justify-center bg-white">
                            <Icons.upload_line />
                        </div>
                        <div className="flex flex-col gap-1">
                            <DialogTitle><span className="text-main-900 font-medium text-sm">Apply</span></DialogTitle>
                            <span className="text-sub-600 font-normal text-xs">Add tags and do adjustments before uploading.</span>
                        </div>
                    </div>
                </DialogHeader>
                <div className="bg-weak-50 w-full h-7 flex items-center px-[16px] py-1.5">
                    <span className="text-soft-400 font-medium text-xs uppercase">Recipient Receives</span>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="py-4 flex flex-col items-start gap-4 border-b border-soft-200">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={() => (
                                <FormItem className="w-full px-4">
                                    <FormLabel className="text-sub-600 font-medium">Enter Amount <Icons.info /></FormLabel>
                                    <FormControl className="w-full">
                                        <div className="relative flex items-center gap-2 p-2.5 pl-3 h-10 justify-center w-full border border-soft-200 rounded-[10px]">
                                            <span className="text-soft-400 font-normal text-sm">￥</span>
                                            <InputElement
                                                placeholder="0.00"
                                                form={form}
                                                name="amount"
                                                className="border-none shadow-none flex-1 h-full -translate-y-1 pl-1 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                type="number"
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={() => (
                                <FormItem className="w-full px-4">
                                    <FormLabel className="text-sub-600 font-medium">Description <span className="text-sub-600 font-normal text-sm">(Optional)</span> </FormLabel>
                                    <FormControl className="w-full">
                                        <div className="relative my-0.5">
                                            <Textarea
                                                value={text}
                                                placeholder="Please describe yourself"
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
                        <FormField
                            control={form.control}
                            name="hide"
                            render={({ field }) => (
                                <FormItem className="flex items-center px-4 py-2 gap-3 w-full space-y-0">
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="data-[state=checked]:bg-[#525866] cursor-pointer"
                                        />
                                    </FormControl>
                                    <FormLabel className="text-sub-600 font-normal text-sm cursor-pointer">Hide Application Display</FormLabel>
                                </FormItem>
                            )}
                        />
                        <Separator className="bg-soft-200" />
                        <div className="flex items-center w-full gap-3 px-4">
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

export default ApplyJob;