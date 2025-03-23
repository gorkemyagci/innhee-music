"use client"

import { useEffect, useState } from "react";
import Details from "../sections/worker/details";
import Payment from "../sections/worker/payment";
import Timeline from "../sections/worker/timeline";
import UploadWork from "../sections/worker/upload-work";
import UserHead from "../sections/worker/user-head";
import OrderDetailsWorkerSkeleton from "@/components/skeletons/order-details-worker-skeleton";

const OrderDetailsWorker = () => {
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
                        <UploadWork />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsWorker;