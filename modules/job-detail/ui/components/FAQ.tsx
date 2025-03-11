"use client"
import { faqsItems } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/icons";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    return <div className="flex w-full flex-col items-start gap-3">
        <p className="text-[#161922] font-semibold text-base tracking-[-1.5%]">Frequently Asked Questions</p>
        <div className="w-full">
            {faqsItems.map((item, index: number) => (
                <motion.div
                    key={index}
                    initial={false}
                    className={cn("flex flex-col items-start border-b border-[#E5E5E5] p-3", {
                        "bg-weak-50": activeIndex === index
                    })}
                >
                    <div onClick={() => setActiveIndex(activeIndex === index ? null : index)} className="flex py-1.5 items-center cursor-pointer justify-between w-full gap-4">
                        <div className="flex items-center gap-2">
                            <Icons.question_line />
                            <p className="text-strong-950 font-medium text-sm tracking-tight">{item.title}</p>
                        </div>
                        {
                            activeIndex === index ? (
                                <Icons.minus className="flex-shrink-0 size-4" />
                            ) : (
                                <Icons.plus className="flex-shrink-0 size-3" />
                            )
                        }
                    </div>
                    <AnimatePresence>
                        {activeIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-2 md:pt-2.5">
                                    <p className="text-sub-600 text-sm font-normal">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    </div>
}

export default FAQ;