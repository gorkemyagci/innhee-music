"use client"
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
    format,
    addMonths,
    subMonths,
    addDays,
    subDays,
    isSameDay,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth
} from "date-fns";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const DatePicker = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [visibleDays, setVisibleDays] = useState<Date[]>([]);
    const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);
    const [currentView, setCurrentView] = useState<'month' | 'week'>('week');
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);
        const days = eachDayOfInterval({ start, end });
        setDaysInMonth(days);

        if (!isSameMonth(selectedDate, currentMonth)) {
            setSelectedDate(days[0]);
        }

        updateVisibleDays(selectedDate);
    }, [currentMonth]);

    useEffect(() => {
        updateVisibleDays(selectedDate);
    }, [selectedDate]);

    function updateVisibleDays(date: Date) {
        const days = [];
        for (let i = -2; i <= 2; i++) {
            if (i < 0) {
                days.push(subDays(date, Math.abs(i)));
            } else if (i > 0) {
                days.push(addDays(date, i));
            } else {
                days.push(date);
            }
        }
        setVisibleDays(days);
    }

    const navigateMonth = (direction: 'prev' | 'next') => {
        setDirection(direction === 'prev' ? -1 : 1);
        const newMonth = direction === 'prev'
            ? subMonths(currentMonth, 1)
            : addMonths(currentMonth, 1);
        setCurrentMonth(newMonth);
    };

    const navigateDays = (direction: 'prev' | 'next') => {
        setDirection(direction === 'prev' ? -1 : 1);
        const newDate = direction === 'prev'
            ? subDays(selectedDate, 5)
            : addDays(selectedDate, 5);

        if (!isSameMonth(newDate, currentMonth)) {
            setCurrentMonth(newDate);
        }

        setSelectedDate(newDate);
    };

    const selectDay = (date: Date) => {
        setDirection(date > selectedDate ? 1 : -1);
        if (!isSameMonth(date, currentMonth)) {
            setCurrentMonth(date);
        }

        setSelectedDate(date);
    };

    const toggleView = () => {
        setCurrentView(currentView === 'month' ? 'week' : 'month');
    };

    return (
        <div className="p-4 flex flex-col gap-4 items-start w-full">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icons.calendar_line className="size-5" />
                    <span className="text-strong-950 font-medium">Calendar</span>
                </div>
                <Button
                    variant="outline"
                    className="border border-soft-200 p-1.5 h-8 w-16 flex items-center justify-center text-sub-600 font-medium text-sm"
                    onClick={() => {}}
                >
                    {currentView === 'week' ? 'See All' : 'Week'}
                </Button>
            </div>


            <div className="w-full bg-white rounded-xl pt-0 p-0">
                <div className="flex items-center bg-weak-50 h-9 rounded-lg justify-between mb-6 p-1.5 relative overflow-hidden">
                    <button
                        onClick={() => navigateMonth('prev')}
                        className="w-6 h-6 flex items-center justify-center rounded-md bg-white transition-colors z-10"
                    >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-500">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <AnimatePresence initial={false} mode="wait">
                            <motion.h2
                                key={currentMonth.toString()}
                                className="text-sm font-medium text-sub-600"
                                initial={{ y: direction > 0 ? 20 : -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: direction < 0 ? 20 : -20, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {format(currentMonth, 'MMMM yyyy')}
                            </motion.h2>
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={() => navigateMonth('next')}
                        className="w-6 h-6 flex items-center justify-center rounded-md bg-white transition-colors z-10"
                    >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-500">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {currentView === 'week' ? (
                    <div className="relative mb-4">
                        <button
                            onClick={() => navigateDays('prev')}
                            className="absolute border border-soft-200 cursor-pointer left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 flex items-center justify-center rounded-md bg-white transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-500">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className="mx-10 overflow-hidden">
                            <div className="flex items-center justify-between">
                                {visibleDays.map((day, index) => {
                                    const isSelected = isSameDay(day, selectedDate);
                                    const isCurrentMonth = isSameMonth(day, currentMonth);

                                    return (
                                        <div key={index} className="flex flex-col items-center">
                                            <motion.button
                                                onClick={() => selectDay(day)}
                                                className={cn(
                                                    "w-12 h-14 flex flex-col items-center justify-center rounded-lg font-medium relative",
                                                    isSelected
                                                        ? ""
                                                        : "hover:bg-gray-100",
                                                    isCurrentMonth
                                                        ? "text-gray-900"
                                                        : "text-gray-400"
                                                )}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <span className={cn(
                                                    "text-xs font-normal mb-1 z-10",
                                                    isCurrentMonth && isSelected ? "text-white" : "text-sub-600"
                                                )}>
                                                    {format(day, 'EEE')}
                                                </span>
                                                {isSelected && (
                                                    <motion.div
                                                        layoutId="selectedDay"
                                                        className="absolute inset-0 bg-strong-950 rounded-lg"
                                                        transition={{ duration: 0.2 }}
                                                    />
                                                )}
                                                <span className={cn(
                                                    "relative text-base font-medium z-10",
                                                    isSelected ? "text-white" : "text-strong-950"
                                                )}>
                                                    {format(day, 'dd')}
                                                </span>
                                            </motion.button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <button
                            onClick={() => navigateDays('next')}
                            className="absolute border border-soft-200 cursor-pointer right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 flex items-center justify-center rounded-md bg-white transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-500">
                                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <div className="mb-4 overflow-hidden">
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
                                <div key={i} className="text-center text-xs text-gray-500">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }, (_, i) => (
                                <div key={`empty-${i}`} className="h-10 w-10" />
                            ))}

                            {daysInMonth.map((day, i) => {
                                const isSelected = isSameDay(day, selectedDate);

                                return (
                                    <motion.button
                                        key={i}
                                        onClick={() => selectDay(day)}
                                        className={cn(
                                            "h-10 w-10 rounded-full flex items-center justify-center text-sm relative",
                                            !isSelected && "hover:bg-weak-50"
                                        )}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {isSelected && (
                                            <motion.div
                                                layoutId="selectedDayMonth"
                                                className="absolute inset-0 bg-gray-900 rounded-full"
                                                transition={{ duration: 0.2 }}
                                            />
                                        )}
                                        <span className={cn(
                                            "relative z-10",
                                            isSelected ? "text-white" : "text-sub-600"
                                        )}>
                                            {format(day, 'd')}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                )}
                <div className="w-full bg-white rounded-lg border border-soft-200 py-1.5 pr-1 pl-2.5 h-7 flex items-center justify-between">
                    <span className="text-sub-600 font-normal text-xs">Current number of outstanding orders 1.</span>
                    <Icons.info />
                </div>
            </div>
        </div>
    );
};

export default DatePicker;