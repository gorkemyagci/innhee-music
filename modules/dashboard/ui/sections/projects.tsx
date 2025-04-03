"use client"
import { useState, useRef, useEffect } from "react";
import ProjectItem from "../components/project-item";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { trpc } from "@/trpc/client";
import { ProjectItemType } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const ProjectItemSkeleton = () => (
    <div className="w-full p-4 border-b border-soft-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-col gap-2 w-full md:w-3/4">
                <Skeleton className="h-5 w-3/4" />
                <div className="flex flex-wrap gap-1.5 mt-1">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-5 w-16" />
                    ))}
                </div>
                <Skeleton className="h-4 w-full mt-1" />
                <Skeleton className="h-4 w-5/6 mt-1" />
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                </div>
            </div>
            <div className="flex flex-row md:flex-col justify-between md:items-end gap-2 mt-3 md:mt-0">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-24" />
            </div>
        </div>
    </div>
);

const Projects = () => {
    const t = useTranslations("projects");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const { data: jobPosts, isLoading } = trpc.jobPosting.getJobPosts.useQuery();
    const items = [
        t("categories.all"),
        t("categories.billboard"),
        t("categories.american"),
        t("categories.brit"),
        t("categories.mtv"),
        t("categories.awards")
    ];
    const [active, setActive] = useState(0);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const posts = Array.isArray(jobPosts) ? jobPosts : [];
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const paginatedPosts = posts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        const checkScroll = () => {
            if (categoriesRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;
                setCanScrollLeft(scrollLeft > 0);
                setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
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
            const scrollAmount = 200;
            const newScrollLeft = direction === 'left'
                ? categoriesRef.current.scrollLeft - scrollAmount
                : categoriesRef.current.scrollLeft + scrollAmount;

            categoriesRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col items-start gap-4 pr-1 w-full">
            <div className="flex flex-col md:flex-row md:items-center w-full justify-between gap-4 md:gap-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                    <p className="text-main-900 font-medium text-base">{t("title")}</p>
                    <Button
                        variant="outline"
                        size="sm"
                        className="md:hidden h-8 rounded-lg border border-soft-200 text-sub-600 font-medium text-xs"
                    >
                        {t("more")} <MoreHorizontal className="ml-1 h-4 w-4" />
                    </Button>
                </div>

                <div className="relative w-full md:w-auto">
                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            "md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 h-6 w-6 rounded-full bg-white shadow-sm border border-soft-200",
                            !canScrollLeft && "hidden"
                        )}
                        onClick={() => scrollCategories('left')}
                    >
                        <ChevronLeft className="h-3 w-3" />
                    </Button>

                    <div
                        ref={categoriesRef}
                        className={cn(
                            "flex items-center py-0.5 w-full",
                            "md:w-auto md:justify-center md:gap-6",
                            "overflow-x-auto scrollbar-hide px-2 md:px-0 gap-4"
                        )}
                    >
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "relative whitespace-nowrap cursor-pointer py-1 px-1",
                                    "flex-shrink-0 md:flex-shrink"
                                )}
                                onClick={() => setActive(index)}
                            >
                                <span className="text-sub-600 font-medium text-xs">
                                    {item}
                                </span>
                                {active === index && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-soft-400" />
                                )}
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            "md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 h-6 w-6 rounded-full bg-white shadow-sm border border-soft-200",
                            !canScrollRight && "hidden"
                        )}
                        onClick={() => scrollCategories('right')}
                    >
                        <ChevronRight className="h-3 w-3" />
                    </Button>
                </div>
                <span className="hidden md:inline-block border-b border-sub-600 text-sub-600 font-medium text-xs cursor-pointer">
                    {t("more")}
                </span>
            </div>

            <div className="flex flex-col gap-2 md:gap-0 w-full">
                {isLoading ? (
                    Array(3).fill(0).map((_, index) => (
                        <ProjectItemSkeleton key={index} />
                    ))
                ) : paginatedPosts?.length > 0 ? (
                    paginatedPosts.map((item: ProjectItemType, index: number) => (
                        <ProjectItem item={item} key={index} />
                    ))
                ) : (
                    <div className="flex flex-col gap-2 md:gap-0 w-full">
                        <p className="text-sub-600 font-medium text-xs">{t("noProjects")}</p>
                    </div>
                )}
                {totalPages > 1 && (
                    <Pagination className="mt-4">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious 
                                    href="#" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) handlePageChange(currentPage - 1);
                                    }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                            
                            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                                let pageNumber: number;
                                if (totalPages <= 5) {
                                    pageNumber = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNumber = i + 1;
                                    if (i === 4) return (
                                        <PaginationItem key={i}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                } else if (currentPage >= totalPages - 2) {
                                    pageNumber = totalPages - 4 + i;
                                    if (i === 0) return (
                                        <PaginationItem key={i}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                } else {
                                    if (i === 0) return (
                                        <PaginationItem key={i}>
                                            <PaginationLink 
                                                href="#" 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePageChange(1);
                                                }}
                                            >
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                    if (i === 1) return (
                                        <PaginationItem key={i}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                    if (i === 3) return (
                                        <PaginationItem key={i}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                    if (i === 4) return (
                                        <PaginationItem key={i}>
                                            <PaginationLink 
                                                href="#" 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePageChange(totalPages);
                                                }}
                                            >
                                                {totalPages}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                    pageNumber = currentPage + i - 2;
                                }
                                
                                return (
                                    <PaginationItem key={i}>
                                        <PaginationLink 
                                            href="#" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(pageNumber);
                                            }}
                                            isActive={currentPage === pageNumber}
                                        >
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}
                            
                            <PaginationItem>
                                <PaginationNext 
                                    href="#" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < totalPages) handlePageChange(currentPage + 1);
                                    }}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
};

export default Projects;