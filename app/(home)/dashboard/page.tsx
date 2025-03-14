import { getTokenFromCookie } from "@/app/server/action";
import BuyerDashboard from "@/modules/dashboard/ui/views/buyer-dashboard";
import WorkerDashboard from "@/modules/dashboard/ui/views/worker-dashboard";
import { HydrateClient, trpc } from "@/trpc/server";
import { jwtDecode } from "jwt-decode";

export const dynamic = "force-dynamic";

interface DecodedToken {
    id: string;
    email: string;
    role: string;
    userType?: string;
    iat: number;
    exp: number;
}

const Page = async () => {
    void trpc.jobPosting.getJobPosts.prefetchInfinite();
    void trpc.dashboard.getAllWorkers.prefetch();
    const token = await getTokenFromCookie();
    let decodedToken: DecodedToken | null = null;
    if (token) {
        try {
            decodedToken = jwtDecode<DecodedToken>(token);
            void trpc.auth.getMe.prefetch();
        } catch {}
    }
    return (
        <HydrateClient>
            {decodedToken?.userType === "EMPLOYER" ? <BuyerDashboard /> : <WorkerDashboard />}
        </HydrateClient>
    );
}

export default Page;