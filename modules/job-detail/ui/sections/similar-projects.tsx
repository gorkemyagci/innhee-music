"use client"
import { ProjectItemType } from "@/lib/types";
import ProjectItem from "@/modules/dashboard/ui/components/project-item";
import { trpc } from "@/trpc/client";
import { useTranslations } from "next-intl";

const SimilarProjects = () => {
    const t = useTranslations("jobDetail.similarProjects");
    const { data } = trpc.jobPosting.getJobPosts.useQuery();
    return <div className="w-full flex flex-col items-start gap-3 md:gap-4">
        <p className="text-main-900 font-semibold text-lg md:text-xl">{t("title")}</p>
        {data?.length > 0 && data?.slice(0, 1).map((item: ProjectItemType, index: number) => (
            <ProjectItem item={item} key={index} />
        ))}
    </div>
}

export default SimilarProjects;