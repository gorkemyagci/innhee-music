"use client";
import { Button } from "@/components/ui/button";
import BorderBackground from "../../components/border-background";
import { Icons } from "@/components/icons";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { faqsItems } from "@/lib/mockData";
import { usePathname } from "next/navigation";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const pathname = usePathname();
    return (
        <div className="relative pt-8 md:pt-12 lg:pt-20 w-full">
            {pathname === "/" && <BorderBackground />}
            <div className={cn(
                "flex flex-col lg:flex-row items-start w-full justify-between gap-8 md:gap-10 lg:gap-12",
                pathname === "/" && "lg:py-20 pt-5 pb-10 px-4 md:px-8 lg:px-24"
            )}>
                <div className="flex flex-1 flex-col items-start gap-4 md:gap-5">
                    <span className="text-black font-semibold text-3xl md:text-4xl lg:text-5xl">FAQs</span>
                    <span className="text-base md:text-lg font-normal text-[#666D80]">Everything you need to know about the product and billing. Can't find the answer you're looking for? Please chat to our friendly team.</span>
                    <Button className="flex rounded-md min-w-28 md:min-w-32 h-9 md:h-11 z-10 text-white font-semibold text-sm items-center gap-2 bg-surface-700 hover:bg-surface-700">
                        View All
                        <Icons.arrow_right className="size-3 md:size-4" />
                    </Button>
                </div>
                <div className="flex-1 z-10 lg:pl-10 flex flex-col w-full">
                    {faqsItems.map((item, index: number) => (
                        <motion.div
                            key={index}
                            initial={false}
                            className="flex flex-col items-start border-b border-[#E5E5E5] py-3 md:py-4"
                        >
                            <div onClick={() => setActiveIndex(activeIndex === index ? null : index)} className="flex items-center cursor-pointer justify-between w-full gap-4">
                                <p className="text-[#1B1B1B] font-medium text-base md:text-lg tracking-tight">{item.title}</p>
                                {
                                    activeIndex === index ? (
                                        <Icons.minus className="flex-shrink-0 size-5 md:size-6" />
                                    ) : (
                                        <Icons.plus className="flex-shrink-0 size-4 md:size-5" />
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
                                            <p className="text-neutral-500 text-sm md:text-base font-normal">
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