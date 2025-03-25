"use client"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { useEffect } from "react";
import { useFilterContext } from "@/modules/find-jobs/ui/sections/filter";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface CustomSelectProps {
    label?: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    defaultValue?: string;
    className?: string;
    translationNamespace?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    label,
    options,
    value,
    onChange,
    defaultValue,
    className,
    translationNamespace = "common.select"
}) => {
    const t = useTranslations(translationNamespace);
    const { isFilterCleared } = useFilterContext();

    useEffect(() => {
        if (isFilterCleared) {
            onChange(defaultValue || "");
        }
    }, [isFilterCleared, defaultValue, onChange]);

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {label && <label className="text-sm font-medium text-strong-950">{label}</label>}
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full h-10 focus-visible:ring-0 focus-visible:border-soft-200 focus-visible:ring-offset-0 border rounded-lg px-3 flex items-center justify-between text-soft-400 bg-white font-normal text-sm focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder={t("placeholder")} />
                </SelectTrigger>
                <SelectContent className="border p-0.5 border-soft-200 rounded-lg shadow-lg bg-white">
                    <SelectGroup>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="px-3 py-2 hover:bg-weak-50 text-strong-950 font-normal text-sm cursor-pointer">
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default CustomSelect;
