"use client"
import { z } from "zod"
import Head from "../components/head"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import InputElement from "@/components/custom/form-elements/input";
import Image from "next/image";
import { Icons } from "@/components/icons";

const formSchema = z.object({
    companyName: z.string().min(1, { message: "Company name is required" }),
    unifiedSocialCreditCode: z.string().min(1, { message: "Unified Social Credit Code is required" }),
    contactPersonName: z.string().min(1, { message: "Contact person name is required" }),
    portfolio: z.array(z.string()).min(1, { message: "Portfolio is required" }),
    verifyIdentity: z.boolean().refine(val => val === true, {
        message: "You must agree to verify your identity",
    }),
})

export type Company = z.infer<typeof formSchema>;

const Company = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<Company>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            unifiedSocialCreditCode: "",
            contactPersonName: "",
            portfolio: [],
            verifyIdentity: false,
        }
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFile = e.target.files[0];
            setFiles([newFile]);
            setIsUploading(true);
            setUploadProgress(0);
            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsUploading(false);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 300);
            form.setValue("portfolio", [newFile.name]);
        }
    };

    const removeFile = () => {
        setFiles([]);
        form.setValue("portfolio", []);
    };

    const onSubmit = (data: Company) => {};

    return (
        <div>
            <Head heading="Company" subHeading="Personalize your privacy settings and enhance the security of your account." />
            <div className="w-full px-6 pt-6">
                <div className="max-w-[480px] mx-auto flex flex-col items-start gap-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium translate-y-1 text-sm text-strong-950">Company Name</FormLabel>
                                            <FormControl>
                                                <InputElement
                                                    placeholder="Full Company Name"
                                                    form={form}
                                                    name={field.name}
                                                    className="h-10 px-2.5 py-2.5 bg-white border border-soft-200 rounded-[10px] shadow-sm"
                                                />
                                            </FormControl>
                                            <FormMessage className="font-medium text-sm" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="unifiedSocialCreditCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium translate-y-1 text-sm text-strong-950">Unified Social Credit Code</FormLabel>
                                            <FormControl>
                                                <InputElement
                                                    placeholder="Code"
                                                    form={form}
                                                    name={field.name}
                                                    className="h-10 px-2.5 py-2.5 bg-white border border-soft-200 rounded-[10px] shadow-sm"
                                                />
                                            </FormControl>
                                            <FormMessage className="font-medium text-sm" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="contactPersonName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium translate-y-1 text-sm text-strong-950">Name of Contact Person</FormLabel>
                                            <FormControl>
                                                <InputElement
                                                    placeholder="Full Name"
                                                    form={form}
                                                    name={field.name}
                                                    className="h-10 px-2.5 py-2.5 bg-white border border-soft-200 rounded-[10px] shadow-sm"
                                                />
                                            </FormControl>
                                            <FormMessage className="font-medium text-sm" />
                                        </FormItem>
                                    )}
                                />

                                <div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col items-start gap-1">
                                            <h3 className="text-sm font-medium mb-2 text-strong-950">Add to work</h3>
                                            <p className="text-sm text-sub-600 font-normal">Choose a portfolio to add your work.</p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById('portfolio-upload')?.click()}
                                            className="flex items-center justify-center h-10 text-sub-600 font-medium text-sm rounded-[10px] border border-soft-200"
                                        >
                                            Choose
                                        </Button>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FormField
                                            control={form.control}
                                            name="portfolio"
                                            render={() => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                type="file"
                                                                id="portfolio-upload"
                                                                className="hidden"
                                                                onChange={handleFileChange}
                                                                accept=".pdf,.doc,.docx"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="font-medium text-sm" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {files.length > 0 && (
                                        <div className="mt-4 border border-soft-200 rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        src="/assets/svgs/pdf.svg"
                                                        alt="pdf"
                                                        width={40}
                                                        height={40}
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium">{files[0].name}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {Math.round(files[0].size / 1024)} KB of {Math.round(files[0].size / 1024)} KB •
                                                            {isUploading ? <span className="flex items-center gap-1">
                                                                <Icons.uploading className="animate-spin" />
                                                                Uploading...
                                                            </span> : " Uploaded"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={removeFile}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                            <Progress value={uploadProgress} className="h-1" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-start space-x-2 pt-4">
                                    <FormField
                                        control={form.control}
                                        name="verifyIdentity"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="text-sm font-normal text-sub-600">
                                                        The above information is only used to verify your true identity.
                                                    </FormLabel>
                                                    <FormMessage className="font-medium text-sm" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" variant="outline" className="h-10 w-[87px] text-sub-600 font-medium text-sm rounded-[10px] border border-soft-200">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Company;