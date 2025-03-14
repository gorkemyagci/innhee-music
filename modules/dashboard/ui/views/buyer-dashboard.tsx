"use client"
import { trpc } from "@/trpc/client";
import Calendar from "../sections/calendar";
import Slider from "../sections/slider";
import Worker from "../sections/worker";

const BuyerDashboard = () => {
    const { data, isPending } = trpc.dashboard.getAllWorkers.useQuery();
    return (
        <>
            <div className="flex-[4] flex flex-col gap-4">
                <Slider />
                <Worker workers={data} isPending={isPending} />
            </div>
            <Calendar />
        </>
    )
}

export default BuyerDashboard;