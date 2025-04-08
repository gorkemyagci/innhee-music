"use client"
import Search from "../sections/search";
import Workers from "@/modules/dashboard/ui/sections/worker/workers";
import { trpc } from "@/trpc/client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Worker {
    id: string;
    about: string | null;
    position: string;
    salary: number;
    skills: string[];
    user: {
        id: string;
        nickname: string;
        email: string;
    };
}

const FindJobsWorkers = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { data: workers, isPending } = trpc.dashboard.getAllWorkers.useQuery();

    console.log(workers);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const filteredWorkers = workers?.filter((worker: Worker) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            worker.user?.nickname?.toLowerCase().includes(searchLower) ||
            worker.position?.toLowerCase().includes(searchLower) ||
            worker.about?.toLowerCase().includes(searchLower)
        );
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="w-full flex flex-col gap-8">
            <Search onSearch={handleSearch} />
            <motion.div
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <Workers workers={filteredWorkers} isPending={isPending} />
            </motion.div>
        </div>
    );
};

export default FindJobsWorkers;