"use client"

import { useQueryState } from "nuqs";
import BuyerTabs from "../components/tabs";
import Orders from "./orders";
import Review from "./review";
import { useEffect, useState } from "react";

const BuyerPage = () => {
    const [activeTab, setActiveTab] = useQueryState("tab", {
        defaultValue: "orders",
    });
    
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
        <div className="flex flex-col w-full items-start gap-4 md:gap-6 overflow-hidden">
            <div className="w-full flex items-start md:items-center justify-between overflow-visible">
                <BuyerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="w-full overflow-x-hidden">
                {activeTab === "orders" && <Orders />}
                {activeTab === "review" && <Review />}
            </div>
        </div>
    );
}

export default BuyerPage;