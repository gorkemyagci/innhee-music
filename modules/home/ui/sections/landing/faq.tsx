"use client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const pathname = usePathname();
    const t = useTranslations();
    const faqItems = t.raw("faq.items");

    return (
        <div className="relative max-w-[1200px] mx-auto pt-8 md:pt-12 lg:pt-20 w-full">
            <div className={cn(
                "flex flex-col max-w-[1440px] mx-auto lg:flex-row items-start w-full justify-between gap-8 md:gap-10 lg:gap-12",
                pathname === "/" && "lg:py-20 pt-5 pb-10 px-4 md:px-8 lg:px-24"
            )}>
                <div className="flex flex-1 flex-col items-start gap-4 md:gap-5">
                    <span className="text-black font-semibold text-3xl md:text-4xl lg:text-5xl">{t("faq.title")}</span>
                    <span className="text-base md:text-lg font-normal text-[#666D80]">{t("faq.subtitle")}</span>
                    <Button
                        type="button"
                        className="w-[121px] h-11 disabled:cursor-auto group rounded-[10px] text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                        <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                        {t("faq.viewAll")} <Icons.arrow_right className="size-3 md:size-4" />
                    </Button>
                </div>
                <div className="flex-1 z-10 lg:pl-10 flex flex-col w-full">
                    {faqItems.map((item: any, index: number) => (
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