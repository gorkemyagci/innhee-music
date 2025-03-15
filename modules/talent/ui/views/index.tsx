"use client"
import { useQueryState } from "nuqs";
import TalentTabs from "../components/tabs";
import Woker from "./woker";
import Review from "./review";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import FileUploadModal from "../components/file-upload-modal";
import { trpc } from "@/trpc/client";
import { notFound } from "next/navigation";
import SidebarLayout from "../sections/sidebar-layout";
import { SidebarLayoutSkeleton, TalentPageSkeleton } from "@/components/skeletons/talent";

interface TalentPageProps {
    workerId: string;
    userId: string;
}

const TalentPage = ({ workerId, userId }: TalentPageProps) => {
    const [activeTab, setActiveTab] = useQueryState("tab", {
        defaultValue: "woker",
    });
    const { data, isPending } = trpc.talent.getWorkerById.useQuery(workerId);
    if (isPending) {
        return <>
            <SidebarLayoutSkeleton />
            <div className="w-full mt-0">
                <TalentPageSkeleton />
            </div>
        </>;
    }

    if (!data?.id && !isPending) {
        notFound();
    }

    return <>
        <SidebarLayout data={data} />
        <div className="w-full mt-0">
            <div className="flex flex-col w-full items-start gap-4 md:gap-6">
                <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                    <TalentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    {data?.id === userId && (
                        <FileUploadModal workerId={data.id} nickname={data?.user?.nickname || "Unknown"}>
                            <Button
                                type="button"
                                className="h-9 p-1.5 px-2 w-[90px] flex items-center gap-1 disabled:cursor-auto group rounded-[10px] text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                                <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                                <Icons.arrow_up className="stroke-white size-4 md:size-5" />
                                <span className="text-xs md:text-sm">Upload</span>
                            </Button>
                        </FileUploadModal>
                    )}
                </div>
                {activeTab === "woker" && <Woker />}
                {activeTab === "review" && <Review />}
            </div>
        </div>
    </>
}

export default TalentPage;