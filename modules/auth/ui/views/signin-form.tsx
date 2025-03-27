"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX } from "@/data/constants/regex.constant";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ERROR_MESSAGES } from "@/data/constants/form-errors.constant";
import { Icons } from "@/components/icons";
import InputElement from "@/components/custom/form-elements/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { pageUrls } from "@/lib/constants/page-urls";
import Accounts from "../sections/accounts";
import SubmitButton from "../components/submit-button";
import SendCodeButton from "../components/send-code-button";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { PasswordInput } from "@/components/custom/form-elements/password-input";
import { useTranslations } from "next-intl";

const signinSchema = z.object({
    account: z.string().email(),
    code: z.string().min(6).optional(),
    password: z.string().regex(PASSWORD_REGEX, {
        message: ERROR_MESSAGES.PASSWORD_COMPLEXITY,
    }).optional(),
    terms: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions",
    }),
    keep_logged: z.boolean().optional(),
});

export type SignIn = z.infer<typeof signinSchema>;

interface SignInFormProps {
    activeTab: "code" | "password";
}

const SignInForm = ({ activeTab }: SignInFormProps) => {
    const t = useTranslations("auth.signIn.form");
    const form = useForm<SignIn>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: zodResolver(signinSchema),
        defaultValues: {
            account: "",
            code: "",
            password: "",
            terms: false,
            keep_logged: false
        }
    });

    const login = trpc.auth.login.useMutation({
        onSuccess: (data) => {
            toast.success(t("errors.loginSuccess"));
            const access_token = data.access_token;
            const keep_logged = form.getValues("keep_logged");
            useAuthStore.getState().setToken(access_token, keep_logged);
            typeof window !== "undefined" && window.location.replace(pageUrls.DASHBOARD);
        },
        onError: (error) => {
            toast.error(error.message || t("errors.generalError"));
        }
    });

    const verify = trpc.auth.verifyOtp.useMutation({
        onSuccess: async (data) => {
            toast.success(t("errors.verifySuccess"));
            const access_token = data.access_token;
            const keep_logged = form.getValues("keep_logged");
            useAuthStore.getState().setToken(access_token, keep_logged);
            typeof window !== "undefined" && window.location.replace(pageUrls.DASHBOARD);
        },
        onError: (error) => {
            toast.error(error.message || t("errors.generalError"));
        }
    });

    const sendOtp = trpc.auth.send_otp.useMutation({
        onSuccess: async (data) => {
            toast.success(t("errors.verificationSent"));
        },
        onError: (error) => {
            toast.error(error.message || t("errors.generalError"));
        }
    });

    const onSubmit = async (data: SignIn) => {
        const account = form.getValues("account");
        const code = form.getValues("code");
        const password = form.getValues("password");
        const terms = form.getValues("terms");

        if (!account) {
            toast.error(t("errors.accountRequired"));
            return;
        }
        if (activeTab === "code" && !code) {
            toast.error(t("errors.codeRequired"));
            return;
        }
        if (activeTab === "password" && !password) {
            toast.error(t("errors.passwordRequired"));
            return;
        }
        if (!terms) {
            toast.error(t("errors.termsRequired"));
            return;
        }

        const toastId = toast.loading(activeTab === "code" ? t("code.verifying") : t("errors.loginSuccess"));

        try {
            if (activeTab === "code") {
                verify.mutate(
                    { account, code: code || "" },
                    {
                        onSuccess: (data) => {
                            toast.dismiss(toastId);
                        },
                        onError: () => {
                            toast.dismiss(toastId);
                        }
                    }
                );
            } else {
                login.mutate(
                    { account, password: password || "" },
                    {
                        onSuccess: () => {
                            toast.dismiss(toastId);
                        },
                        onError: () => {
                            toast.dismiss(toastId);
                        }
                    }
                );
            }
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(t("errors.generalError"));
        }
    }

    const handleSendOtp = () => {
        const account = form.getValues("account");
        if (!account) {
            toast.error(t("errors.accountRequired"));
            return;
        }
        const isEmail = EMAIL_REGEX.test(account);
        const isPhone = PHONE_REGEX.test(account);
        if (!isEmail && !isPhone) {
            toast.error(t("errors.invalidAccount"));
            return;
        }
        sendOtp.mutate({ account });
    }

    return (
        <Form {...form}>
            <form
                className="w-full flex flex-col gap-6 py-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)(e);
                }}
                noValidate
            >
                <FormField
                    control={form.control}
                    name="account"
                    render={() => (
                        <FormItem>
                            <FormLabel>{t("account.label")}<span className="text-sm text-error-base">*</span></FormLabel>
                            <div>
                                <FormControl>
                                    <div className="flex h-10 items-center relative gap-0 pl-2.5 pr-3 py-0 transition-all duration-500 hover:bg-gray-100/60 hover:border-gray-100/60 bg-white border border-soft-200 rounded-xl">
                                        <Icons.user_line />
                                        <div className="flex-1 relative">
                                            <InputElement form={form} name="account" placeholder={t("account.placeholder")} className="border-none shadow-none absolute top-1/2 -translate-y-1/2" />
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage className="font-medium text-xs" />
                        </FormItem>
                    )}
                />
                {activeTab === "code" ? <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("code.label")}<span className="text-sm text-error-base">*</span></FormLabel>
                            <div>
                                <FormControl>
                                    <div className="flex h-10 items-center relative py-0 transition-all duration-500 hover:bg-gray-100/60 hover:border-gray-100/60 bg-white border border-soft-200 rounded-xl">
                                        <div className="flex-1 px-1 relative">
                                            <InputElement form={form} name="code" placeholder={t("code.placeholder")} className="border-none shadow-none absolute top-1/2 -translate-y-1/2" /></div>
                                        <Separator orientation="vertical" className="h-full" />
                                        <SendCodeButton onClick={handleSendOtp} loading={sendOtp.isPending} />
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage className="font-medium text-xs" />
                        </FormItem>
                    )}
                /> :
                    <>
                        <PasswordInput form={form} name="password" placeholder={t("password.placeholder")} />
                    </>}
                <div className="flex flex-col gap-4">
                    {activeTab === "password" && (
                        <div className="flex items-center justify-between">
                            <FormField
                                control={form.control}
                                name="keep_logged"
                                render={({ field }) => (
                                    <FormItem className="flex shrink-0 items-center gap-2">
                                        <FormControl>
                                            <Checkbox
                                                id="keep_logged"
                                                className="border w-[18px] h-[18px] border-soft-200 hover:shadow-sm"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <label
                                            htmlFor="keep_logged"
                                            className="text-sm text-strong-950 font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {t("password.keepLogged")}
                                        </label>
                                    </FormItem>
                                )}
                            />
                            <div className="flex w-full justify-end">
                                <Link href={pageUrls.FORGOT} className="underline text-sub-600 font-medium text-xs">
                                    {t("password.forgot")}
                                </Link>
                            </div>
                        </div>
                    )}
                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-2">
                                <FormControl>
                                    <Checkbox
                                        id="terms"
                                        className="border w-[18px] h-[18px] border-soft-200 hover:shadow-sm"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <label
                                    htmlFor="terms"
                                    className="text-sm text-sub-600 font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {t("terms.text")} <Link href="#" className="border-b border-strong-950 text-main-900 font-medium">{t("terms.conditions")}</Link> {t("terms.and")} <Link href="#" className="border-b border-strong-950 text-main-900 font-medium">{t("terms.privacy")}</Link>.
                                </label>
                                <FormMessage className="font-medium text-xs" />
                            </FormItem>
                        )}
                    />
                </div>
                <SubmitButton
                    text={activeTab === "code" ? t("submit.code") : t("submit.password")}
                    onClick={() => {
                        onSubmit(form.getValues());
                    }}
                    loading={login.isPending || verify.isPending}
                    disabled={login.isPending || verify.isPending}
                />
            </form>
            <Separator className="w-full relative">
                <span className="text-[11px] text-soft-400 font-normal absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-3">{t("or")}</span>
            </Separator>
            <Accounts />
        </Form>
    )
}

export default SignInForm;