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
import { Button } from "@/components/ui/button";

const forgotSchema = z.object({
    account: z.string().email(),
    code: z.string().min(6).optional(),
    password: z.string().regex(PASSWORD_REGEX, {
        message: ERROR_MESSAGES.PASSWORD_COMPLEXITY,
    }),
    confirmPassword: z.string().regex(PASSWORD_REGEX, {
        message: ERROR_MESSAGES.PASSWORD_COMPLEXITY,
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type Forgot = z.infer<typeof forgotSchema>;

const ForgotForm = () => {
    const form = useForm<Forgot>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: zodResolver(forgotSchema),
    });

    const onSubmit = (data: Forgot) => {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form className="w-full flex flex-col gap-4 pt-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="account"
                    render={() => (
                        <FormItem>
                            <FormLabel>Account<span className="text-sm text-error-base">*</span></FormLabel>
                            <div>
                                <FormControl>
                                    <div className="flex h-10 items-center relative gap-0 pl-2.5 pr-3 py-0 bg-white border border-soft-200 rounded-xl">
                                        <Icons.user_line />
                                        <div className="flex-1 relative">
                                            <InputElement form={form} name="account" placeholder="Phone number or email address" className="border-none shadow-none absolute top-1/2 -translate-y-1/2" />
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password<span className="text-sm text-error-base">*</span></FormLabel>
                            <div>
                                <FormControl>
                                    <div className="flex h-10 items-center relative gap-0 pl-1 pr-3 py-0 bg-white border border-soft-200 rounded-xl">
                                        <div className="flex-1 relative">
                                            <InputElement form={form} name="password" placeholder="Enter new password" className="border-none shadow-none absolute top-1/2 -translate-y-1/2" />
                                        </div>
                                        <div className="cursor-pointer">
                                            <Icons.eye />
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password<span className="text-sm text-error-base">*</span></FormLabel>
                            <div>
                                <FormControl>
                                    <div className="flex h-10 items-center relative gap-0 pl-1 pr-3 py-0 bg-white border border-soft-200 rounded-xl">
                                        <div className="flex-1 relative">
                                            <InputElement form={form} name="confirmPassword" placeholder="Confirm new password" className="border-none shadow-none absolute top-1/2 -translate-y-1/2" />
                                        </div>
                                        <div className="cursor-pointer">
                                            <Icons.eye />
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code<span className="text-sm text-error-base">*</span></FormLabel>
                            <div>
                                <FormControl>
                                    <div className="flex h-10 items-center relative gap-0 pl-1 pr-3 py-0 bg-white border border-soft-200 rounded-xl">
                                        <div className="flex-1 relative">
                                            <InputElement form={form} name="code" placeholder="Enter code" className="border-none shadow-none absolute top-1/2 -translate-y-1/2" />
                                        </div>
                                        <Separator orientation="vertical" className="h-full" />
                                        <span className="text-sub-600 flex items-center gap-2 p-2.5 shrink-0 text-sm font-medium">
                                            Send Code
                                            <Icons.send />
                                        </span>
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full h-10 rounded-[10px] text-white text-sm font-medium relative overflow-hidden transition-all
                    bg-gradient-to-b from-[#20232D]/90 to-[#20232D]
                    border border-[#20232D]/80 shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">Reset Password</Button>
            </form>
        </Form>
    )
}

export default ForgotForm;