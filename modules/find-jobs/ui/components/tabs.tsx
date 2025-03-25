import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

interface FilterTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const FilterTabs = ({ activeTab, setActiveTab }: FilterTabsProps) => {
    const t = useTranslations("filter.tabs");

    return (
        <Tabs
            defaultValue="workers"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-md mx-auto border-b border-soft-200 flex items-center justify-center"
        >
            <TabsList className="grid grid-cols-3 bg-transparent h-auto p-0">
                <TabsTrigger
                    value="workers"
                    className="relative cursor-pointer text-sm py-4 px-6 font-medium data-[state=active]:bg-transparent data-[state=active]:text-main-900 data-[state=active]:shadow-none text-sub-600 rounded-none border-0 h-auto"
                >
                    {t("workers")}
                    {activeTab === "workers" && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
                    )}
                </TabsTrigger>
                <TabsTrigger
                    value="projects"
                    className="relative cursor-pointer text-sm py-4 px-6 font-medium data-[state=active]:bg-transparent data-[state=active]:text-main-900 data-[state=active]:shadow-none text-sub-600 rounded-none border-0 h-auto"
                >
                    {t("projects")}
                    {activeTab === "projects" && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
                    )}
                </TabsTrigger>
                <TabsTrigger
                    value="betas"
                    className="relative cursor-pointer text-sm py-4 px-6 font-medium data-[state=active]:bg-transparent data-[state=active]:text-main-900 data-[state=active]:shadow-none text-sub-600 rounded-none border-0 h-auto"
                >
                    {t("betas")}
                    {activeTab === "betas" && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
                    )}
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default FilterTabs;