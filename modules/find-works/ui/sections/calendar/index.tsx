"use client"
import { Separator } from "@/components/ui/separator";
import DatePicker from "./date-picker";
import Timeline from "./timeline";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Icons } from "@/components/icons";

const Calendar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check screen size when component mounts and when window resizes
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width >= 768 && width < 1024);
            setIsLoading(false);
        };
        
        // Initial check
        checkScreenSize();
        
        // Add event listener for window resize
        window.addEventListener("resize", checkScreenSize);
        
        // Cleanup
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Close sidebar when clicking outside on mobile/tablet
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if ((isMobile || isTablet) && isOpen) {
                const calendar = document.getElementById('calendar-sidebar');
                if (calendar && !calendar.contains(e.target as Node)) {
                    setIsOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile, isTablet, isOpen]);

    // Disable body scroll when sidebar is open on mobile/tablet
    useEffect(() => {
        if ((isMobile || isTablet) && isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobile, isTablet, isOpen]);

    // Don't render anything until we've determined the device type
    if (isLoading) {
        return null;
    }

    return (
        <>
            {/* Toggle button for mobile and tablet - only visible when sidebar is closed */}
            <AnimatePresence>
                {(isMobile || isTablet) && !isOpen && (
                    <motion.div
                        className="fixed bottom-4 right-4 z-40"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="h-10 w-10 rounded-full bg-white shadow-lg border border-soft-200 p-0"
                        >
                            <CalendarIcon className="h-5 w-5 text-gray-700" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay for mobile and tablet */}
            <AnimatePresence>
                {(isMobile || isTablet) && isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Calendar sidebar */}
            <motion.div
                id="calendar-sidebar"
                className={cn(
                    "border border-soft-200 rounded-[20px] bg-white z-50",
                    "transition-all duration-300",
                    // Desktop styles
                    "lg:static lg:flex-[2] lg:max-w-[352px] lg:min-h-[calc(100vh-114px)] lg:opacity-100 lg:pointer-events-auto",
                    // Mobile and tablet styles - full screen when open
                    (isMobile || isTablet) && "fixed inset-4 shadow-xl"
                )}
                initial={false}
                animate={{
                    x: (isMobile || isTablet) && !isOpen ? "100%" : 0,
                    opacity: (isMobile || isTablet) && !isOpen ? 0 : 1,
                    pointerEvents: (isMobile || isTablet) && !isOpen ? "none" : "auto"
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 40
                }}
            >
                <div className="flex flex-col w-full h-full">
                    <div className="w-full">
                        {/* Custom header with close button */}
                        {(isMobile || isTablet) && (
                            <div className="p-4 flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                    <Icons.calendar_line className="size-5" />
                                    <span className="text-strong-950 font-medium">Calendar</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        className="border border-soft-200 p-1.5 h-8 w-16 flex items-center justify-center text-sub-600 font-medium text-sm"
                                    >
                                        See All
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 w-8 rounded-lg border border-soft-200 p-0 flex items-center justify-center"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                        
                        {/* Show original DatePicker only on desktop */}
                        {!isMobile && !isTablet && <DatePicker />}
                        
                        {/* Show custom DatePicker content on mobile/tablet */}
                        {(isMobile || isTablet) && (
                            <div className="px-4 pb-4">
                                {/* Rest of DatePicker content without the header */}
                                <DatePickerContent />
                            </div>
                        )}
                    </div>
                    <Separator />
                    <div className="w-full flex-grow overflow-auto">
                        <Timeline />
                    </div>
                </div>
            </motion.div>
        </>
    );
};

// Component to render DatePicker content without the header
const DatePickerContent = () => {
    // This is a simplified version that just renders the calendar part
    // You would need to implement the actual calendar functionality here
    // or extract it from the DatePicker component
    return (
        <div className="bg-white rounded-xl pt-0 p-0">
            <div className="flex items-center bg-weak-50 h-9 rounded-lg justify-between mb-6 p-1.5 relative overflow-hidden">
                <button className="w-6 h-6 flex items-center justify-center rounded-md bg-white transition-colors z-10">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-500">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <h2 className="text-sm font-medium text-sub-600">
                        {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                </div>
                <button className="w-6 h-6 flex items-center justify-center rounded-md bg-white transition-colors z-10">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-500">
                        <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            
            {/* Simplified week view */}
            <div className="relative mb-4">
                <div className="flex items-center justify-between">
                    {[0, 1, 2, 3, 4].map((day) => {
                        const date = new Date();
                        date.setDate(date.getDate() + day - 2);
                        const isSelected = day === 2;
                        
                        return (
                            <div key={day} className="flex flex-col items-center">
                                <button
                                    className={cn(
                                        "w-12 h-14 flex flex-col items-center justify-center rounded-lg font-medium relative",
                                        isSelected ? "" : "hover:bg-gray-100"
                                    )}
                                >
                                    <span className={cn(
                                        "text-xs font-normal mb-1 z-10",
                                        isSelected ? "text-white" : "text-sub-600"
                                    )}>
                                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                    </span>
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-strong-950 rounded-lg" />
                                    )}
                                    <span className={cn(
                                        "relative text-base font-medium z-10",
                                        isSelected ? "text-white" : "text-strong-950"
                                    )}>
                                        {date.getDate()}
                                    </span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Calendar;