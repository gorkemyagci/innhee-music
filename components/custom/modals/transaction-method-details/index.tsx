"use client"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UserAvatar from "@/components/user-avatar";
import { useState } from "react";
import Invite from "./invite";
import { useTranslations } from "next-intl";

interface TransactionMethodDetailsProps {
    children?: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const TransactionMethodDetails = ({ children, open, setOpen }: TransactionMethodDetailsProps) => {
    const t = useTranslations("transactionMethodDetails");
    const [isInvite, setIsInvite] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[440px] border border-soft-200 rounded-[20px] pt-6 pb-2.5 px-2.5 bg-white flex flex-col items-center gap-4">
                <DialogHeader className="hidden">
                    <DialogTitle></DialogTitle>
                </DialogHeader>
                {isInvite ? <Invite /> : (
                    <>
                        <div className="flex flex-col items-center gap-2.5">
                            <UserAvatar
                                imageUrl="/assets/images/Avatar-4.png"
                                name="John Doe"
                                className="w-16 h-16 object-contain shrink-0 p-0.5"
                            />
                            <p className="text-strong-950 font-medium text-lg">{t("thanksOrder")}</p>
                        </div>
                        <div className="bg-weak-50 p-5 rounded-[12px] flex flex-col items-center gap-4">
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-strong-950 font-medium text-base">{t("whatNext")}</p>
                                <p className="text-sub-600 font-normal text-sm text-center">
                                    <span className="font-bold">{t("invite")}</span> {t("inviteDescription")}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    onClick={() => setIsInvite(true)}
                                    className="w-[142.5px] h-9 disabled:cursor-auto group rounded-lg text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                                    <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                                    {t("invite")}
                                </Button>
                                <Button variant="outline" className="bg-white h-9 w-[142.5px] rounded-lg p-2 border-soft-200 flex items-center justify-center text-sub-600 font-medium text-sm">
                                    {t("liveSupport")}
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default TransactionMethodDetails;