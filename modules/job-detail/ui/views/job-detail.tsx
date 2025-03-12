import Detail from "../sections/detail";
import Head from "../sections/head";
import List from "../sections/list";
import JobLink from "../sections/job-link";
import SimilarProjects from "../sections/similar-projects";
import Info from "../sections/info";

const JobDetail = () => {
    return (
        <div className="w-full flex flex-col items-start gap-[14px]">
            <Head />
            <div className="w-full flex flex-col md:flex-row items-start gap-6">
                {/* Main content - takes full width on mobile, 3/4 on larger screens */}
                <div className="flex flex-col gap-6 md:gap-10 items-start w-full md:flex-[3]">
                    <div className="flex flex-col items-start gap-6 w-full">
                        <Detail />
                    </div>
                    <SimilarProjects />
                </div>
                
                {/* Sidebar - stacks below on mobile, side by side on larger screens */}
                <div className="w-full md:flex-[1.37] mt-6 md:mt-0">
                    <div className="flex flex-col items-start gap-6 w-full">
                        <Info />
                        <List />
                        <JobLink />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetail;