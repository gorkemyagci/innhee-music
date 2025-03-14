"use client"
import { ProjectItemType } from "@/lib/types";
import ProjectItem from "@/modules/find-works/ui/components/project-item";
import { trpc } from "@/trpc/client";

const SimilarProjects = () => {
    const { data } = trpc.jobPosting.getJobPosts.useQuery();
    return <div className="w-full flex flex-col items-start gap-3 md:gap-4">
        <p className="text-main-900 font-semibold text-lg md:text-xl">Similar Projects</p>
        {data?.length > 0 && data?.slice(0, 1).map((item: ProjectItemType, index: number) => (
            <ProjectItem item={item} key={index} />
        ))}
    </div>
}

export default SimilarProjects;