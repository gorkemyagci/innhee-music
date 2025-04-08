"use client"

import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { WorkerSkeleton } from "@/components/skeletons/worker";

interface WorkersProps {
    workers: any;
    isPending: boolean;
}

const Workers = ({ workers, isPending }: WorkersProps) => {
    if (isPending) {
        return <WorkerSkeleton />
    }
    
    return (
        <div className="grid w-full gap-4 sm:gap-5 lg:gap-6 grid-cols-1 md:grid-cols-2">
            {workers?.length > 0 && workers?.map((item: any) => (
                <div
                    key={item.id}
                    className="border border-soft-200 rounded-[12px] p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 transition-all duration-300"
                >
                    <div className="flex w-full justify-between items-start sm:items-center">
                        <div className="flex items-center gap-2 sm:gap-2.5">
                            <Link href={`/talent/${item?.id}`} prefetch>
                                <UserAvatar
                                    imageUrl={item?.user?.profilePicture?.url || ""}
                                    name={item?.user?.nickname || "Unknown"}
                                    className="size-10 sm:size-12"
                                />
                            </Link>
                            <div className="flex flex-col items-start gap-1 sm:gap-1.5">
                                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                    <Link href={`/talent/${item?.id}`} prefetch>
                                        <span className="text-sub-600 font-medium text-xs">{item?.user?.nickname || "Unknown"}</span>
                                    </Link>
                                    <div className="flex items-center gap-0.5">
                                        <Icons.star className="size-3 sm:size-4" />
                                        <span className="text-sub-600 font-normal text-[10px] sm:text-xs">4.9(125)</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                    <div className="flex items-center gap-1">
                                        <Icons.google className="size-3.5 md:size-4" />
                                        <span className="text-sub-600 text-[10px] md:text-xs font-medium">Google</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Icons.google className="size-3.5 md:size-4" />
                                        <span className="text-sub-600 text-[10px] md:text-xs font-medium">Google</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.8 }}
                            className="relative cursor-pointer hover:bg-weak-50 transition-all duration-200 rounded-md flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key="outline"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 rounded-md flex items-center justify-center"
                                >
                                    <Icons.heart className="size-5" />
                                </motion.div>
                            </AnimatePresence>
                            <div className="size-5 sm:size-6 opacity-0">
                                <Icons.heart />
                            </div>
                        </motion.button>
                    </div>
                    <Separator className="bg-soft-200" />
                    <p className="text-[#31353F] text-xs sm:text-sm font-normal line-clamp-3 sm:line-clamp-none">{item?.about || "No description"}</p>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {item?.skills?.slice(0, 3).map((skill: any, index: number) => (
                            <div key={index} className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 flex items-center justify-center">
                                <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">{skill.name}</span>
                            </div>
                        ))}
                        {item?.skills?.length > 3 && (
                            <div className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 flex items-center justify-center sm:hidden">
                                <span className="text-sub-600 font-medium text-[10px] whitespace-nowrap">+{item?.skills?.length - 3}</span>
                            </div>
                        )}
                        {item?.skills?.slice(3).map((skill: any, index: number) => (
                            <div key={index} className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 hidden sm:flex items-center justify-center">
                                <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {workers?.length === 0 && (
                <div className="col-span-full flex items-center justify-start">
                    <p className="text-sub-600 font-normal text-sm">No workers found</p>
                </div>
            )}
        </div>
    )
}

export default Workers;