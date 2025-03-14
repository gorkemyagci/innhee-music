"use client"
import { ProjectItemType } from "@/lib/types";
import Search from "../sections/search";
import ProjectItem from "@/modules/dashboard/ui/components/project-item";
import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";
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
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        setIsLoaded(true);
    }, []);


    const { data, isLoading } = trpc.jobPosting.getJobPosts.useQuery();

    // Calculate pagination
    const totalItems = data?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentItems = data?.slice(startIndex, endIndex) || [];

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full flex flex-col gap-8">
            <Search />

            {/* Loading skeletons */}
            {isLoading && (
                <div className="flex flex-col gap-0 w-full">
                    {[...Array(3)].map((_, index) => (
                        <ProjectItemSkeleton key={index} />
                    ))}
                </div>
            )}

            {/* Project items */}
            {!isLoading && (
                <div
                    className="flex flex-col gap-0 w-full"
                >
                    {currentItems.length > 0 ? (
                        currentItems.map((item: ProjectItemType, index: number) => (
                            <ProjectItem key={item.id} item={item} />
                        ))
                    ) : (
                        <div className="py-8 text-center text-gray-500">
                            No projects found
                        </div>
                    )}
                </div>
            )}

            {/* Pagination */}
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
                            // Show current page, first, last, and pages around current
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

                            // Show ellipsis for gaps
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