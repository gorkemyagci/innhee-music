"use client"
import { Separator } from "@/components/ui/separator";
import Profile from "../sections/sidebar/profile";
import Menu from "../sections/sidebar/menu";
import Skills from "../sections/sidebar/skills";
import Tags from "../sections/sidebar/tags";
import About from "../sections/sidebar/about";
import { useState, useEffect } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            setIsLoading(false);
        };
    
        checkIfMobile();
        
        window.addEventListener("resize", checkIfMobile);
        
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    useEffect(() => {
        if (isMobile && isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobile, isMobileOpen]);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isMobile && isMobileOpen) {
                const sidebar = document.getElementById('sidebar');
                if (sidebar && !sidebar.contains(e.target as Node)) {
                    setIsMobileOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile, isMobileOpen]);

    if (isLoading) {
        return null;
    }

    return (
        <>
            {/* Mobile toggle button - only visible on mobile */}
            <AnimatePresence>
                {isMobile && !isMobileOpen && (
                    <motion.div 
                        className="lg:hidden fixed bottom-4 right-[65px] z-50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.button 
                            className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg bg-white border border-soft-200 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsMobileOpen(true)}
                            whileTap={{ scale: 0.9 }}
                        >
                            <motion.div
                                className="flex flex-col items-center justify-center gap-[3px]"
                            >
                                <div className="w-4 h-[1.5px] bg-gray-700 rounded-full" />
                                <div className="w-4 h-[1.5px] bg-gray-700 rounded-full" />
                                <div className="w-4 h-[1.5px] bg-gray-700 rounded-full" />
                            </motion.div>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar content */}
            <motion.div 
                id="sidebar"
                className={cn(
                    "border border-soft-200 pb-6 w-[300px] lg:shrink-0 min-h-[calc(100vh-114px)] rounded-[20px] bg-white",
                    "transition-all duration-300 ease-in-out",
                    // Mobile styles
                    "lg:static lg:translate-x-0 lg:opacity-100 lg:pointer-events-auto",
                    isMobile && "fixed top-0 left-0 z-40 h-screen w-full max-w-full rounded-none border-0 pb-0"
                )}
                initial={false}
                animate={{
                    x: isMobile && !isMobileOpen ? -100 + "%" : 0,
                    opacity: isMobile && !isMobileOpen ? 0 : 1,
                    boxShadow: isMobile && isMobileOpen ? "0px 4px 20px rgba(0, 0, 0, 0.15)" : "none"
                }}
                transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 40,
                    mass: 1
                }}
            >
                {isMobile && (
                    <div className="sticky top-0 w-full bg-white p-4 flex items-center justify-between border-b border-soft-200 z-10">
                        <h2 className="text-lg font-semibold">Menu</h2>
                        <motion.button 
                            className="flex items-center justify-center w-8 h-8 rounded-full"
                            onClick={() => setIsMobileOpen(false)}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X size={20} />
                        </motion.button>
                    </div>
                )}
                <div className={cn("overflow-y-auto custom-scroll", isMobile && "h-[calc(100vh-56px)]")}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                    >
                        <Profile />
                    </motion.div>
                    <Separator className="bg-soft-200" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        <Menu />
                    </motion.div>
                    <Separator className="bg-soft-200" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                    >
                        <Skills />
                    </motion.div>
                    <Separator className="bg-soft-200" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                    >
                        <Tags />
                    </motion.div>
                    <Separator className="bg-soft-200" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                    >
                        <About />
                    </motion.div>
                </div>
            </motion.div>

            {/* Overlay for mobile - only visible when sidebar is open on mobile */}
            <AnimatePresence>
                {isMobile && isMobileOpen && (
                    <motion.div 
                        className="fixed inset-0 bg-black/20 z-30 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;