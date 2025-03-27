"use client";
import Detail from "../sections/detail";
import Head from "../sections/head";
import List from "../sections/list";
import JobLink from "../sections/job-link";
import SimilarProjects from "../sections/similar-projects";
import Info from "../sections/info";
import { trpc } from "@/trpc/client";
import { HeadSkeleton, DetailSkeleton, SimilarProjectsSkeleton, InfoSkeleton, ListSkeleton, JobLinkSkeleton } from "@/components/skeletons/job-detail";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";


const JobDetail = ({ id }: { id: string }) => {
    const { data, isLoading } = trpc.jobPosting.getJobPostById.useQuery(id);    
    const { initializeFromToken, user } = useAuthStore();
    useEffect(() => {
        initializeFromToken();
    }, []);
    const isOwner = data?.employerId === user?.id;
    console.log(data);
    if (isLoading) {
        return (
            <div className="w-full flex flex-col items-start gap-[14px]">
                <HeadSkeleton />
                <div className="w-full flex flex-col md:flex-row items-start gap-6">
                    <div className="flex flex-col gap-6 md:gap-10 items-start w-full md:flex-[3]">
                        <div className="flex flex-col items-start gap-6 w-full">
                            <DetailSkeleton />
                        </div>
                        <SimilarProjectsSkeleton />
                    </div>
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
                        <Info item={data} isOwner={isOwner} />
                        <List data={data} isOwner={isOwner} />
                        <JobLink item={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetail;