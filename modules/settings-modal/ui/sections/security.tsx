"use client";
import { Icons } from "@/components/icons";
import Head from "../components/head";
import { trpc } from "@/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";

const Security = () => {
    const { data, isPending } = trpc.auth.getMe.useQuery();
    console.log(data);

    if (isPending) {
        return (
            <div className="w-full">
                <Head heading="Security" subHeading="Personalize your privacy settings and enhance the security of your account." />
                <div className="w-full px-6 pt-6 flex flex-col gap-6 items-start">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-4" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <Head heading="Security" subHeading="Personalize your privacy settings and enhance the security of your account." />
            <div className="w-full px-6 pt-6 flex flex-col gap-6 items-start">
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-strong-950 font-medium text-sm">Email</p>
                        <span className="text-sub-600 text-xs font-normal">Business email address recommended.</span>
                    </div>
                    <span className="text-sub-600 font-normal text-sm">{data?.email}</span>
                    <Icons.pencil />
                </div>
                <div className="border border-dashed w-full h-[1px] border-soft-200" />
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-strong-950 font-medium text-sm">Phone Number</p>
                        <span className="text-sub-600 text-xs font-normal">Business phone number recommended.</span>
                    </div>
                    <span className="text-sub-600 font-normal text-sm">{data?.phone || "No phone number"}</span>
                    <Icons.pencil />
                </div>
                <div className="border border-dashed w-full h-[1px] border-soft-200" />
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-strong-950 font-medium text-sm">Wechat</p>
                        <span className="text-sub-600 text-xs font-normal">Business phone number recommended.</span>
                    </div>
                    <span className="text-sub-600 font-normal text-sm">wec**at</span>
                    <Icons.pencil />
                </div>
                <div className="border border-dashed w-full h-[1px] border-soft-200" />
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-strong-950 font-medium text-sm">Change Password</p>
                        <span className="text-sub-600 text-xs font-normal">Update password for enhanced account security.</span>
                    </div>
                    <Icons.pencil />
                </div>
                <div className="border border-dashed w-full h-[1px] border-soft-200" />
            </div>
        </div>
    )
}

export default Security;