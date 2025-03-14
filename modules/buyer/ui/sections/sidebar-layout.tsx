"use client"
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/icons";
import UserAvatar from "@/components/user-avatar";
import { X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./sidebar";

interface SidebarLayoutProps {
    data: any;
}

const SidebarLayout = ({ data }: SidebarLayoutProps) => {
    const [showSidebar, setShowSidebar] = useState(false);
    if (showSidebar) {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }
    } else {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = '';
        }
    }

    return <>
        <div className="z-40 bg-white w-full px-4 py-3 flex items-center justify-between md:hidden">
            <button
                onClick={() => setShowSidebar(true)}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100"
            >
                <Icons.menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
                <UserAvatar
                    imageUrl="/assets/images/avatar2.png"
                    name="Cleve Music"
                    className="w-10 h-10"
                />
            </div>
        </div>

        <AnimatePresence>
            {showSidebar && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black z-40 md:hidden"
                    onClick={() => setShowSidebar(false)}
                />
            )}
        </AnimatePresence>

        <AnimatePresence>
            {showSidebar && (
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    className="fixed top-0 left-0 h-full bg-white z-50 w-full overflow-y-auto custom-scroll md:hidden"
                >
                    <div className="p-4 pt-6">
                        <div className="flex items-center justify-end mb-6">
                            <button
                                onClick={() => setShowSidebar(false)}
                                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <Sidebar data={data} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
}

export default SidebarLayout;