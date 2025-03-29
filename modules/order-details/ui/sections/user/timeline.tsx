"use client";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MilestoneItem from "../../components/milestone-item";
import { useTranslations } from "next-intl";

const Timeline = ({ milestones }: { milestones: any }) => {
    const [isOpen, setIsOpen] = useState(true);
    const t = useTranslations("orderDetails.timeline");
    return (
        <div className="flex-1 border border-soft-200 rounded-2xl relative">
            <motion.div 
                onClick={() => setIsOpen(!isOpen)}
                className={cn("bg-weak-50 w-full h-12 py-3 px-4 rounded-t-2xl flex items-center justify-between cursor-pointer", !isOpen && "rounded-b-2xl")}
            >
                <span className="text-strong-950 font-medium">{t("title")}</span>
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
                            {milestones.length > 0 ? milestones.map((item: any, index: number) => (
                                <MilestoneItem key={index} item={item as any} index={index} />
                            )) : (
                                <div className="flex flex-col gap-2">
                                    <span className="text-sub-600 font-medium text-sm">{t("noMilestones")}</span>
                                </div>
                            )}
                            <div className="flex relative flex-row cursor-pointer items-center gap-3">
                                <div className="flex items-center border-2 border-sub-600 justify-center w-5 h-5 rounded-full bg-white">
                                    <Icons.plus className="size-2.5 stroke-sub-600"/>
                                </div>
                                <span className="text-sub-600 font-medium text-sm border-b border-sub-600">{t("addNew")}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Timeline;