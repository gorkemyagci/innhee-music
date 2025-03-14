import FindJobs from "@/modules/find-jobs/ui/views";
import { trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
    void trpc.jobPosting.getJobPosts.prefetchInfinite();
    void trpc.dashboard.getAllWorkers.prefetch();
    return <FindJobs />
}

export default Page;