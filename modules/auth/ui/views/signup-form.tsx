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
            <form className="w-full flex flex-col gap-3 pt-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                                        <div className="flex-1 relative"><InputElement form={form} name="password" placeholder="Enter password" className="border-none shadow-none absolute top-1/2 -translate-y-1/2" /></div>
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
                                        <div className="flex-1 relative">    <InputElement form={form} name="code" placeholder="Enter code" className="border-none shadow-none absolute top-1/2 -translate-y-1/2" /></div>
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
                <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem className="flex py-2 items-center gap-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I agree to the <Link href="#" className="underline text-main-900 font-medium">Conditions</Link> and <Link href="#" className="underline text-main-900 font-medium">Privacy Policy</Link>.
                            </label>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full bg-surface-700 h-10 rounded-xl text-white text-sm font-medium">Sign up</Button>
            </form>
            <Separator className="w-full relative">
                <span className="text-[11px] text-soft-400 font-normal absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-3">OR</span>
            </Separator>
            <div className="flex w-full items-center gap-2">
                <Button className="bg-white border border-soft-200 hover:bg-white flex-1 h-10 rounded-xl flex items-center justify-center">
                    <Icons.wechat />
                </Button>
                <Button className="bg-white border border-soft-200 hover:bg-white flex-1 h-10 rounded-xl flex items-center justify-center">
                    <Icons.google />
                </Button>
            </div>
        </Form>
    )
}

export default SignUpForm;