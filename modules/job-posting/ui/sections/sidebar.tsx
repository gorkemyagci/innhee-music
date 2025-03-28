"use client"
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useMockData } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { Suspense, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

const SidebarSuspense = () => {
    const t = useTranslations("jobPosting.sidebar");
    const [tab, setTab] = useQueryState("tab", { defaultValue: "basic-information" });
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const { jobPostingMenu } = useMockData();

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isMobile && isSidebarOpen) {
                const sidebar = sidebarRef.current;
                if (sidebar && !sidebar.contains(e.target as Node)) {
                    setIsSidebarOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile, isSidebarOpen]);

    const handleTabSelect = (value: string) => {
        setTab(value);
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <>
            {isMobile && (
                <div className="fixed bottom-4 left-4 z-40">
                    <Button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="h-12 px-4 rounded-full bg-white shadow-lg border border-soft-200 flex items-center gap-2"
                    >
                        <span className="font-medium text-strong-950 text-sm">
                            {t("navigation")}
                        </span>
                    </Button>
                </div>
            )}

            <AnimatePresence>
                {isMobile && isSidebarOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            <motion.div
                ref={sidebarRef}
                className={cn(
                    "bg-weak-50 pt-5 pb-4 px-4 rounded-[16px] flex flex-col justify-between",
                    !isMobile && "w-[264px] min-h-[calc(100vh-114px)]",
                    isMobile && "fixed left-4 right-4 bottom-20 z-50 max-h-[80vh] overflow-hidden"
                )}
                initial={false}
                animate={{
                    y: isMobile && !isSidebarOpen ? "100%" : 0,
                    opacity: isMobile && !isSidebarOpen ? 0 : 1,
                    pointerEvents: isMobile && !isSidebarOpen ? "none" : "auto"
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 40
                }}
            >
                {isMobile && (
                    <div className="flex items-center justify-between mb-4 border-b border-soft-200 pb-3">
                        <h3 className="font-medium text-base">{t("navigation")}</h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}
                
                <div className={cn(
                    "flex flex-col h-full",
                    isMobile && "overflow-y-auto custom-scroll"
                )}>
                    <div className="flex flex-col gap-4 items-start">
                        <span className="text-soft-400 text-xs font-medium">{t("transferSequence")}</span>
                        <div className="flex flex-col items-start gap-2 w-full">
                            {jobPostingMenu.map((item, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => handleTabSelect(item.value)} 
                                    className={cn(
                                        "flex items-center justify-between p-2 cursor-pointer hover:bg-white gap-2.5 rounded-[10px] w-full group",
                                        isMobile ? "h-12" : "h-9",
                                        {
                                            "bg-white": tab === item.value,
                                        }
                                    )}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className={cn(
                                            "rounded-full bg-white group-hover:bg-[#525866] group-hover:text-white transition-all duration-100 flex items-center justify-center p-0.5 text-sub-600 font-medium text-xs",
                                            isMobile ? "w-6 h-6" : "w-5 h-5",
                                            {
                                                "bg-[#525866] text-white": tab === item.value,
                                            }
                                        )}>
                                            {item.id}
                                        </span>
                                        <span className={cn(
                                            "font-medium text-sub-600 group-hover:text-strong-950 transition-all duration-100",
                                            isMobile ? "text-base" : "text-sm",
                                            {
                                                "text-strong-950": tab === item.value,
                                            }
                                        )}>
                                            {t(`menu.${item.value}`)}
                                        </span>
                                    </div>
                                    <span className={cn("opacity-0 group-hover:opacity-100 transition-all duration-100", {
                                        "opacity-100": tab === item.value,
                                    })}>
                                        <Icons.chevron_short_right />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 mt-4">
                    <span className="text-sub-600 font-normal text-sm">{t("troubleTransfer")}</span>
                    <Button className="bg-white w-full h-10 rounded-[10px] flex items-center gap-1 text-sm text-sub-600 font-medium">
                        <Icons.headphone />
                        {t("contact")}
                    </Button>
                </div>
            </motion.div>
        </>
    )
}

const Sidebar = () => {
    return (
        <Suspense fallback={<></>}>
            <SidebarSuspense />
        </Suspense>
    )
}

export default Sidebar;