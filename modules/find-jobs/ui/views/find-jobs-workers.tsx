"use client"
import Search from "../sections/search";
import Workers from "@/modules/find-works/ui/sections/worker/workers";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FindJobsWorkers = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <div className="w-full flex flex-col gap-8">
            <Search />
            <motion.div
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <Workers />
            </motion.div>
        </div>
    );
};

export default FindJobsWorkers;