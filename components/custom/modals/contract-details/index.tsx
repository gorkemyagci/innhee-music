"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface ContractDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    contractData: {
        contractId: string;
        contractName: string;
        startDate: string;
        deadline: string;
        amount: number;
        offerAmount?: number;
        milestoneAmount?: number;
    };
}

const ContractDetailsModal = ({ isOpen, onClose, contractData }: ContractDetailsModalProps) => {
    const t = useTranslations("modals.contractDetails");

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] p-0 gap-0">
                <div className="flex items-center justify-between p-4 border-b border-soft-200">
                    <h2 className="font-medium text-lg text-strong-950">{t("title")}</h2>
                </div>
                <div className="p-4">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center px-2 py-1 rounded-lg">
                            <span className="text-sm text-sub-600">{t("fields.contractId")}</span>
                            <span className="text-sm font-medium text-strong-950">#{contractData.contractId}</span>
                        </div>
                        <div className="flex justify-between items-center px-2 py-1 rounded-lg">
                            <span className="text-sm text-sub-600">{t("fields.contractName")}</span>
                            <span className="text-sm font-medium text-strong-950">{contractData.contractName}</span>
                        </div>
                        <div className="flex justify-between items-center px-2 py-1 rounded-lg">
                            <span className="text-sm text-sub-600">{t("fields.startDate")}</span>
                            <span className="text-sm font-medium text-strong-950">{contractData.startDate}</span>
                        </div>
                        <div className="flex justify-between items-center px-2 py-1 rounded-lg">
                            <span className="text-sm text-sub-600">{t("fields.deadline")}</span>
                            <span className="text-sm font-medium text-strong-950">{contractData.deadline}</span>
                        </div>
                        <div className="flex justify-between items-center px-2 py-1 rounded-lg">
                            <span className="text-sm text-sub-600">{t("fields.totalAmount")}</span>
                            <span className="text-sm font-medium text-strong-950">
                                ${typeof contractData.amount === 'number' ? contractData.amount.toFixed(2) : '0.00'}
                            </span>
                        </div>
                        {contractData.offerAmount && (
                            <div className="flex justify-between items-center px-2 py-1 rounded-lg">
                                <span className="text-sm text-sub-600">{t("fields.offerAmount")}</span>
                                <span className="text-sm font-medium text-strong-950">
                                    ${contractData.offerAmount.toFixed(2)}
                                </span>
                            </div>
                        )}
                        {contractData.milestoneAmount && (
                            <div className="flex justify-between items-center px-2 py-1 rounded-lg">
                                <span className="text-sm text-sub-600">{t("fields.milestoneAmount")}</span>
                                <span className="text-sm font-medium text-strong-950">
                                    ${contractData.milestoneAmount.toFixed(2)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-4 border-t border-soft-200">
                    <Button
                        onClick={onClose}
                        className="w-full h-9 disabled:cursor-auto group rounded-lg text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]"
                    >
                        <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                        {t("buttons.close")}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ContractDetailsModal; 