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
import { useState } from "react";
import { DatePickerForm } from "@/components/custom/form-elements/date-picker";
interface ContractTermsProps {
    form: UseFormReturn<any>;
}

const ContractTerms = ({ form }: ContractTermsProps) => {
    const [amountInput, setAmountInput] = useState<string>("");
    const options = [
        {
            title: "One-time payment",
            description: "Pay full amount with a single payment.",
            link: "#",
            value: "one-time"
        },
        {
            title: "Installment payment",
            description: "Pay full amount with multiple payments.",
            link: "#",
            value: "installment"
        },
    ];

    const selectedOption = options.findIndex(option => option.value === form.watch("paymentType"));

    return <div className="w-full flex flex-col gap-5 items-start">
        <h4 className="text-strong-950 font-medium text-[32px]">Contract Terms</h4>
        <div className="flex gap-6 w-full">
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
                    <Link href="#" prefetch className="text-strong-950 font-medium text-xs border-b border-strong-950">Learn More</Link>
                </div>
            ))}
        </div>
        <div className="flex w-full gap-5">
            <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                    <FormItem className="space-y-1 w-full">
                        <FormLabel className="text-sub-600 text-sm font-medium">
                            Amount
                        </FormLabel>
                        <FormControl>
                            <div className="flex w-full">
                                <div className="relative w-full flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sub-600">¥</span>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full pl-8 h-10 border-r-0 rounded-r-none border-soft-200 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-b"
                                        value={amountInput}
                                        onChange={(e) => {
                                            setAmountInput(e.target.value);
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
                label="Deadline"
                className="shadow-sm border border-soft-200 h-10 py-0 w-full rounded-[10px] flex items-center justify-center"
                icon={<Icons.calendar_line className="size-5" />}
                customLabel={
                    <div className="flex items-center gap-1">
                        <span className="text-sub-600 font-medium text-sm">Deadline</span>
                        <Icons.info />
                    </div>
                }
                formItemClassName="w-full"
            />
        </div>
    </div>
}

export default ContractTerms;