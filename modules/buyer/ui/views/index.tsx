"use client"

import { useQueryState } from "nuqs";
import BuyerTabs from "../components/tabs";
import Orders from "./orders";
import Review from "./review";

const BuyerPage = () => {
    const [activeTab, setActiveTab] = useQueryState("tab", {
        defaultValue: "orders",
    });
    return <div className="flex flex-col w-full items-start gap-6">
        <div className="w-full flex items-center justify-between">
            <BuyerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        {activeTab === "orders" && <Orders />}
        {activeTab === "review" && <Review />}
    </div>
}

export default BuyerPage;