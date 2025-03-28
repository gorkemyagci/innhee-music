"use client";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pageUrls } from "@/lib/constants/page-urls";

interface Worker {
    id: string;
    about: string | null;
    createdAt: string;
    position: string;
    salary: number;
    updatedAt: string;
    jobApplications: JobApplication[];
    user: {
        id: string;
        nickname: string | null;
        email: string;
    };
}

interface JobApplication {
    id: string;
    amount: number;
    createdAt: string;
    description: string;
    jobPostId: string;
    matchingScore: boolean;
    messagingSettings: boolean;
    status: string;
    updatedAt: string;
    worker: Worker;
    workerId: string;
}

interface ListProps {
    data: {
        id: string;
        jobApplications: JobApplication[];
    };
    isOwner: boolean;
}

const List = ({ data, isOwner }: ListProps) => {
    const t = useTranslations("jobDetail.list");
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);

    const handlePlayClick = (index: number) => {
        if (playingIndex === index) {
            setPlayingIndex(null);
            return;
        }
        setPlayingIndex(index);
        setTimeout(() => {
            setPlayingIndex(null);
        }, 3000);
    };

    return (
        <div className="bg-white w-full rounded-[20px] p-3 md:p-4 flex flex-col items-start gap-3 md:gap-4 shadow-sm">
            <p className="text-strong-950 font-medium text-sm md:text-base">{t("title")}</p>
            <Separator className="bg-soft-200 w-full" />
            {data.jobApplications && data.jobApplications.length > 0 ? (
                data.jobApplications.map((application, i) => (
                    <div key={application.id} className="flex h-10 md:h-12 w-full items-center justify-between">
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <UserAvatar
                                imageUrl="/assets/images/avatar-3.png"
                                name={application?.worker?.jobApplications[0]?.worker?.user?.nickname || application?.worker?.jobApplications[0]?.worker?.user?.email}
                                className="w-8 h-8 md:w-10 md:h-10"
                            />
                            <div className="flex flex-col items-start">
                                <p className="text-[#222530] font-medium text-xs md:text-sm">
                                    {application?.worker?.jobApplications[0]?.worker?.user?.nickname || application?.worker?.jobApplications[0]?.worker?.user?.email}
                                </p>
                                <div className="flex items-center gap-0.5">
                                    <Icons.star className="size-3 md:size-3.5" />
                                    <span className="text-sub-600 font-normal text-[10px] md:text-xs">
                                        {application?.matchingScore ? "4.9(125)" : "New"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className="cursor-pointer"
                                onClick={() => handlePlayClick(i)}
                            >
                                {playingIndex === i ? (
                                    <Icons.pause_fill className="size-5 md:size-6" />
                                ) : (
                                    <Icons.play_mini_fill className="size-5 md:size-6" />
                                )}
                            </div>
                            {isOwner && (
                                <>
                                    <Icons.send_message />
                                    <Link href={`${pageUrls.SEND_OFFER}?receiverId=${application?.workerId}`}>
                                        <Button
                                            variant="outline"
                                            className="bg-white border border-soft-200 rounded-lg shadow-[0_1px_2px_0_rgba(27,28,29,0.05)] hover:border-weak-50 hover:bg-weak-50 transition-all duration-150 text-strong-950 h-7 w-14 font-medium text-sm"
                                        >
                                            {t("invite")}
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="w-full text-center py-4">
                    <p className="text-sub-600 text-sm">{t("noApplicants")}</p>
                </div>
            )}
        </div>
    );
};

export default List;