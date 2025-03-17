"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/icons";

interface ContractDetailsProps {
    contractId: string;
    contractName: string;
    startDate: string;
    deadline: string;
    amount: number;
    files?: {
        name: string;
        size: string;
        date: string;
    }[];
    people?: {
        name: string;
        role: string;
        avatar: string;
        status?: string;
    }[];
}

const ContractDetails = ({
    contractId,
    contractName,
    startDate,
    deadline,
    amount,
    files = [],
    people = [],
}: ContractDetailsProps) => {
    const [isContractOpen, setIsContractOpen] = useState(true);
    const [isFilesOpen, setIsFilesOpen] = useState(true);
    const [isPeopleOpen, setIsPeopleOpen] = useState(true);

    // Animation variants
    const contentVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="w-[328px] p-6 flex-col gap-6 border-l border-soft-200 h-full overflow-auto custom-scroll hidden lg:flex">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full p-0.5 overflow-hidden">
                    <Image
                        src="/assets/images/Avatar-4.png"
                        alt="James Brown"
                        className="w-full h-full object-contain"
                        width={64}
                        height={64}
                    />
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <h3 className="font-medium text-sub-600">James Brown</h3>
                    <p className="text-xs font-normal text-sub-600">CEO</p>
                </div>
            </div>

            {/* Contract Details */}
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col w-full gap-2">
                    <div
                        className="flex items-center h-9 cursor-pointer bg-weak-50 rounded-lg justify-between w-full px-4 py-1.5 text-left"
                        onClick={() => setIsContractOpen(!isContractOpen)}
                    >
                        <h3 className="font-medium text-[#525866]">Contract details</h3>
                        <motion.div
                            animate={{ rotate: isContractOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown size={16} className="text-sub-600" />
                        </motion.div>
                    </div>
                    <AnimatePresence>
                        {isContractOpen && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={contentVariants}
                                className="overflow-hidden"
                            >
                                <div className="p-[14px] space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-xs font-medium text-sub-600">Contract</span>
                                        <span className="text-xs text-sub-600 font-medium truncate max-w-[150px]">
                                            {contractName}
                                        </span>
                                    </div>
                                    <Separator className="bg-soft-200" />
                                    <div className="flex justify-between">
                                        <span className="text-xs font-medium text-sub-600">Contract ID</span>
                                        <span className="text-xs text-sub-600 font-medium">
                                            #{contractId}
                                        </span>
                                    </div>
                                    <Separator className="bg-soft-200" />
                                    <div className="flex justify-between">
                                        <span className="text-xs font-medium text-sub-600">Start Date</span>
                                        <span className="text-xs text-sub-600 font-medium">
                                            {startDate}
                                        </span>
                                    </div>
                                    <Separator className="bg-soft-200" />
                                    <div className="flex justify-between">
                                        <span className="text-xs font-medium text-sub-600">Deadline</span>
                                        <span className="text-xs text-sub-600 font-medium">
                                            {deadline}
                                        </span>
                                    </div>
                                    <Separator className="bg-soft-200" />
                                    <div className="flex justify-between">
                                        <span className="text-xs font-medium text-sub-600">Amount</span>
                                        <span className="text-base font-medium">
                                            ${typeof amount === 'number' ? amount.toFixed(2) : '0.00'}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Files */}
                <div className="border-b border-soft-200">
                    <div className="flex items-center h-9 cursor-pointer bg-weak-50 rounded-lg justify-between w-full px-4 py-1.5 text-left"
                        onClick={() => setIsFilesOpen(!isFilesOpen)}
                    >
                        <h3 className="font-medium text-[#525866]">Files</h3>
                        <motion.div
                            animate={{ rotate: isFilesOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown size={16} className="text-sub-600" />
                        </motion.div>
                    </div>
                    <AnimatePresence>
                        {isFilesOpen && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={contentVariants}
                                className="overflow-hidden"
                            >
                                <div className="p-[14px] space-y-2">
                                    {files.map((file, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div>
                                                    <p className="text-xs text-sub-600 font-medium">
                                                        {file.name} {file.size}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-sub-600 font-medium">{file.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* People */}
                <div className="mt-2.5">
                    <div className="flex items-center h-9 cursor-pointer bg-weak-50 rounded-lg justify-between w-full px-4 py-1.5 text-left"
                        onClick={() => setIsPeopleOpen(!isPeopleOpen)}
                    >
                        <h3 className="font-medium text-[#525866]">People</h3>
                        <motion.div
                            animate={{ rotate: isPeopleOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown size={16} className="text-sub-600" />
                        </motion.div>
                    </div>
                    <AnimatePresence>
                        {isPeopleOpen && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={contentVariants}
                                className="overflow-hidden"
                            >
                                <div className="p-[14px] space-y-2">
                                    {people.map((person, index) => (
                                        <div key={index} className="flex hover:bg-weak-50 p-2 rounded-[10px] transition-all duration-300 cursor-pointer justify-between items-center">
                                            <div className="flex gap-2 items-center">
                                                <div className="w-11 h-11 p-0.5 rounded-full overflow-hidden">
                                                    <Image
                                                        src={person.avatar}
                                                        alt={person.name}
                                                        className="w-11 h-11 object-contain"
                                                        width={44}
                                                        height={44}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-sm text-sub-600 font-medium">
                                                        {person.name}
                                                    </p>
                                                    <p className="text-xs text-sub-600 font-medium">{person.role}</p>
                                                </div>
                                            </div>
                                            {person?.status === "offline" && (
                                                <Icons.chat_offline className="text-sub-600" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ContractDetails; 