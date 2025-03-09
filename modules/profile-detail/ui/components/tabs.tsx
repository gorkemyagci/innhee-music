"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryState } from "nuqs";

const ProfileTabs = () => {
    const [tab, setTab] = useQueryState("tab", { defaultValue: "order" });
    return (
        <Tabs defaultValue={tab}>
            <TabsList className="bg-weak-100 p-1 w-[214px]">
                <TabsTrigger value="order" onClick={() => setTab("order")} className="text-soft-400 font-medium text-sm [data-state=active]:text-main-900 cursor-pointer">Order</TabsTrigger>
                <TabsTrigger value="review" onClick={() => setTab("review")} className="text-soft-400 font-medium text-sm [data-state=active]:text-main-900 cursor-pointer">Review</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default ProfileTabs;