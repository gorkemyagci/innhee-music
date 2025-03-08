"use client"
import { useState, useEffect, useRef } from "react";
import ProjectItem from "../components/project-item";
import { featuredJobs } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Projects = () => {
    const items = [
        "All", "Billboard", "Americamn", "BRIT", "MTV", "Awards"
    ];
    const [active, setActive] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Check if we're on mobile when component mounts and when window resizes
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Initial check
        checkIfMobile();
        
        // Add event listener for window resize
        window.addEventListener("resize", checkIfMobile);
        
        // Cleanup
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    // Check if categories can be scrolled
    useEffect(() => {
        const checkScroll = () => {
            if (categoriesRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;
                setCanScrollLeft(scrollLeft > 0);
                setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
            }
        };

        checkScroll();
        window.addEventListener('resize', checkScroll);
        
        const categoriesElement = categoriesRef.current;
        if (categoriesElement) {
            categoriesElement.addEventListener('scroll', checkScroll);
        }

        return () => {
            window.removeEventListener('resize', checkScroll);
            if (categoriesElement) {
                categoriesElement.removeEventListener('scroll', checkScroll);
            }
        };
    }, []);

    const scrollCategories = (direction: 'left' | 'right') => {
        if (categoriesRef.current) {
            const scrollAmount = 200; // Adjust as needed
            const newScrollLeft = direction === 'left' 
                ? categoriesRef.current.scrollLeft - scrollAmount 
                : categoriesRef.current.scrollLeft + scrollAmount;
            
            categoriesRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex flex-col items-start gap-4 w-full pr-1">
            <div className="flex flex-col md:flex-row md:items-center w-full justify-between gap-4 md:gap-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                    <p className="text-main-900 font-medium">Projects</p>
                    
                    {/* Mobile more button */}
                    {isMobile && (
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 rounded-lg border border-soft-200 text-sub-600 font-medium text-xs"
                        >
                            More <MoreHorizontal className="ml-1 h-4 w-4" />
                        </Button>
                    )}
                </div>
                
                <div className="relative w-full md:w-auto">
                    {/* Scroll buttons for mobile */}
                    {isMobile && canScrollLeft && (
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-6 w-6 rounded-full bg-white shadow-sm border border-soft-200"
                            onClick={() => scrollCategories('left')}
                        >
                            <ChevronLeft className="h-3 w-3" />
                        </Button>
                    )}
                    
                    <div 
                        ref={categoriesRef}
                        className={cn(
                            "flex items-center py-0.5 w-full md:w-auto",
                            isMobile ? "overflow-x-auto scrollbar-hide px-2" : "justify-center gap-6"
                        )}
                    >
                        {items.map((item, index) => (
                            <div 
                                key={index} 
                                className={cn(
                                    "relative whitespace-nowrap cursor-pointer px-3 py-1",
                                    isMobile && "flex-shrink-0"
                                )}
                                onClick={() => setActive(index)}
                            >
                                <span className={cn(
                                    "text-sub-600 font-medium text-xs",
                                    active === index && "text-main-900"
                                )}>
                                    {item}
                                </span>
                                {active === index && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-soft-400" />
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Scroll buttons for mobile */}
                    {isMobile && canScrollRight && (
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-6 w-6 rounded-full bg-white shadow-sm border border-soft-200"
                            onClick={() => scrollCategories('right')}
                        >
                            <ChevronRight className="h-3 w-3" />
                        </Button>
                    )}
                </div>
                
                {/* Desktop more link */}
                <span className="hidden md:inline-block text-sub-600 font-medium text-xs border-b border-sub-600 cursor-pointer">
                    More
                </span>
            </div>
            
            <div className="flex flex-col gap-2 md:gap-0 w-full">
                {featuredJobs.map((item, index) => (
                    <ProjectItem item={item} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Projects;