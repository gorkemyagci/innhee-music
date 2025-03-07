"use client";
import FindJobsWorkers from "./find-jobs-workers";
import { useQueryState } from "nuqs";
import FindProjects from "./find-projects";
import Beats from "./beats";
import { Suspense } from "react";

const FindJobsSuspense = () => {
    const [tab, setTab] = useQueryState("tab", {
        defaultValue: "workers",
    });
    if (tab === "workers") {
        return  <FindJobsWorkers />
    } else if (tab === "projects") {
        return <FindProjects />
    } else {
        return <Beats />
    }
}

const FindJobs = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FindJobsSuspense />
        </Suspense>
    )
}

export default FindJobs;