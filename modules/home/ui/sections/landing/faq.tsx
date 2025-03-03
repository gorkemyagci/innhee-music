"use client";
import { Button } from "@/components/ui/button";
import BorderBackground from "../../components/border-background";
import { Icons } from "@/components/icons";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { faqsItems } from "@/lib/mockData";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    return (
        <div className="relative pt-20 w-full">
            <BorderBackground />
            <div className="p-20 px-24 flex items-start w-full justify-between">
                <div className="flex flex-1 flex-col items-start gap-5">
                    <span className="text-black font-semibold text-5xl">FAQs</span>
                    <span className="text-lg font-normal text-[#666D80]">Everything you need to know about the product and billing. Can’t find the answer you’re looking for? Please chat to our friendly team.</span>
                    <Button className="flex rounded-md min-w-32 h-11 z-10 text-white font-semibold text-sm items-center gap-2 bg-surface-700 hover:bg-surface-700">
                        View All
                        <Icons.arrow_right />
                    </Button>
                </div>
                <div className="flex-1 z-10 pl-10 flex flex-col">
                    {faqsItems.map((item, index: number) => (
                        <motion.div
                            key={index}
                            initial={false}
                            className="flex flex-col items-start border-b border-[#E5E5E5] py-4"
                        >
                            <div onClick={() => setActiveIndex(activeIndex === index ? null : index)} className="flex items-center cursor-pointer justify-between w-full">
                                <p className="text-[#1B1B1B] font-medium text-lg tracking-tight">{item.title}</p>
                                {
                                    activeIndex === index ? (
                                        <Icons.minus />
                                    ) : (
                                        <Icons.plus />
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
                                        <div className="pt-2.5">
                                            <p className={cn("text-neutral-500 font-normal"
                                            )}>
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
        </div>
    )
}

export default FAQ;