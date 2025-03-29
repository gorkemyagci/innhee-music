"use client"

import Details from "../sections/worker/details";
import Payment from "../sections/worker/payment";
import Timeline from "../sections/worker/timeline";
import UploadWork from "../sections/worker/upload-work";
import UserHead from "../sections/worker/user-head";
import { trpc } from "@/trpc/client";

const OrderDetailsWorker = ({ orderId }: { orderId: string }) => {
    const { data: contractDetails } = trpc.contract.getContractDetails.useQuery({
        contractId: orderId as string
    });
    return (
        <div className="flex flex-col gap-5 items-start w-full px-5 lg:px-0">
            <UserHead user={contractDetails?.sender} chatRoomId={contractDetails?.chatRoomId} />
            <Payment data={contractDetails} />
            <div className="w-full flex flex-col lg:flex-row gap-5 lg:gap-6">
                <Timeline milestones={contractDetails?.milestones} />
                <div className="flex-1">
                    <div className="flex flex-col gap-5">
                        <Details data={contractDetails} />
                        <UploadWork />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsWorker;