"use client"
import { ProjectItemType } from "@/lib/types";
import Search from "../sections/search";
import ProjectItem from "@/modules/dashboard/ui/components/project-item";
import { trpc } from "@/trpc/client";
import { useState } from "react";
import { useQueryState } from "nuqs";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectItemSkeleton = () => (
    <div className="flex flex-col w-full items-start p-4 gap-4 border-b border-soft-200">
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-40" />
                </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        <div className="w-full">
            <div className="flex flex-col items-start gap-3 w-full">
                <Skeleton className="h-6 w-3/4" />
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-5 w-16 rounded-md" />
                    <Skeleton className="h-5 w-20 rounded-md" />
                    <Skeleton className="h-5 w-14 rounded-md" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-7 w-24 rounded-full" />
                    <Skeleton className="h-7 w-32 rounded-full" />
                </div>
            </div>
        </div>
    </div>
);

const FindProjects = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange] = useQueryState("price");
    const [deadline] = useQueryState("deadline");
    const [projectType] = useQueryState("type");
    const itemsPerPage = 5;
    const { data, isLoading } = trpc.jobPosting.getJobPosts.useQuery();

    const projects = Array.isArray(data) ? data : [];
    
    const filteredData = projects.filter((item: ProjectItemType) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
            item.subject?.toLowerCase().includes(searchLower) ||
            item.detail?.toLowerCase().includes(searchLower) ||
            item.employer?.nickname?.toLowerCase().includes(searchLower);

        const matchesType = !projectType || item.usage?.toUpperCase() === projectType.toUpperCase();

        const matchesDeadline = !deadline || (() => {
            if (!item.deadline) return true;
            const itemDate = new Date(item.deadline);
            const today = new Date();
            const diffDays = Math.ceil((itemDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

            switch(deadline) {
                case 'within_7_days':
                    return diffDays <= 7;
                case 'within_15_days':
                    return diffDays <= 15;
                case 'within_1_month':
                    return diffDays <= 30;
                case 'more_than_1_month':
                    return diffDays > 30;
                default:
                    return true;
            }
        })();

        const matchesPrice = !priceRange || (() => {
            if (!item.salary) return true;
            const [min, max] = priceRange.split('-');
            const minPrice = min ? Number(min) : null;
            const maxPrice = max ? Number(max) : null;
            
            if (maxPrice === 1000) {
                return minPrice ? item.salary >= minPrice : true;
            }
        
            return (!minPrice || item.salary >= minPrice) && (!maxPrice || item.salary <= maxPrice);
        })();

        return matchesSearch && matchesType && matchesDeadline && matchesPrice;
    });

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentItems = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <div className="w-full flex flex-col gap-8">
            <Search onSearch={handleSearch} />
            {isLoading && (
                <div className="flex flex-col gap-0 w-full">
                    {[...Array(3)].map((_, index) => (
                        <ProjectItemSkeleton key={index} />
                    ))}
                </div>
            )}

            {!isLoading && (
                <div className="flex flex-col gap-0 w-full">
                    {currentItems.length > 0 ? (
                        currentItems.map((item: ProjectItemType) => (
                            <ProjectItem key={item.id} item={item} />
                        ))
                    ) : (
                        <div className="py-8 text-center text-gray-500">
                            No projects found
                        </div>
                    )}
                </div>
            )}

            {!isLoading && totalPages > 1 && (
                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        {[...Array(totalPages)].map((_, index) => {
                            const page = index + 1;
                            if (
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                                return (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            onClick={() => handlePageChange(page)}
                                            isActive={page === currentPage}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            }
                            if (page === 2 || page === totalPages - 1) {
                                return (
                                    <PaginationItem key={page}>
                                        <span className="px-4">...</span>
                                    </PaginationItem>
                                );
                            }

                            return null;
                        })}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default FindProjects;