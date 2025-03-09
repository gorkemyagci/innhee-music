"use client"
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Order from "../sections/order";
import { useState } from "react";
import { useQueryState } from "nuqs";
import Review from "../sections/review";
import ProfileTabs from "../components/tabs";

const ProfileDetail = () => {
    const [tab, setTab] = useQueryState("tab", { defaultValue: "order" });
    return <div className="w-full flex flex-col items-start gap-10">
        <div className="w-full flex items-center justify-between">
            <ProfileTabs />
            {tab == "order" && (
                <Button
                    type="button"
                    className="w-[167px] h-10 disabled:cursor-auto group rounded-[10px] text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                    <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                    <Icons.arrow_up />
                    Uplaod new audio
                </Button>
            )}
        </div>
        {tab === "order" && <Order />}
        {tab === "review" && <Review />}
    </div>
}

export default ProfileDetail;