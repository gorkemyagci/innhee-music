"use client"
import { useQueryState } from "nuqs";
import TalentTabs from "../components/tabs";
import Woker from "./woker";
import Review from "./review";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import FileUploadModal from "../components/file-upload-modal";

const TalentPage = () => {
    const [activeTab, setActiveTab] = useQueryState("tab", {
        defaultValue: "woker",
    });
    return <div className="flex flex-col w-full items-start gap-6">
        <div className="w-full flex items-center justify-between">
            <TalentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <FileUploadModal>
                <Button
                    type="button"
                    className="h-9 p-1.5 px-2 w-[90px] flex items-center gap-1 disabled:cursor-auto group rounded-[10px] text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                    <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                    <Icons.arrow_up className="stroke-white size-5" />
                    Upload
                </Button>
            </FileUploadModal>
        </div>
        {activeTab === "woker" && <Woker />}
        {activeTab === "review" && <Review />}
    </div>
}

export default TalentPage;