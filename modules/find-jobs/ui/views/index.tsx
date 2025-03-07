"use client";
import FindJobsWorkers from "./find-jobs-workers";
import { useQueryState } from "nuqs";
import FindProjects from "./find-projects";
import Beats from "./beats";

const FindJobs = () => {
    const [tab, setTab] = useQueryState("tab", {
        defaultValue: "workers",
    });
    if (tab === "workers") {
        return <FindJobsWorkers />
    } else if (tab === "projects") {
        return <FindProjects />
    } else {
        return <Beats />
    }
}

export default FindJobs;