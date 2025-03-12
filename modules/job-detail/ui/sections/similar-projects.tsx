import { featuredJobs } from "@/lib/mockData";
import ProjectItem from "@/modules/find-works/ui/components/project-item";

const SimilarProjects = () => {
    return <div className="w-full flex flex-col items-start gap-3 md:gap-4">
        <p className="text-main-900 font-semibold text-lg md:text-xl">Similar Projects</p>
        {featuredJobs.slice(0, 1).map((item, index) => (
            <ProjectItem item={item} key={index} />
        ))}
    </div>
}

export default SimilarProjects;