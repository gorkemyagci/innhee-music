import BuyerPage from "@/modules/buyer/ui/views";
import { trpc } from "@/trpc/server";

interface PageProps {
    params: Promise<{ userId: string }>
}

export const dynamic = "force-dynamic";

const Page = async ({ params }: PageProps) => {
    const { userId } = await params;
    void trpc.employer.getEmployerById.prefetch(userId);
    return (
        <>
            <BuyerPage employerId={userId} />
        </>
    );
}

export default Page;