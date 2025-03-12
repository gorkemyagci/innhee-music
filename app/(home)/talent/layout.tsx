"use client";
import Sidebar from "@/modules/talent/ui/sections/sidebar";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { X } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return (
        <div className="relative w-full">
            <div className="max-w-[1376px] px-4 md:px-8 mx-auto py-5 flex flex-col md:flex-row items-start gap-0 md:gap-8">
                {/* Mobile header with menu button */}
                {isMobile && (
                    <div className="w-full flex items-center justify-between pb-4">
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
                                name="User"
                                className="w-8 h-8"
                            />
                        </div>
                    </div>
                )}

                {/* Desktop sidebar */}
                {!isMobile && (
                    <div className="hidden md:block sticky top-5">
                        <Sidebar />
                    </div>
                )}

                {/* Mobile sidebar with animation */}
                <AnimatePresence>
                    {isMobile && sidebarOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black z-40"
                                onClick={() => setSidebarOpen(false)}
                            />

                            {/* Sidebar */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                className="fixed top-0 left-0 h-full bg-white z-50 w-full overflow-y-auto custom-scroll"
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
                                    <Sidebar />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Main content */}
                <div className="w-full mt-0">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;