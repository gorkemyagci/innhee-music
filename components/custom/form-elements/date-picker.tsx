"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, parse, isValid } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { useState, useEffect } from "react";

interface DatePickerProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  customLabel?: React.ReactNode;
  open?: boolean;
  formItemClassName?: string;
}

export function DatePickerForm({
  form,
  name,
  label,
  required,
  disabled,
  className,
  icon,
  customLabel,
  open,
  formItemClassName,
  ...props
}: DatePickerProps) {
  const [inputValue, setInputValue] = useState("");
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(open || false);

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const handleDateInput = (val: string) => {
          if (!val) {
            setInputValue("");
            setCalendarDate(undefined);
            field.onChange(null);
            return;
          }
          const numericValue = val.replace(/\D/g, "");
          let formattedValue = "";
          if (numericValue.length > 0) {
            const days = numericValue.slice(0, 2);
            formattedValue = days;

            if (numericValue.length > 2) {
              const month = numericValue.slice(2, 4);
              formattedValue += "/" + month;
              if (numericValue.length >= 4) {
                const year =
                  numericValue.length >= 8
                    ? numericValue.slice(4, 8)
                    : new Date().getFullYear().toString();
                const tempDate = parse(
                  `${days}/${month}/${year}`,
                  "dd/MM/yyyy",
                  new Date()
                );
                if (isValid(tempDate)) {
                  setCalendarDate(tempDate);
                }
              }

              if (numericValue.length > 4) {
                formattedValue += "/" + numericValue.slice(4, 8);
              }
            }
          }

          setInputValue(formattedValue);
          if (formattedValue.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            const parsedDate = parse(formattedValue, "dd/MM/yyyy", new Date());
            if (isValid(parsedDate)) {
              field.onChange(parsedDate);
              setCalendarDate(parsedDate);
            }
          }
        };

        return (
          <FormItem className={cn(formItemClassName)}>
            <FormLabel className="text-xs font-medium">
              {customLabel ? customLabel : label} {required ? <span className="text-lm_red">*</span> : ""}
            </FormLabel>
            <FormControl>
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <FormControl className="shadow-none">
                    {!open ? (
                      <Button
                        type="button"
                        variant={"outline"}
                        onClick={() => setIsOpen(true)}
                        className={cn(
                          "relative py-6 border-0 rounded-xl items-center justify-start placeholder:text-lm_muted focus-visible:ring-primary flex h-9 w-full border-input px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 bg-background",
                          className,
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {icon && <span>{icon}</span>}
                        <Input
                          {...props}
                          type="text"
                          value={
                            inputValue ||
                            (field.value ? format(field.value, "dd/MM/yyyy") : "")
                          }
                          onChange={(e) => {
                            handleDateInput(e.target.value);
                            setIsOpen(true);
                          }}
                          onFocus={() => setIsOpen(true)}
                          onKeyDown={(e) => {
                            if (
                              e.key === "Backspace" &&
                              inputValue.length === 1
                            ) {
                              setInputValue("");
                              setCalendarDate(undefined);
                              field.onChange(null);
                            }
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(true);
                          }}
                          placeholder="DD/MM/YYYY"
                          maxLength={10}
                          disabled={disabled}
                          className="w-full border-0 bg-transparent shadow-none p-0 focus:ring-0 focus-visible:ring-0"
                        />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant={"outline"}
                        className="w-full border-0 h-0 bg-transparent shadow-none p-0 focus:ring-0 focus-visible:ring-0"
                      />
                    )}
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 shadow-none border-soft-200" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    month={calendarDate}
                    captionLayout="dropdown-buttons"
                    fromDate={new Date()}
                    toDate={new Date("2100-01-01")}
                    onSelect={(date) => {
                      field.onChange(date);
                      if (date) {
                        setInputValue(format(date, "dd/MM/yyyy"));
                        setCalendarDate(date);
                        setIsOpen(false);
                      }
                    }}
                    onMonthChange={setCalendarDate}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}