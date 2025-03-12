import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

interface BuyerTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const BuyerTabs = ({ activeTab, setActiveTab }: BuyerTabsProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        
        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, []);

    return (
        <Tabs
            defaultValue="orders"
            value={activeTab}
            onValueChange={setActiveTab}
            className={`flex items-center ${isMobile ? 'w-full' : 'w-auto'}`}
        >
            <TabsList className={`grid grid-cols-2 gap-2 md:gap-4 bg-transparent h-auto p-0 ${isMobile ? 'w-full' : 'w-auto'} overflow-visible`}>
                <TabsTrigger
                    value="orders"
                    className="relative cursor-pointer text-xs md:text-sm py-3 md:py-4 px-0 font-medium data-[state=active]:bg-transparent data-[state=active]:text-strong-950 data-[state=active]:shadow-none text-sub-600 hover:text-gray-700 rounded-none border-0 h-auto"
                >
                    Orders
                    {activeTab === "orders" && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
                    )}
                </TabsTrigger>
                <TabsTrigger
                    value="review"
                    className="relative cursor-pointer text-xs md:text-sm py-3 md:py-4 px-0 font-medium data-[state=active]:bg-transparent data-[state=active]:text-strong-950 data-[state=active]:shadow-none text-sub-600 hover:text-gray-700 rounded-none border-0 h-auto"
                >
                    Review
                    {activeTab === "review" && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
                    )}
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}

export default BuyerTabs;