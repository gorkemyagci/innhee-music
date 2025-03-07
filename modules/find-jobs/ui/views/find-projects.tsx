"use client"
import Search from "../sections/search";
import { featuredJobs } from "@/lib/mockData";
import ProjectItem from "@/modules/find-works/ui/components/project-item";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FindProjects = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <div className="w-full flex flex-col gap-8">
            <Search />
            <motion.div 
                className="flex flex-col gap-0 w-full"
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={containerVariants}
            >
                {featuredJobs.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        custom={index}
                    >
                        <ProjectItem item={item} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default FindProjects;