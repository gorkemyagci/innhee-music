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
import SubmitButton from "../components/submit-button";
import SendCodeButton from "../components/send-code-button";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { pageUrls } from "@/lib/constants/page-urls";

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
    const router = useRouter();
    const form = useForm<Forgot>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: zodResolver(forgotSchema),
        defaultValues: {
            account: "",
            code: "",
            password: "",
            confirmPassword: "",
        }
    });

    const sendOtp = trpc.auth.sendForgotPasswordOtp.useMutation({
        onSuccess: (data) => {
            console.log(data);
            toast.success("OTP sent successfully!")
        },
        onError: (error) => {
            console.log(error);
            toast.error("Failed to send");
        }
    })

    const verifyOtp = trpc.auth.verifyForgotPasswordOtp.useMutation({
        onSuccess: (data) => {
            toast.success("Password reset successfully!");
            router.push(pageUrls.SIGN_IN);
        },
        onError: (error) => {
            console.log(error);
            toast.error("Failed to reset password");
        }
    })

    const handleSendOtp = () => {
        const account = form.getValues("account");
        if (!account) {
            return toast.error("Please enter your email or phone number");
        }
        sendOtp.mutate({ account });
    }

    const onSubmit = (data: Forgot) => {
        const { account, code, password, confirmPassword } = data;
        if (!account || !code || !password || !confirmPassword) {
            return toast.error("Please fill all the fields");
        }
        if (!EMAIL_REGEX.test(account) && !PHONE_REGEX.test(account)) {
            return toast.error("Invalid email or phone number");
        }
        if (code.length < 6) {
            return toast.error("Invalid code");
        }
        if (password !== confirmPassword) {
            return toast.error("Passwords don't match");
        }
        verifyOtp.mutate({ account, code, password });
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
                                    <div className="flex h-10 items-center relative gap-0 pl-2.5 pr-3 py-0 transition-all duration-500 hover:bg-gray-100/60 hover:border-gray-100/60 bg-white border border-soft-200 rounded-xl">
                                        <Icons.user_line />
                                        <div className="flex-1 relative">
                                            <InputElement form={form} name="account" placeholder="Phone number or email address" className="border-none  shadow-none absolute top-1/2 -translate-y-1/2" />
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
                                    <div className="flex h-10 items-center relative gap-0 pl-1 pr-3 py-0 transition-all duration-500 hover:bg-gray-100/60 hover:border-gray-100/60 bg-white border border-soft-200 rounded-xl">
                                        <div className="flex-1 relative">
                                            <InputElement form={form} name="password" placeholder="Enter new password" className="border-none shadow-none absolute top-1/2 -translate-y-1/2" />
                                        </div>
                                        <div className="cursor-pointer">
                                            <Icons.eye />
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage className="font-medium text-xs" />
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
                                    <div className="flex h-10 items-center relative gap-0 pl-1 pr-3 py-0 transition-all duration-500 hover:bg-gray-100/60 hover:border-gray-100/60 bg-white border border-soft-200 rounded-xl">
                                        <div className="flex-1 relative">
                                            <InputElement form={form} name="confirmPassword" placeholder="Confirm new password" className="border-none shadow-none absolute top-1/2 -translate-y-1/2" />
                                        </div>
                                        <div className="cursor-pointer">
                                            <Icons.eye />
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage className="font-medium text-xs" />
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
                                    <div className="flex h-10 items-center relative py-0 transition-all duration-500 hover:bg-gray-100/60 hover:border-gray-100/60 bg-white border border-soft-200 rounded-xl">
                                        <div className="flex-1 relative px-1">
                                            <InputElement form={form} name="code" placeholder="Enter code" className="border-none shadow-none absolute top-1/2 -translate-y-1/2" />
                                        </div>
                                        <Separator orientation="vertical" className="h-full" />
                                        <SendCodeButton onClick={handleSendOtp} loading={sendOtp.isPending} />
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage className="font-medium text-xs" />
                        </FormItem>
                    )}
                />
                <SubmitButton text="Reset" onClick={() => onSubmit(form.getValues())} loading={verifyOtp.isPending} />
            </form>
        </Form>
    )
}

export default ForgotForm;