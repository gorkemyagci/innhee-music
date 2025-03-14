"use client"
import { Separator } from "@/components/ui/separator";
import DatePicker from "./date-picker";
import Timeline from "./timeline";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Icons } from "@/components/icons";

const Calendar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOverlayClick = () => {
        setIsOpen(false);
    };
    const toggleCalendar = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };
    const handleClose = () => {
        setIsOpen(false);
        document.body.style.overflow = '';
    };

    return (
        <>
            <div className="lg:hidden fixed bottom-4 right-4 z-40">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Button
                                onClick={toggleCalendar}
                                className="h-10 w-10 rounded-full bg-white shadow-lg border border-soft-200 p-0"
                            >
                                <CalendarIcon className="h-5 w-5 text-gray-700" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleOverlayClick}
                    />
                )}
            </AnimatePresence>
            <div className="hidden lg:block border border-soft-200 rounded-[20px] bg-white w-[352px] shrink-0 min-h-[calc(100vh-114px)]">
                <div className="flex flex-col w-full h-full">
                    <div className="w-full">
                        <DatePicker />
                    </div>
                    <Separator />
                    <div className="w-full flex-grow overflow-auto">
                        <Timeline />
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="calendar-sidebar"
                        className="lg:hidden fixed inset-4 border border-soft-200 rounded-[20px] bg-white z-50 shadow-xl"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 40
                        }}
                    >
                        <div className="flex flex-col w-full h-full">
                            <div className="w-full">
                                <div className="p-4 flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <Icons.calendar_line className="size-6" />
                                        <span className="text-strong-950 font-medium">Calendar</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            className="border border-soft-200 p-1.5 h-8 w-[66px] flex items-center justify-center text-sub-600 font-medium text-sm"
                                        >
                                            See All
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 rounded-lg border border-soft-200 p-0 flex items-center justify-center"
                                            onClick={handleClose}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="px-4 pb-4">
                                    <DatePickerContent />
                                </div>
                            </div>
                            <Separator />
                            <div className="w-full flex-grow overflow-auto">
                                <Timeline />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const DatePickerContent = () => {
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
            <div className="relative mb-4">
                <div className="grid grid-cols-5 gap-2">
                    {[0, 1, 2, 3, 4].map((day) => {
                        const date = new Date();
                        date.setDate(date.getDate() + day - 2);
                        const isSelected = day === 2;
                        
                        return (
                            <div key={day} className="flex flex-col items-center">
                                <button
                                    className={cn(
                                        "w-full h-14 flex flex-col items-center justify-center rounded-lg font-medium relative",
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