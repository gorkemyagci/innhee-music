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
            <div className="w-full flex items-start gap-6">
                <div className="flex flex-col gap-10 items-start flex-[3]">
                    <div className="flex flex-col items-start gap-6">
                        <Detail />
                    </div>
                    <SimilarProjects />
                </div>
                <div className="flex-[1.37]">
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