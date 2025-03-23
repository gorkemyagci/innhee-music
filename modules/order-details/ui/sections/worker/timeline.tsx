"use client";
import { Icons } from "@/components/icons";
import { timelineData } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MilestoneItem from "../../components/milestone-item";

const Timeline = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="flex-1 border border-soft-200 rounded-2xl relative">
            <motion.div 
                onClick={() => setIsOpen(!isOpen)}
                className={cn("bg-weak-50 w-full h-12 py-3 px-4 rounded-t-2xl flex items-center justify-between cursor-pointer", !isOpen && "rounded-b-2xl")}
            >
                <span className="text-strong-950 font-medium">Timeline</span>
                <motion.div
                    animate={{ rotate: isOpen ? 0 : 180 }}
                    transition={{ duration: 0.2 }}
                >
                    <Icons.arrow_down className="fill-sub-600" />
                </motion.div>
            </motion.div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full relative rounded-b-2xl overflow-hidden"
                    >
                        <div className="p-4 flex flex-col gap-4">
                            {timelineData.map((item, index) => (
                                <MilestoneItem key={index} item={item as any} index={index} />
                            ))}
                            <div className="flex relative flex-row cursor-pointer items-center gap-3">
                                <div className="flex items-center border-2 border-sub-600 justify-center w-5 h-5 rounded-full bg-white">
                                    <Icons.plus className="size-2.5 stroke-sub-600"/>
                                </div>
                                <span className="text-sub-600 font-medium text-sm border-b border-sub-600">Add a new milestone</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Timeline;