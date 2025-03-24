"use client"
import { Separator } from "@/components/ui/separator";
import Profile from "../sections/sidebar/profile";
import Menu from "../sections/sidebar/menu";
import Skills from "../sections/sidebar/skills";
import Tags from "../sections/sidebar/tags";
import About from "../sections/sidebar/about";
import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/trpc/client";
import { MobileSidebarSkeleton, SidebarSkeleton } from "@/components/skeletons/sidebar";
import { useTranslations } from "next-intl";

const Sidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: user, isLoading } = trpc.auth.getMe.useQuery();
    const isUserAvailable = !isLoading && user?.id;
    const t = useTranslations("sidebar");

    return (
        <>
            <div className="lg:hidden fixed bottom-4 right-[65px] z-50">
                <button
                    className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg bg-white border border-soft-200 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <div className="flex flex-col items-center justify-center gap-[3px]">
                        <div className="w-4 h-[1.5px] bg-gray-700 rounded-full" />
                        <div className="w-4 h-[1.5px] bg-gray-700 rounded-full" />
                        <div className="w-4 h-[1.5px] bg-gray-700 rounded-full" />
                    </div>
                </button>
            </div>
            <div className="hidden lg:block border border-soft-200 pb-6 w-[300px] shrink-0 min-h-[calc(100vh-114px)] rounded-[20px] bg-white">
                {isUserAvailable ? (
                    <div className="overflow-y-auto custom-scroll h-full">
                        <Profile user={user} />
                        <Separator className="bg-soft-200" />
                        <Menu userId={user.id} />
                        <Separator className="bg-soft-200" />
                        <Skills skills={user.worker?.skills || []} />
                        <Separator className="bg-soft-200" />
                        <Tags tags={user.worker?.tags || []} />
                        <Separator className="bg-soft-200" />
                        <About aboutText={user.worker?.about || t("noAboutText")} />
                    </div>
                ) : (
                    <SidebarSkeleton />
                )}
            </div>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            className="lg:hidden fixed inset-0 bg-black/20 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            className="lg:hidden fixed top-0 left-0 z-50 h-screen w-full max-w-full bg-white"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 40,
                                mass: 1
                            }}
                        >
                            <div className="sticky top-0 w-full bg-white p-4 flex items-center justify-between border-b border-soft-200 z-10">
                                <h2 className="text-lg font-semibold">{t("menu")}</h2>
                                <button
                                    className="flex items-center justify-center w-8 h-8 rounded-full"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="overflow-y-auto custom-scroll h-[calc(100vh-56px)]">
                                {isUserAvailable ? (
                                    <>
                                        <Profile user={user} />
                                        <Separator className="bg-soft-200" />
                                        <Menu userId={user.id} />
                                        <Separator className="bg-soft-200" />
                                        <Skills skills={user.worker?.skills || []} />
                                        <Separator className="bg-soft-200" />
                                        <Tags tags={user.worker?.tags || []} />
                                        <Separator className="bg-soft-200" />
                                        <About aboutText={user.worker?.about || t("noAboutText")} />
                                    </>
                                ) : (
                                    <MobileSidebarSkeleton />
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;