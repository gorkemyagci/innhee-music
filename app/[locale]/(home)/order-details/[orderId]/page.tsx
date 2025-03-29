import { getTokenFromCookie } from "@/app/server/action";
import { DecodedToken } from "@/lib/types/index";
import OrderDetails from "@/modules/order-details/ui/views/order-details";
import { trpc } from "@/trpc/server";
import { jwtDecode } from "jwt-decode";

export const dynamic = "force-dynamic";

const Page = async ({
    params
}: {
    params: Promise<{ orderId: string }>
}) => {
    const { orderId } = await params;
    void trpc.contract.getContractDetails.prefetch({
        contractId: orderId as string
    });
    const token = await getTokenFromCookie();
    let decodedToken: DecodedToken | null = null;
    if (token) {
        try {
            decodedToken = jwtDecode<DecodedToken>(token);
        } catch {}
    }
    const userId = decodedToken?.id;
    return <OrderDetails orderId={orderId} userId={userId as string} />
}

export default Page;