"use client";
import { Form } from "@/components/ui/form";
import Sidebar from "../sections/sidebar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import JobDetails from "../sections/job-details";
import ContractTerms from "../sections/contract-terms";
import Attachments from "../sections/attachments";
import FAQ from "../sections/FAQ";
import Submit from "../components/submit";

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
    deadline: z.string().optional(),
    attachments: z.array(z.object({
        name: z.string(),
        size: z.number(),
        type: z.string()
    })),
    milestones: z.array(z.object({
        title: z.string(),
        amount: z.number().min(0, "Amount must be greater than 0"),
        deadline: z.string(),
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
    const form = useForm<SendOrderFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            receiver: {
                userId: "",
                name: ""
            },
            visibility: "can view",
            orderTitle: "",
            contractTitle: "",
            description: "",
            skillLevels: [],
            paymentType: "one-time",
            amount: 0,
            currency: "CNY",
            deadline: "",
            milestones: [],
            attachments: [],
            termsAgreed: false
        }
    })
    const onSubmit = (data: SendOrderFormValues) => {}
    return <div className="w-full flex items-start gap-6">
        <div className="flex-1 w-full lg:max-w-[856px] flex flex-col items-start gap-8">
            <h3 className="text-strong-950 font-medium text-[40px] leading-[48px]">Send an offer</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-start gap-8">
                    <JobDetails form={form} />
                    <ContractTerms form={form} />
                    <Attachments form={form} />
                    <FAQ />
                    <Submit form={form} />
                </form>
            </Form>
        </div>
        <Sidebar />
    </div>
}

export default SendOrder;