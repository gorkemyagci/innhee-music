"use client";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

const Details = () => {
    const [isOpen, setIsOpen] = useState(true);
    const t = useTranslations("orderDetails.details");

    return (
        <div className="flex-1 border border-soft-200 rounded-2xl">
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
                        <div className="flex flex-col px-4">
                            <div className="py-3 w-full flex items-center justify-between">
                                <span className="text-sub-600 font-medium text-sm">{t("contract")}</span>
                                <Link href="#" prefetch className="text-primary-base font-medium text-sm border-b border-primary-base">
                                    Contract name
                                </Link>
                            </div>
                            <Separator className="bg-soft-200" />
                            <div className="py-3 w-full flex items-center justify-between">
                                <span className="text-sub-600 font-medium text-sm">{t("contractId")}</span>
                                <div className="flex items-center gap-0">
                                    <span className="text-sub-600 font-medium text-sm">#</span>
                                    <span className="text-strong-950 font-medium text-sm">126895</span>
                                </div>
                            </div>
                            <Separator className="bg-soft-200" />
                            <div className="py-3 w-full flex items-center justify-between">
                                <span className="text-sub-600 font-medium text-sm">{t("contractId")}</span>
                                <span className="text-strong-950 font-medium text-sm">10 March, 2025</span>
                            </div>
                            <Separator className="bg-soft-200" />
                            <div className="py-3 w-full flex items-center justify-between">
                                <span className="text-sub-600 font-medium text-sm">{t("deadline")}</span>
                                <span className="text-strong-950 font-medium text-sm">15 March, 2025</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Details;