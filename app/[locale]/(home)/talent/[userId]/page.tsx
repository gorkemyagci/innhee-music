import { getTokenFromCookie } from "@/app/server/action";
import TalentPage from "@/modules/talent/ui/views";
import { trpc } from "@/trpc/server";
import { jwtDecode } from "jwt-decode";

interface PageProps {
    params: Promise<{ userId: string }>
}

interface DecodedToken {
    id: string;
}

export const dynamic = "force-dynamic";

const Page = async ({ params }: PageProps) => {
    const { userId } = await params;
    const token = await getTokenFromCookie();
    let currentUserId = "";
    if (token) {
        try {
            const decoded = jwtDecode<DecodedToken>(token);
            currentUserId = decoded.id || "";
        } catch {}
    }
    void trpc.talent.getWorkerById.prefetch(userId);
    void trpc.talent.getWorkerPortfolio.prefetch(userId);
    
    return (
        <>
            <TalentPage workerId={userId} userId={currentUserId} />
        </>
    )
}

export default Page;