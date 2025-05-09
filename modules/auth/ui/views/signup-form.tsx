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
import Accounts from "../sections/accounts";
import SubmitButton from "../components/submit-button";
import SendCodeButton from "../components/send-code-button";
import { useTranslations } from "next-intl";

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
    const t = useTranslations("auth.signIn.form");
    const form = useForm<Signup>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = (data: Signup) => {}

    return (
        <Form {...form}>
            <form className="w-full flex flex-col gap-2 md:gap-4 pt-2 md:pt-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="account"
                    render={() => (
                        <FormItem className="space-y-1 md:space-y-2">
                            <FormLabel className="text-xs md:text-base">{t("account.label")}<span className="text-[10px] md:text-sm text-error-base">*</span></FormLabel>
                            <div>
                                <FormControl>
                                    <div className="flex h-8 md:h-10 items-center relative gap-0 pl-2 md:pl-2.5 pr-2 md:pr-3 py-0 transition-all duration-500 hover:bg-gray-100/60 hover:border-gray-100/60 bg-white border border-soft-200 rounded-lg md:rounded-xl">
                                        <Icons.user_line className="size-3 md:size-5 text-soft-500" />
                                        <div className="flex-1 relative pl-1.5 md:pl-2">
                                            <InputElement form={form} name="account" placeholder={t("account.placeholder")} className="border-none shadow-none absolute top-1/2 -translate-y-1/2 text-xs md:text-base placeholder:text-soft-500" />
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage className="text-xs font-medium" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="space-y-1 md:space-y-2">
                            <FormLabel className="text-xs md:text-base">{t("password.label")}<span className="text-[10px] md:text-sm text-error-base">*</span></FormLabel>
                            <div>
                                <FormControl>
                                    <div className="flex h-8 md:h-10 items-center relative gap-0 pl-1 pr-2 md:pr-3 py-0 transition-all duration-500 hover:bg-gray-100/60 hover:border-gray-100/60 bg-white border border-soft-200 rounded-lg md:rounded-xl">
                                        <div className="flex-1 relative">
                                            <InputElement form={form} name="password" placeholder={t("password.placeholder")} className="border-none shadow-none absolute top-1/2 -translate-y-1/2 text-xs md:text-base placeholder:text-soft-500" />
                                        </div>
                                        <div className="cursor-pointer">
                                            <Icons.eye className="size-3 md:size-5 text-soft-500" />
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage className="text-xs font-medium" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem className="space-y-1 md:space-y-2">
                            <FormLabel className="text-xs md:text-base">{t("code.label")}<span className="text-[10px] md:text-sm text-error-base">*</span></FormLabel>
                            <div>
                                <FormControl>
                                <div className="flex h-10 items-center relative py-0 transition-all duration-500 hover:bg-gray-100/60 hover:border-gray-100/60 bg-white border border-soft-200 rounded-xl">
                                        <div className="flex-1 px-1 relative">
                                            <InputElement form={form} name="code" placeholder={t("code.placeholder")} className="border-none shadow-none absolute top-1/2 -translate-y-1/2 text-xs md:text-base placeholder:text-soft-500" />
                                        </div>
                                        <Separator orientation="vertical" className="h-full bg-soft-200" />
                                        <SendCodeButton onClick={() => { }} loading={false} />
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage className="text-xs font-medium" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem className="flex py-0.5 md:py-2 items-center gap-1 md:gap-2">
                            <Checkbox id="terms" className="border w-[18px] h-[18px] border-soft-200 hover:shadow-sm" />
                            <label
                                htmlFor="terms"
                                className="text-[10px] md:text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {t("terms.text")} <Link href="#" className="border-b border-strong-950 text-main-900 font-medium">{t("terms.conditions")}</Link> {t("terms.and")} <Link href="#" className="border-b border-strong-950 text-main-900 font-medium">{t("terms.privacy")}</Link>.
                            </label>
                        </FormItem>
                    )}
                />
                <SubmitButton text={t("submit.code")} />
            </form>
            <Separator className="w-full relative">
                <span className="text-[9px] md:text-[11px] text-soft-400 font-normal absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-1.5 md:px-3">{t("or")}</span>
            </Separator>
            <Accounts />
        </Form>
    )
}

export default SignUpForm;