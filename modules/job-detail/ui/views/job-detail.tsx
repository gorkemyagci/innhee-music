"use client";
import Detail from "../sections/detail";
import Head from "../sections/head";
import List from "../sections/list";
import JobLink from "../sections/job-link";
import SimilarProjects from "../sections/similar-projects";
import Info from "../sections/info";
import { trpc } from "@/trpc/client";
import { HeadSkeleton, DetailSkeleton, SimilarProjectsSkeleton, InfoSkeleton, ListSkeleton, JobLinkSkeleton } from "@/components/skeletons/job-detail";


const JobDetail = ({ id }: { id: string }) => {
    const { data, isLoading } = trpc.jobPosting.getJobPostById.useQuery(id);    
    if (isLoading) {
        return (
            <div className="w-full flex flex-col items-start gap-[14px]">
                <HeadSkeleton />
                <div className="w-full flex flex-col md:flex-row items-start gap-6">
                    {/* Main content skeleton */}
                    <div className="flex flex-col gap-6 md:gap-10 items-start w-full md:flex-[3]">
                        <div className="flex flex-col items-start gap-6 w-full">
                            <DetailSkeleton />
                        </div>
                        <SimilarProjectsSkeleton />
                    </div>
                    
                    {/* Sidebar skeleton */}
                    <div className="w-full md:flex-[1.37] mt-6 md:mt-0">
                        <div className="flex flex-col items-start gap-6 w-full">
                            <InfoSkeleton />
                            <ListSkeleton />
                            <JobLinkSkeleton />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="w-full flex flex-col items-start gap-[14px]">
            <Head />
            <div className="w-full flex flex-col md:flex-row items-start gap-6">
                <div className="flex flex-col gap-6 md:gap-10 items-start w-full md:flex-[3]">
                    <div className="flex flex-col items-start gap-6 w-full">
                        <Detail item={data} />
                    </div>
                    <SimilarProjects />
                </div>
                <div className="w-full md:flex-[1.37] mt-6 md:mt-0">
                    <div className="flex flex-col items-start gap-6 w-full">
                        <Info item={data} />
                        <List />
                        <JobLink item={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetail;