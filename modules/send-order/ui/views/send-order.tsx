"use client";
import { Form, FormItem, FormField } from "@/components/ui/form";
import Sidebar from "../sections/sidebar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import JobDetails from "../sections/job-details";
import ContractTerms from "../sections/contract-terms";
import Attachments from "../sections/attachments";
import FAQ from "../sections/FAQ";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRef, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { parseCookies } from "nookies";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    receiver: z.object({
        userId: z.string(),
        name: z.string()
    }),
    visibility: z.enum(["can view"]),
    orderTitle: z.string(),
    contractTitle: z.string().min(1, "Contract title is required"),
    description: z.string().max(1000, "Description cannot exceed 1000 characters"),
    skillLevels: z.array(z.enum(["Trainee", "Skilled", "Expert"])).max(4, "Maximum 4 skill levels allowed"),
    paymentType: z.enum(["one-time", "installment"]),
    amount: z.number().min(0, "Amount must be greater than 0"),
    currency: z.enum(["CNY"]),
    deadline: z.date().optional(),
    attachments: z.array(z.object({
        name: z.string(),
        size: z.number(),
        type: z.string()
    })).optional(),
    milestones: z.array(z.object({
        title: z.string(),
        amount: z.number().min(0, "Amount must be greater than 0"),
        deadline: z.date(),
        currency: z.enum(["CNY"])
    })).optional(),
    termsAgreed: z.boolean().refine(val => val === true, {
        message: "You must agree to the Terms & Conditions and Privacy Policy"
    })
}).superRefine((data, ctx) => {
    if (data.paymentType === "installment" && (!data.milestones || data.milestones.length === 0)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Milestones are required for installment payments",
            path: ["milestones"]
        });
    }
});

type SendOrderFormValues = z.infer<typeof formSchema>;

const SendOrder = () => {
    const [receiverId, setReceiverId] = useQueryState("receiverId");
    const { data: receiver } = trpc.talent.getWorkerById.useQuery(receiverId || "");
    const t = useTranslations("sendOrder");
    const tToast = useTranslations("sendOrder.toast");
    const [isLoading, setIsLoading] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const cookies = parseCookies();
    const router = useRouter();

    const SOCKET_URL = "wss://inhee-chat-production.up.railway.app/chat";

    const form = useForm<SendOrderFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            receiver: {
                userId: receiverId || "",
                name: receiver?.nickname || ""
            },
            visibility: "can view",
            orderTitle: "",
            contractTitle: "",
            description: "",
            skillLevels: [],
            paymentType: "one-time",
            amount: 0,
            currency: "CNY",
            deadline: undefined,
            milestones: [],
            attachments: [],
            termsAgreed: false
        }
    });

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io(SOCKET_URL, {
                extraHeaders: {
                    Authorization: `Bearer ${cookies.token}`
                },
                auth: {
                    Authorization: `Bearer ${cookies.token}`
                },
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000
            });

            socketRef.current.on("connect", () => {});
            socketRef.current.on("connect_error", (error) => {});
            socketRef.current.on("disconnect", (reason) => {});
            socketRef.current.on("error", (error) => {});
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [cookies.token]);

    const handleSubmit = async (data: SendOrderFormValues) => {
        try {
            setIsLoading(true);

            if (!socketRef.current?.connected) {
                socketRef.current?.connect();
                await new Promise((resolve) => {
                    socketRef.current?.once('connect', () => {
                        resolve(true);
                    });
                });
            }

            const contractData = {
                receiverId: data.receiver.userId,
                amount: data.paymentType === "installment" 
                    ? data.milestones?.reduce((sum: number, milestone: { amount: number }) => sum + (milestone.amount || 0), 0) || 0
                    : data.amount,
                amountCurrency: data.currency,
                description: data.description,
                deadline: data.paymentType === "installment" && data.milestones && data.milestones.length > 0
                    ? new Date(data.milestones[data.milestones.length - 1].deadline).toISOString()
                    : data.deadline ? new Date(data.deadline).toISOString() : undefined,
                startDate: new Date().toISOString(),
                skillLevel: data.skillLevels,
                ...(data.paymentType === "installment" && data.milestones && {
                    milestones: data.milestones.map(milestone => ({
                        title: milestone.title,
                        description: data.description,
                        amount: milestone.amount,
                        amountCurrency: milestone.currency,
                        deadline: new Date(milestone.deadline).toISOString()
                    }))
                })
            };
            socketRef.current?.emit("createContract", contractData, (response: any) => {
                if (response.success) {
                    toast.success(tToast("createSuccess"));
                    const chatRoomId = response.contract.chatRoomId;
                    router.push(`/chat?roomId=${chatRoomId}`);
                    setIsLoading(false);
                } else {
                    toast.error(response.message || tToast("createError"));
                    setIsLoading(false);
                }
            });

        } catch (error) {
            toast.error(tToast("createError"));
            setIsLoading(false);
        }
    };

    return <div className="w-full flex flex-col lg:flex-row items-start gap-6 px-4 lg:px-0">
        <div className="flex-1 w-full lg:max-w-[856px] flex flex-col items-start gap-8">
            <h3 className="text-strong-950 font-medium text-[32px] lg:text-[40px] leading-[40px] lg:leading-[48px]">{t("title")}</h3>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="w-full flex flex-col items-start gap-8"
                >
                    <JobDetails receiver={receiver} form={form} />
                    <ContractTerms form={form} />
                    <Attachments form={form} />
                    <FAQ />
                    <div className="w-full flex flex-col items-start gap-5">
                        <FormField
                            control={form.control}
                            name="termsAgreed"
                            render={() => (
                                <FormItem className="flex py-0.5 md:py-2 items-center gap-1 md:gap-2">
                                    <Checkbox 
                                        checked={form.getValues("termsAgreed")}
                                        onCheckedChange={(checked) => form.setValue("termsAgreed", checked === true)}
                                        id="terms" 
                                        className="border w-[18px] h-[18px] border-soft-200 hover:shadow-sm data-[state=checked]:bg-main-900 data-[state=checked]:border-main-900" 
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-[10px] md:text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        <span>{t("submit.terms")}</span>
                                        <Link href="#" className="border-b border-strong-950 text-main-900 font-medium">{t("submit.termsLink")}</Link>
                                        <span> {t("submit.and")} </span>
                                        <Link href="#" className="border-b border-strong-950 text-main-900 font-medium">{t("submit.privacyLink")}</Link>
                                    </label>
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <Button variant="outline" className="h-10 w-full sm:flex-1 border-soft-200 rounded-lg bg-white flex items-center gap-1.5 text-sub-600 font-medium text-sm">
                                {t("submit.buttons.cancel")}
                            </Button>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting || isLoading}
                                className="w-full sm:flex-1 h-10 disabled:cursor-auto group rounded-[10px] text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                                <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                                {isLoading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : t("submit.buttons.continue")}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
        <div className="w-full lg:w-[300px] lg:sticky lg:top-6">
            <Sidebar />
        </div>
    </div>
}

export default SendOrder;