"use client"

import { useEffect, useState } from "react";
import Details from "../sections/user/details";
import Payment from "../sections/user/payment";
import Timeline from "../sections/user/timeline";
import UserHead from "../sections/user/user-head";
import OrderDetailsWorkerSkeleton from "@/components/skeletons/order-details-worker-skeleton";
import FileWork from "../sections/user/file-work";

const OrderDetailsUser = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <OrderDetailsWorkerSkeleton />;
    }

    return (
        <div className="flex flex-col gap-5 items-start w-full px-5 lg:px-0">
            <UserHead />
            <Payment />
            <div className="w-full flex flex-col lg:flex-row gap-5 lg:gap-6">
                <Timeline />
                <div className="flex-1">
                    <div className="flex flex-col gap-5">
                        <Details />
                        <FileWork />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsUser;