import JobPosting from "@/modules/job-posting/ui/views/job-posting";
import { trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
    void trpc.jobPosting.getAllSkillLevels.prefetchInfinite();
    void trpc.jobPosting.getAllCandidateSources.prefetchInfinite();
    return <JobPosting />
}

export default Page;