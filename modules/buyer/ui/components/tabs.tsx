import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BuyerTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const BuyerTabs = ({ activeTab, setActiveTab }: BuyerTabsProps) => {
    return <Tabs
        defaultValue="orders"
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex items-center justify-center"
    >
        <TabsList className="grid grid-cols-2 gap-4 bg-transparent h-auto p-0">
            <TabsTrigger
                value="orders"
                className="relative cursor-pointer text-sm py-4 px-0 font-medium data-[state=active]:bg-transparent data-[state=active]:text-strong-950 data-[state=active]:shadow-none text-sub-600 hover:text-gray-700 rounded-none border-0 h-auto"
            >
                Orders
                {activeTab === "orders" && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
                )}
            </TabsTrigger>
            <TabsTrigger
                value="review"
                className="relative cursor-pointer text-sm py-4 px-0 font-medium data-[state=active]:bg-transparent data-[state=active]:text-strong-950 data-[state=active]:shadow-none text-sub-600 hover:text-gray-700 rounded-none border-0 h-auto"
            >
                Review
                {activeTab === "review" && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
                )}
            </TabsTrigger>
        </TabsList>
    </Tabs>
}

export default BuyerTabs;