import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

const TalentTabs = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
    const t = useTranslations("talent.tabs");
    
    return <Tabs
        defaultValue="woker"
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex items-center justify-center w-full sm:w-auto"
    >
        <TabsList className="grid grid-cols-2 w-full sm:w-auto gap-2 md:gap-4 bg-transparent h-auto p-0">
            <TabsTrigger
                value="woker"
                className="relative cursor-pointer text-xs md:text-sm py-3 md:py-4 px-0 font-medium data-[state=active]:bg-transparent data-[state=active]:text-strong-950 data-[state=active]:shadow-none text-sub-600 hover:text-gray-700 rounded-none border-0 h-auto"
            >
                {t("woker")}
                {activeTab === "woker" && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
                )}
            </TabsTrigger>
            <TabsTrigger
                value="review"
                className="relative cursor-pointer text-xs md:text-sm py-3 md:py-4 px-0 font-medium data-[state=active]:bg-transparent data-[state=active]:text-strong-950 data-[state=active]:shadow-none text-sub-600 hover:text-gray-700 rounded-none border-0 h-auto"
            >
                {t("review")}
                {activeTab === "review" && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
                )}
            </TabsTrigger>
        </TabsList>
    </Tabs>
}

export default TalentTabs;