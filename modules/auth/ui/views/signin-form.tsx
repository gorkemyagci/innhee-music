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
import { pageUrls } from "@/lib/constants/page-urls";
import Accounts from "../sections/accounts";
import SubmitButton from "../components/submit-button";
import SendCodeButton from "../components/send-code-button";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

const signinSchema = z.object({
    account: z.string().email(),
    code: z.string().min(6).optional(),
    password: z.string().regex(PASSWORD_REGEX, {
        message: ERROR_MESSAGES.PASSWORD_COMPLEXITY,
    }).optional(),
    terms: z.boolean().optional(),
    keep_logged: z.boolean().optional(),
});

export type SignIn = z.infer<typeof signinSchema>;

interface SignInFormProps {
    activeTab: "code" | "password";
}

const SignInForm = ({ activeTab }: SignInFormProps) => {
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

    const create = trpc.auth.login.useMutation({
        onSuccess: (data) => {
            toast.success("Login successful");
        },
        onError: (error) => {
            toast.error("Failed to login");
        }
    });

    const sendOtp = trpc.auth.send_otp.useMutation({
        onSuccess: (data) => {
            toast.success("OTP sent successfully");
        },
        onError: (error) => {
            toast.error("Failed to send OTP");
        }
    });

    const onSubmit = async (data: SignIn) => {
        create.mutate({
            account: data.account,
            password: data.password || ""
        });
    }

    return (
        <Form {...form}>
            <form className="w-full flex flex-col gap-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="account"
                    render={() => (
                        <FormItem>
                            <FormLabel>Account<span className="text-sm text-error-base">*</span></FormLabel>
                            <div>
                                <FormControl>
                                    <div className="flex h-10 items-center relative gap-0 pl-2.5 pr-3 py-0 transition-all duration-500 hover:bg-gray-100/60 hover:border-gray-100/60 bg-white border border-soft-200 rounded-xl">
                                        <Icons.user_line />
                                        <div className="flex-1 relative">
                                            <InputElement form={form} name="account" placeholder="Phone number or email address" className="border-none shadow-none absolute top-1/2 -translate-y-1/2" />
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
                            <FormLabel>Code<span className="text-sm text-error-base">*</span></FormLabel>
                            <div>
                                <FormControl>
                                    <div className="flex h-10 items-center relative py-0 transition-all duration-500 hover:bg-gray-100/60 hover:border-gray-100/60 bg-white border border-soft-200 rounded-xl">
                                        <div className="flex-1 px-1 relative">
                                            <InputElement form={form} name="code" placeholder="Enter code" className="border-none shadow-none absolute top-1/2 -translate-y-1/2" /></div>
                                        <Separator orientation="vertical" className="h-full" />
                                        <SendCodeButton onClick={() => {
                                            sendOtp.mutate({
                                                account: form.getValues("account")
                                            })
                                        }} />
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage className="font-medium text-xs" />
                        </FormItem>
                    )}
                /> :
                    <>

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <>


                                    <div className="flex flex-col gap-2">
                                        <FormItem>
                                            <FormLabel>Password<span className="text-sm text-error-base">*</span></FormLabel>
                                            <div>
                                                <FormControl>
                                                    <div className="flex h-10 items-center relative gap-0 px-1 py-0 transition-all duration-500 hover:bg-gray-100/60 hover:border-gray-100/60 bg-white border border-soft-200 rounded-xl">
                                                        <div className="flex-1 relative"><InputElement form={form} name="password" placeholder="Enter password" className="border-none shadow-none absolute top-1/2 -translate-y-1/2" /></div>
                                                        <div className="cursor-pointer">
                                                            <Icons.eye />
                                                        </div>
                                                    </div>
                                                </FormControl>
                                            </div>
                                            <FormMessage className="font-medium text-xs" />
                                        </FormItem>
                                    </div>


                                </>
                            )}
                        />

                    </>}
                <div className="flex flex-col gap-4">
                    {activeTab === "password" && (
                        <div className="flex items-center justify-between">
                            <FormField
                                control={form.control}
                                name="keep_logged"
                                render={({ field }) => (
                                    <FormItem className="flex shrink-0 items-center gap-2">
                                        <Checkbox id="keep_logged" className="border w-[18px] h-[18px] border-soft-200 hover:shadow-sm" />
                                        <label
                                            htmlFor="keep_logged"
                                            className="text-sm text-strong-950 font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Keep me logged in
                                        </label>
                                    </FormItem>

                                )}
                            />
                            <div className="flex w-full justify-end">
                                <Link href={pageUrls.FORGOT} className="underline text-sub-600 font-medium text-xs">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                    )}
                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-2">
                                <Checkbox id="terms" className="border w-[18px] h-[18px] border-soft-200 hover:shadow-sm" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm text-sub-600 font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    I agree to the <Link href="#" className="border-b border-strong-950 text-main-900 font-medium">Conditions</Link> and <Link href="#" className="border-b border-strong-950 text-main-900 font-medium">Privacy Policy</Link>.
                                </label>
                            </FormItem>
                        )}
                    />
                </div>
                <SubmitButton text={`Log in${activeTab === "code" ? "/Sign up" : ""}`} />
            </form>
            <Separator className="w-full relative">
                <span className="text-[11px] text-soft-400 font-normal absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-3">OR</span>
            </Separator>
            <Accounts />
        </Form>
    )
}

export default SignInForm;