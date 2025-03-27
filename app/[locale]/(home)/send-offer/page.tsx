import SendOrder from "@/modules/send-order/ui/views/send-order";
import { trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async ({
    params
}: {
    params: Promise<{ receiverId: string }>
}) => {
    const { receiverId } = await params;
    void trpc.talent.getWorkerById.prefetch(receiverId);
    return <SendOrder />
}

export default Page;