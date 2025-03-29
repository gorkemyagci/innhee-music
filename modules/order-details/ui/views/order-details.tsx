"use client"
import OrderDetailsWorkerSkeleton from "@/components/skeletons/order-details-worker-skeleton";
import { trpc } from "@/trpc/client";
import OrderDetailsUser from "./order-details-user";
import OrderDetailsWorker from "./order-details-woker";

const OrderDetails = ({
    orderId,
    userId
}: {
    orderId: string,
    userId: string
}) => {
    const { data, isPending } = trpc.contract.getContractDetails.useQuery({
        contractId: orderId as string
    });
    console.log(data);
    if (isPending) {
        return <OrderDetailsWorkerSkeleton />;
    }
    return <>
        {data?.sender.id === userId ? <OrderDetailsUser orderId={orderId} /> : <OrderDetailsWorker orderId={orderId} />}
    </>
}

export default OrderDetails;