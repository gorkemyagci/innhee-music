"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker, useNavigation } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export type CalendarProps = {
  selected?: Date;
  onApply?: (date: Date | undefined) => void;
  onCancel?: () => void;
  className?: string;
};

function Calendar({
  className,
  selected,
  onApply,
  onCancel,
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(selected);
  const [direction, setDirection] = React.useState(0);

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleApply = () => {
    if (onApply) {
      onApply(selectedDate);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        showOutsideDays={true}
        className={cn("p-3", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4 w-full",
          caption: "relative flex items-center justify-between w-full bg-gray-50 rounded-lg p-2 shadow-sm mb-4",
          caption_label: "text-sm font-medium text-center flex-1",
          nav: "hidden",
          nav_button: cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 bg-transparent p-0 hover:bg-transparent"
          ),
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] uppercase",
          row: "flex w-full mt-2",
          cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:rounded-md",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent rounded-md"
          ),
          day_selected:
            "bg-[#111] text-white hover:bg-[#111] hover:text-white focus:bg-[#111] focus:text-white",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle: "aria-selected:bg-accent",
          day_hidden: "invisible",
        }}
        components={{
          Caption: ({ displayMonth }) => {
            const { goToMonth } = useNavigation();
            
            return (
              <div className="flex bg-weak-50 rounded-lg h-9 items-center justify-between w-full px-2">
                <button
                  onClick={() => {
                    setDirection(-1);
                    const prevMonth = new Date(displayMonth);
                    prevMonth.setMonth(prevMonth.getMonth() - 1);
                    goToMonth(prevMonth);
                  }}
                  className="bg-white rounded-lg w-7 h-7 shrink-0 cursor-pointer flex items-center justify-center transition-opacity"
                >
                  <ChevronLeftIcon className="h-4 w-4 fill-sub-600" />
                </button>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={displayMonth.toString()}
                    initial={{ y: direction * 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: direction * -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium text-sub-600"
                  >
                    {format(displayMonth, "MMMM yyyy")}
                  </motion.span>
                </AnimatePresence>
                <button
                  onClick={() => {
                    setDirection(1);
                    const nextMonth = new Date(displayMonth);
                    nextMonth.setMonth(nextMonth.getMonth() + 1);
                    goToMonth(nextMonth);
                  }}
                  className="bg-white rounded-lg w-7 h-7 shrink-0 cursor-pointer flex items-center justify-center transition-opacity"
                >
                  <ChevronRightIcon className="h-4 w-4 fill-sub-600" />
                </button>
              </div>
            );
          },
        }}
      />
      <div className="grid grid-cols-2 gap-2 px-3 pb-3">
        <Button
          onClick={handleCancel}
          variant="outline" 
          className="h-9 flex-1 border-soft-200 rounded-lg bg-white flex items-center gap-1.5 text-sub-600 font-medium text-sm"
        >
          Cancel
        </Button>
        <Button
          onClick={handleApply}
          className="h-9 flex-1 disabled:cursor-auto group rounded-lg text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]"
        >
          <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
          Apply
        </Button>
      </div>
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };