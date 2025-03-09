"use client"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FilterTabs from "../components/tabs";
import { useState, createContext, useContext, Suspense, useEffect, useRef } from "react";
import FilterSkills from "../components/skills";
import FilterTools from "../components/tools";
import FeaturedTags from "../components/featured-tags";
import FilterSwitch from "../components/switch";
import { useQueryState } from "nuqs";
import Price from "../components/price";
import CustomSelect from "@/components/custom/select";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Filter as FilterIcon, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface FilterContextType {
    clearAllFilters: () => void;
    isFilterCleared: boolean;
}

export const FilterContext = createContext<FilterContextType>({
    clearAllFilters: () => { },
    isFilterCleared: false
});

export const useFilterContext = () => useContext(FilterContext);

const FilterSuspense = () => {
    const [tab, setTab] = useQueryState("tab", {
        defaultValue: "workers",
    });
    const [isFilterCleared, setIsFilterCleared] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const filterRef = useRef<HTMLDivElement>(null);

    // Check if we're on mobile when component mounts and when window resizes
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
            setIsLoading(false);
        };
        
        // Initial check
        checkIfMobile();
        
        // Add event listener for window resize
        window.addEventListener("resize", checkIfMobile);
        
        // Cleanup
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    // Close filter panel when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isMobile && isFilterOpen) {
                const filter = filterRef.current;
                if (filter && !filter.contains(e.target as Node)) {
                    setIsFilterOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile, isFilterOpen]);

    // Disable body scroll when filter panel is open on mobile
    useEffect(() => {
        if (isMobile && isFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobile, isFilterOpen]);

    const clearAllFilters = () => {
        setIsFilterCleared(true);
        setTimeout(() => {
            setIsFilterCleared(false);
        }, 100);
        
        // Close filter panel on mobile after clearing
        if (isMobile) {
            setIsFilterOpen(false);
        }
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
            {!isLoading && (
                <>
                    {/* Mobile filter toggle button */}
                    {isMobile && (
                        <div className="fixed bottom-4 right-4 z-40">
                            <Button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="h-12 px-4 rounded-full bg-white shadow-lg border border-soft-200 flex items-center gap-2"
                            >
                                <FilterIcon className="h-5 w-5 text-gray-700" />
                                <span className="font-medium text-strong-950 text-sm">Filters</span>
                            </Button>
                        </div>
                    )}

                    {/* Overlay for mobile */}
                    <AnimatePresence>
                        {isMobile && isFilterOpen && (
                            <motion.div
                                className="fixed inset-0 bg-black/50 z-40"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setIsFilterOpen(false)}
                            />
                        )}
                    </AnimatePresence>

                    <motion.div
                        ref={filterRef}
                        className={cn(
                            "bg-white border border-soft-200 xl:w-[314px] rounded-[20px] flex flex-col",
                            "transition-all duration-300",
                            // Desktop styles
                            !isMobile && "min-w-[300px] flex-1 pb-4 min-h-[calc(100vh-114px)] static opacity-100 pointer-events-auto",
                            // Mobile styles
                            isMobile && "fixed inset-4 z-50 max-h-[90vh] overflow-hidden"
                        )}
                        initial={false}
                        animate={{
                            y: isMobile && !isFilterOpen ? "100%" : 0,
                            opacity: isMobile && !isFilterOpen ? 0 : 1,
                            pointerEvents: isMobile && !isFilterOpen ? "none" : "auto"
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 40
                        }}
                    >
                        {/* Mobile header with close button */}
                        {isMobile && (
                            <div className="flex items-center justify-between p-4 border-b border-soft-200">
                                <h3 className="font-medium text-base">Filters</h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full"
                                    onClick={() => setIsFilterOpen(false)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}

                        <div className={cn(
                            "flex flex-col h-full",
                            isMobile && "overflow-y-auto custom-scroll"
                        )}>
                            <div className="flex flex-col flex-grow">
                                <FilterTabs activeTab={tab} setActiveTab={(value) => setTab(value as "workers" | "projects" | "betas")} />
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
                            <div className={cn(
                                "p-4 md:pt-0",
                                isMobile && "sticky bottom-0 bg-white border-t border-soft-200 mt-auto"
                            )}>
                                <Button
                                    variant="outline"
                                    className="bg-white border-soft-200 p-2.5 h-10 w-full rounded-[10px] text-sub-600 font-medium text-sm"
                                    onClick={clearAllFilters}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
            
            {isLoading && (
                <div className="bg-white border border-soft-200 rounded-[20px] flex flex-col min-w-[300px] flex-1 pb-4 min-h-[calc(100vh-114px)] animate-pulse">
                    <div className="p-4">
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-10 bg-gray-200 rounded mb-4"></div>
                        <div className="h-10 bg-gray-200 rounded mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-24 bg-gray-200 rounded mb-4"></div>
                    </div>
                </div>
            )}
        </FilterContext.Provider>
    );
};

const Filter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FilterSuspense />
        </Suspense>
    )
}

export default Filter;