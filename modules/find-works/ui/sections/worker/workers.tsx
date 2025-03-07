"use client"

import React, { useState } from "react";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";
import { workers } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";

const Workers = () => {
    const [workersList, setWorkersList] = useState(workers);
    
    const toggleFavorite = (id: number) => {
        setWorkersList(prev => 
            prev.map(worker => 
                worker.id === id 
                    ? { ...worker, isFavorite: !worker.isFavorite } 
                    : worker
            )
        );
    };

    return (
        <div className="grid grid-cols-2 gap-6 w-full">
            {workersList.map((item) => (
                <div key={item.id} className="border border-soft-200 rounded-[12px] p-4 flex flex-col gap-4">
                    <div className="flex w-full justify-between items-center">
                        <div className="flex items-center gap-2.5">
                            <UserAvatar
                                imageUrl={item.avatar}
                                name={item.name}
                                className="size-12"
                            />
                            <div className="flex flex-col items-start gap-1.5">
                                <div className="flex items-center gap-2">
                                    <span className="text-sub-600 font-medium text-xs">{item.name}</span>
                                    <div className="flex items-center gap-0.5">
                                        <Icons.star />
                                        <span className="text-sub-600 font-normal text-xs">{item.rating}({item.reviewCount})</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <Icons.dollar_square className="size-3.5 md:size-4" />
                                        <span className="text-sub-500 text-[10px] md:text-xs font-medium">{item.jobType}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Icons.map className="size-3.5 md:size-4" />
                                        <span className="text-sub-500 text-[10px] md:text-xs font-medium">{item.workType}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Icons.star className="size-3.5 md:size-4 fill-blue-800" />
                                        <span className="text-sub-600 text-[10px] md:text-xs font-medium">{item.specialization}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <motion.button 
                            onClick={() => toggleFavorite(item.id)}
                            whileTap={{ scale: 0.8 }}
                            className="relative cursor-pointer hover:bg-weak-50 transition-all duration-200 w-9 h-9 rounded-md flex items-center justify-center"
                        >
                            <AnimatePresence mode="wait">
                                {item.isFavorite ? (
                                    <motion.div
                                        key="filled"
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ 
                                            scale: [0.5, 1.2, 1], 
                                            opacity: 1 
                                        }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ 
                                            duration: 0.1,
                                            times: [0, 0.5, 1]
                                        }}
                                        className="absolute inset-0 rounded-md flex items-center justify-center"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="1" className="size-6">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="outline"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 rounded-md flex items-center justify-center"
                                    >
                                        <Icons.heart className="size-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="size-6 opacity-0">
                                <Icons.heart />
                            </div>
                        </motion.button>
                    </div>
                    <Separator className="bg-soft-200" />
                    <p className="text-[#31353F] text-sm font-normal">{item.description}</p>
                    <div className="flex flex-wrap items-center gap-2">
                        {item.skills.map((skill, index) => (
                            <div key={index} className="bg-white border border-soft-200 rounded-md py-1 px-2 h-5 md:h-6 flex items-center justify-center">
                                <span className="text-sub-600 font-medium text-[10px] md:text-xs whitespace-nowrap">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Workers;