import WorkerDashboard from "@/modules/find-works/ui/views/worker-dashboard";
import { trpc } from "@/trpc/server";

const Page = async () => {
    void trpc.jobPosting.getJobPosts.prefetchInfinite();
    void trpc.auth.getMe.prefetch();
    return <WorkerDashboard />
}

export default Page;