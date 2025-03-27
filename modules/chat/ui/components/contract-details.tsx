"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ContractDetailsProps } from "@/lib/types";
import { contentVariants } from "../animation";
import moment from "moment";

const ContractDetails = ({
    selectedUser,
    contracts = [],
    files = [
        {
            name: "Audio Script.mp3",
            size: "2.35mb",
            date: "3 days ago",
        },
        {
            name: "Design.pdf",
            size: "1.2mb",
            date: "2 days ago",
        },
        {
            name: "Requirements.docx",
            size: "0.8mb",
            date: "1 day ago",
        }
    ],
    people = [],
}: ContractDetailsProps) => {
    const t = useTranslations("chat.contractDetails");
    const [isContractOpen, setIsContractOpen] = useState(true);
    const [openContracts, setOpenContracts] = useState<{ [key: string]: boolean }>(() => {
        return contracts.reduce((acc, contract) => ({
            ...acc,
            [contract.id]: true
        }), {});
    });
    const [isFilesOpen, setIsFilesOpen] = useState(true);
    const [isPeopleOpen, setIsPeopleOpen] = useState(true);

    const toggleContract = (contractId: string) => {
        setOpenContracts(prev => ({
            ...prev,
            [contractId]: !prev[contractId]
        }));
    };

    return (
        <div className="w-auto lg:w-[328px] shrink-0 p-4 lg:p-6 flex-col gap-4 lg:gap-6 border-t lg:border-l border-soft-200 h-full overflow-auto custom-scroll">
            <div className="flex flex-col items-center gap-3 lg:gap-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full p-0.5 overflow-hidden">
                    <Image
                        src="/assets/images/Avatar-4.png"
                        alt="James Brown"
                        className="w-full h-full object-contain"
                        width={64}
                        height={64}
                    />
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <h3 className="font-medium text-sub-600 text-sm lg:text-base">{selectedUser.nickname || "Unknown"}</h3>
                    <p className="text-xs font-normal text-sub-600">CEO</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full mt-3">
                {contracts.length > 0 && (
                    <div className="flex flex-col w-full gap-2">
                        <div
                            className="flex items-center h-8 lg:h-9 cursor-pointer bg-weak-50 rounded-lg justify-between w-full px-3 lg:px-4 py-1.5 text-left"
                            onClick={() => setIsContractOpen(!isContractOpen)}
                        >
                            <h3 className="font-medium text-[#525866] text-sm lg:text-base">{t("sections.contract")}</h3>
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
                                    <div className="p-3 lg:p-[14px] space-y-4">
                                        {contracts.map((contract, index) => (
                                            <div key={contract.id} className="space-y-2">
                                                {contracts.length > 1 ? (
                                                    <>
                                                        <div
                                                            className="flex items-center justify-between cursor-pointer py-1 rounded-lg"
                                                            onClick={() => toggleContract(contract.id)}
                                                        >
                                                            <span className="text-xs font-medium text-sub-600">Contract {index + 1}</span>
                                                            <motion.div
                                                                animate={{ rotate: openContracts[contract.id] ? 180 : 0 }}
                                                                transition={{ duration: 0.3 }}
                                                            >
                                                                <ChevronDown size={16} className="text-sub-600" />
                                                            </motion.div>
                                                        </div>
                                                        <AnimatePresence>
                                                            {openContracts[contract.id] && (
                                                                <motion.div
                                                                    initial="hidden"
                                                                    animate="visible"
                                                                    exit="hidden"
                                                                    variants={contentVariants}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="space-y-2">
                                                                        <div className="flex justify-between">
                                                                            <span className="text-xs font-medium text-sub-600">{t("fields.contract")}</span>
                                                                            <span className="text-xs text-sub-600 font-medium truncate max-w-[150px]">
                                                                                {contract.name || `Contract ${index + 1}`}
                                                                            </span>
                                                                        </div>
                                                                        <Separator className="bg-soft-200" />
                                                                        <div className="flex justify-between">
                                                                            <span className="text-xs font-medium text-sub-600">{t("fields.contractId")}</span>
                                                                            <span className="text-xs text-sub-600 font-medium line-clamp-1 truncate max-w-[150px]">
                                                                                #{contract.id}
                                                                            </span>
                                                                        </div>
                                                                        <Separator className="bg-soft-200" />
                                                                        <div className="flex justify-between">
                                                                            <span className="text-xs font-medium text-sub-600">{t("fields.startDate")}</span>
                                                                            <span className="text-xs text-sub-600 font-medium">
                                                                                {moment(contract.startDate).format("D MMMM, YYYY")}
                                                                            </span>
                                                                        </div>
                                                                        <Separator className="bg-soft-200" />
                                                                        <div className="flex justify-between">
                                                                            <span className="text-xs font-medium text-sub-600">{t("fields.deadline")}</span>
                                                                            <span className="text-xs text-sub-600 font-medium">
                                                                                {moment(contract.deadline).format("D MMMM, YYYY")}
                                                                            </span>
                                                                        </div>
                                                                        <Separator className="bg-soft-200" />
                                                                        <div className="flex justify-between">
                                                                            <span className="text-xs font-medium text-sub-600">{t("fields.amount")}</span>
                                                                            <span className="text-sm lg:text-base font-medium">
                                                                                ${Number(contract.amount).toFixed(2)}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </>
                                                ) : (
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-medium text-sub-600">{t("fields.contract")}</span>
                                                            <span className="text-xs text-sub-600 font-medium truncate max-w-[150px]">
                                                                {contract.name || `Contract 1`}
                                                            </span>
                                                        </div>
                                                        <Separator className="bg-soft-200" />
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-medium text-sub-600">{t("fields.contractId")}</span>
                                                            <span className="text-xs text-sub-600 font-medium line-clamp-1 truncate max-w-[150px]">
                                                                #{contract.id}
                                                            </span>
                                                        </div>
                                                        <Separator className="bg-soft-200" />
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-medium text-sub-600">{t("fields.startDate")}</span>
                                                            <span className="text-xs text-sub-600 font-medium">
                                                                {moment(contract.startDate).format("D MMMM, YYYY")}
                                                            </span>
                                                        </div>
                                                        <Separator className="bg-soft-200" />
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-medium text-sub-600">{t("fields.deadline")}</span>
                                                            <span className="text-xs text-sub-600 font-medium">
                                                                {moment(contract.deadline).format("D MMMM, YYYY")}
                                                            </span>
                                                        </div>
                                                        <Separator className="bg-soft-200" />
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-medium text-sub-600">{t("fields.amount")}</span>
                                                            <span className="text-sm lg:text-base font-medium">
                                                                ${Number(contract.amount).toFixed(2)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <Separator className="bg-soft-200 my-2" />
                                        <div className="flex justify-between">
                                            <span className="text-xs font-medium text-sub-600">Total Amount</span>
                                            <span className="text-sm lg:text-base font-medium">
                                                ${contracts.reduce((acc, contract) => acc + Number(contract.amount), 0).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
                <div className="border-b pb-2 border-soft-200">
                    <div className="flex items-center h-8 lg:h-9 cursor-pointer bg-weak-50 rounded-lg justify-between w-full px-3 lg:px-4 py-1.5 text-left"
                        onClick={() => setIsFilesOpen(!isFilesOpen)}
                    >
                        <h3 className="font-medium text-[#525866] text-sm lg:text-base">{t("sections.files")}</h3>
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
                                <div className="p-3 lg:p-[14px] space-y-2">
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

                <div className="mt-2.5">
                    <div className="flex items-center h-8 lg:h-9 cursor-pointer bg-weak-50 rounded-lg justify-between w-full px-3 lg:px-4 py-1.5 text-left"
                        onClick={() => setIsPeopleOpen(!isPeopleOpen)}
                    >
                        <h3 className="font-medium text-[#525866] text-sm lg:text-base">{t("sections.people")}</h3>
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
                                <div className="p-3 lg:p-[14px] space-y-2">
                                    {people.map((person, index) => (
                                        <div key={index} className="flex hover:bg-weak-50 p-2 rounded-[10px] transition-all duration-300 cursor-pointer justify-between items-center">
                                            <div className="flex gap-2 items-center">
                                                <div className="w-9 h-9 lg:w-11 lg:h-11 p-0.5 rounded-full overflow-hidden">
                                                    <Image
                                                        src={person.user.avatar || "/assets/images/avatar-4.png"}
                                                        alt={person.user.nickname || "Unknown"}
                                                        className="w-9 h-9 lg:w-11 lg:h-11 object-contain"
                                                        width={44}
                                                        height={44}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-xs lg:text-sm text-sub-600 font-medium">
                                                        {person.user.nickname || "Unknown"}
                                                    </p>
                                                    <p className="text-[10px] lg:text-xs text-sub-600 font-medium">{person.user.userType}</p>
                                                </div>
                                            </div>
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