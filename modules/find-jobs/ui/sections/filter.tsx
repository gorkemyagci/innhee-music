"use client"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FilterTabs from "../components/tabs";
import { useState, createContext, useContext } from "react";
import FilterSkills from "../components/skills";
import FilterTools from "../components/tools";
import FeaturedTags from "../components/featured-tags";
import FilterSwitch from "../components/switch";
import { useQueryState } from "nuqs";
import Price from "../components/price";
import CustomSelect from "@/components/custom/select";

export interface FilterContextType {
    clearAllFilters: () => void;
    isFilterCleared: boolean;
}

export const FilterContext = createContext<FilterContextType>({
    clearAllFilters: () => { },
    isFilterCleared: false
});

export const useFilterContext = () => useContext(FilterContext);

const Filter = () => {
    const [tab, setTab] = useQueryState("tab", {
        defaultValue: "workers",
    });
    const [isFilterCleared, setIsFilterCleared] = useState(false);

    const clearAllFilters = () => {
        setIsFilterCleared(true);
        setTimeout(() => {
            setIsFilterCleared(false);
        }, 100);
    };

    // Default values for selects
    const defaultProjectType = "";
    const defaultDeadline = "";

    const [selectedValue, setSelectedValue] = useState(defaultDeadline);
    const [selectedProjectType, setSelectedProjectType] = useState(defaultProjectType);

    const options = [
        { value: "within_7_days", label: "Within seven days" },
        { value: "within_15_days", label: "Within 15 days" },
        { value: "within_1_month", label: "Within one month" },
        { value: "more_than_1_month", label: "More than one month" },
    ];

    const projectTypeOptions = [
        { value: "business", label: "Business" },
        { value: "personal", label: "Personal" },
    ];

    return (
        <FilterContext.Provider value={{ clearAllFilters, isFilterCleared }}>
            <div className="min-w-[300px] flex-1 pb-4 min-h-[calc(100vh-114px)] rounded-[20px] flex flex-col items-start justify-between">
                <div className="flex flex-col">
                    <FilterTabs activeTab={tab} setActiveTab={setTab} />
                    <div className="p-4 flex flex-col gap-3">
                        <FilterSkills />
                        <Separator className="bg-soft-200" />
                        {tab === "workers" && (
                            <>
                                <FeaturedTags />
                                <Separator className="bg-soft-200" />
                            </>
                        )}
                        <FilterTools />
                        <Separator className="bg-soft-200" />
                        {tab === "workers" && (
                            <FilterSwitch />
                        )}
                        {tab === "projects" && (
                            <Price />
                        )}
                        {tab === "projects" && (
                            <>
                                <CustomSelect
                                    label="Project type"
                                    options={projectTypeOptions}
                                    value={selectedProjectType}
                                    onChange={setSelectedProjectType}
                                    defaultValue={defaultProjectType}
                                />
                                <Separator className="bg-soft-200" />
                                <CustomSelect
                                    label="Deadline"
                                    options={options}
                                    value={selectedValue}
                                    onChange={setSelectedValue}
                                    defaultValue={defaultDeadline}
                                />
                                <Separator className="bg-soft-200 mb-5" />
                            </>
                        )}
                    </div>
                </div>
                <Button
                    variant="outline"
                    className="bg-white border-soft-200 p-2.5 h-10 w-full rounded-[10px] text-sub-600 font-medium text-sm"
                    onClick={clearAllFilters}
                >
                    Clear Filters
                </Button>
            </div>
        </FilterContext.Provider>
    );
};

export default Filter;