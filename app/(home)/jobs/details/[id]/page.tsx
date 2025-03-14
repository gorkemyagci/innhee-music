import JobDetail from "@/modules/job-detail/ui/views/job-detail";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ id: string }>
}

const Page = async ({ params }: PageProps) => {
    const { id } = await params;
    void trpc.jobPosting.getJobPostById.prefetch(id);
    void trpc.jobPosting.getJobPosts.prefetch();
    return <HydrateClient>
        <JobDetail id={id} />
    </HydrateClient>
}

export default Page;