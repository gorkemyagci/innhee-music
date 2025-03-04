"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PASSWORD_REGEX } from "@/data/constants/regex.constant";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ERROR_MESSAGES } from "@/data/constants/form-errors.constant";
import { Icons } from "@/components/icons";
import InputElement from "@/components/custom/form-elements/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Accounts from "../sections/accounts";

const signupSchema = z.object({
    account: z.string().email(),
    code: z.string().min(6).optional(),
    password: z.string().regex(PASSWORD_REGEX, {
        message: ERROR_MESSAGES.PASSWORD_COMPLEXITY,
    }),
    terms: z.boolean().optional(),
});

export type Signup = z.infer<typeof signupSchema>;

const SignUpForm = () => {
    const form = useForm<Signup>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = (data: Signup) => {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form className="w-full flex flex-col gap-2 md:gap-4 pt-2 md:pt-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="account"
                    render={() => (
                        <FormItem className="space-y-1 md:space-y-2">
                            <FormLabel className="text-xs md:text-base">Account<span className="text-[10px] md:text-sm text-error-base">*</span></FormLabel>
                            <div>
                                <FormControl>
                                    <div className="flex h-8 md:h-10 items-center relative gap-0 pl-2 md:pl-2.5 pr-2 md:pr-3 py-0 bg-white border border-soft-200 rounded-lg md:rounded-xl">
                                        <Icons.user_line className="size-3 md:size-5 text-soft-500" />
                                        <div className="flex-1 relative pl-1.5 md:pl-2">
                                            <InputElement form={form} name="account" placeholder="Phone number or email address" className="border-none shadow-none absolute top-1/2 -translate-y-1/2 text-xs md:text-base placeholder:text-soft-500" />
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage className="text-[10px] md:text-sm" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="space-y-1 md:space-y-2">
                            <FormLabel className="text-xs md:text-base">Password<span className="text-[10px] md:text-sm text-error-base">*</span></FormLabel>
                            <div>
                                <FormControl>
                                    <div className="flex h-8 md:h-10 items-center relative gap-0 pl-2 md:pl-2.5 pr-2 md:pr-3 py-0 bg-white border border-soft-200 rounded-lg md:rounded-xl">
                                        <div className="flex-1 relative">
                                            <InputElement form={form} name="password" placeholder="Enter password" className="border-none shadow-none absolute top-1/2 -translate-y-1/2 text-xs md:text-base placeholder:text-soft-500" />
                                        </div>
                                        <div className="cursor-pointer">
                                            <Icons.eye className="size-3 md:size-5 text-soft-500" />
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage className="text-[10px] md:text-sm" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem className="space-y-1 md:space-y-2">
                            <FormLabel className="text-xs md:text-base">Code<span className="text-[10px] md:text-sm text-error-base">*</span></FormLabel>
                            <div>
                                <FormControl>
                                    <div className="flex h-8 md:h-10 items-center relative gap-0 pl-2 md:pl-2.5 pr-2 md:pr-3 py-0 bg-white border border-soft-200 rounded-lg md:rounded-xl">
                                        <div className="flex-1 relative">
                                            <InputElement form={form} name="code" placeholder="Enter code" className="border-none shadow-none absolute top-1/2 -translate-y-1/2 text-xs md:text-base placeholder:text-soft-500" />
                                        </div>
                                        <Separator orientation="vertical" className="h-full bg-soft-200" />
                                        <span className="text-sub-600 flex items-center gap-1 md:gap-2 px-1.5 md:px-2.5 py-1 md:py-2 shrink-0 text-[10px] md:text-sm font-medium cursor-pointer hover:text-sub-700 transition-colors">
                                            Send Code
                                            <Icons.send className="size-2.5 md:size-4" />
                                        </span>
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage className="text-[10px] md:text-sm" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem className="flex py-0.5 md:py-2 items-center gap-1 md:gap-2">
                            <Checkbox id="terms" className="size-3 md:size-[18px] rounded border-soft-300" />
                            <label
                                htmlFor="terms"
                                className="text-[10px] md:text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I agree to the <Link href="#" className="underline text-main-900 font-medium hover:text-main-800 transition-colors">Conditions</Link> and <Link href="#" className="underline text-main-900 font-medium hover:text-main-800 transition-colors">Privacy Policy</Link>.
                            </label>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full h-10 rounded-[10px] text-white text-sm font-medium relative overflow-hidden transition-all
                    bg-gradient-to-b from-[#20232D]/90 to-[#20232D]
                    border border-[#20232D]/80 shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                    Sign up
                </Button>
            </form>
            <Separator className="w-full relative">
                <span className="text-[9px] md:text-[11px] text-soft-400 font-normal absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-1.5 md:px-3">OR</span>
            </Separator>
            <Accounts />
        </Form>
    )
}

export default SignUpForm;