"use client"

import Details from "../sections/user/details";
import Payment from "../sections/user/payment";
import Timeline from "../sections/user/timeline";
import UserHead from "../sections/user/user-head";
import FileWork from "../sections/user/file-work";
import { trpc } from "@/trpc/client";

const OrderDetailsUser = ({ orderId }: { orderId: string }) => {
    const { data: contractDetails } = trpc.contract.getContractDetails.useQuery({
        contractId: orderId as string
    });
    return (
        <div className="flex flex-col gap-5 items-start w-full px-5 lg:px-0">
            <UserHead user={contractDetails?.receiver} chatRoomId={contractDetails?.chatRoomId} />
            <Payment data={contractDetails} />
            <div className="w-full flex flex-col lg:flex-row gap-5 lg:gap-6">
                <Timeline milestones={contractDetails?.milestones} />
                <div className="flex-1">
                    <div className="flex flex-col gap-5">
                        <Details data={contractDetails} />
                        <FileWork />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsUser;