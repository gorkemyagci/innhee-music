"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./sidebar";
import { UserType } from "@/lib/types";

const SidebarLayout = ({ data, isOwner }: { data: any, isOwner: boolean }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <div className="w-full md:hidden flex items-center justify-between pb-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 p-2 h-auto"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <Icons.menu className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                    <UserAvatar
                        imageUrl="/assets/images/avatar-3.png"
                        name={data?.user?.nickname}
                        className="w-8 h-8"
                    />
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:block sticky top-5">
                <Sidebar data={data} isOwner={isOwner} />
            </div>

            {/* Mobile sidebar with animation */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40 md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed top-0 left-0 h-full bg-white z-50 w-full overflow-y-auto custom-scroll md:hidden"
                        >
                            <div className="p-4 pt-6">
                                <div className="flex items-center justify-end mb-6">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="p-1 h-auto"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>
                                <Sidebar data={data} isOwner={isOwner} />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default SidebarLayout;