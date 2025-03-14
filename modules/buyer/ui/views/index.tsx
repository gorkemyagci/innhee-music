"use client"

import { useQueryState } from "nuqs";
import BuyerTabs from "../components/tabs";
import Orders from "./orders";
import Review from "./review";
import SidebarLayout from "../sections/sidebar-layout";
import Sidebar from "../sections/sidebar";
import { trpc } from "@/trpc/client";
import { notFound } from "next/navigation";
import BuyerPageSkeleton from "@/components/skeletons/employer";

interface BuyerPageProps {
    employerId: string;
}

const BuyerPage = ({ employerId }: BuyerPageProps) => {
    const [activeTab, setActiveTab] = useQueryState("tab", {
        defaultValue: "orders",
    });
    const { data, isPending } = trpc.employer.getEmployerById.useQuery(employerId);

    if (isPending) {
        return <BuyerPageSkeleton />;
    }

    if (!data?.id && !isPending) {
        return notFound();
    }

    console.log(data);

    return (
        <div className="flex flex-col md:flex-row items-start gap-8">
            <SidebarLayout data={data} />
            <div className="md:block hidden">
                <Sidebar data={data} />
            </div>
            <div className="w-full">
                <div className="flex flex-col w-full items-start gap-4 md:gap-6 overflow-hidden">
                    <div className="w-full flex items-start md:items-center justify-between overflow-visible">
                        <BuyerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                    <div className="w-full overflow-x-hidden">
                        {activeTab === "orders" && <Orders />}
                        {activeTab === "review" && <Review />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyerPage;