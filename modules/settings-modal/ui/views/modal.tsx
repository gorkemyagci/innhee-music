"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Sidebar from "@/modules/settings-modal/ui/components/sidebar";
import Profile from "@/modules/settings-modal/ui/sections/profile";
import { useState } from "react";
import Security from "@/modules/settings-modal/ui/sections/security";
import Company from "@/modules/settings-modal/ui/sections/company";
import Notifications from "@/modules/settings-modal/ui/sections/notifications";
import Orders from "../sections/orders";
import Billing from "../sections/billing";

interface ModalProps {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

const Modal = ({ children, open = false, setOpen = () => { } }: ModalProps) => {
    const [activeTab, setActiveTab] = useState<string>("profile");
    return (
        <Dialog open={open} onOpenChange={setOpen} modal={true}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-5xl p-0 h-[680px] z-[9999] overflow-hidden gap-0 w-full flex flex-col lg:flex-row items-start justify-start bg-white rounded-3xl">
                <div className="lg:w-56 w-full flex flex-col items-start gap-2.5 p-6 border-r border-soft-200 lg:h-full">
                    <DialogHeader>
                        <DialogTitle className="text-soft-400 font-medium text-xs">SETTINGS</DialogTitle>
                    </DialogHeader>
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div className="flex-1 py-4 custom-scroll overflow-y-auto h-full w-full">
                    {activeTab === "profile" && <Profile />}
                    {activeTab === "security" && <Security />}
                    {activeTab === "company" && <Company />}
                    {activeTab === "notifications" && <Notifications />}
                    {activeTab === "orders" && <Orders />}
                    {activeTab === "billing" && <Billing />}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Modal;

{/* 


const Modal = ({ children, open = false, setOpen = () => { } }: ModalProps) => {
    const [activeTab, setActiveTab] = useState<string>("profile");
    return (
        <Dialog open={open} onOpenChange={setOpen} modal={true}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-5xl p-0 h-[680px] overflow-hidden gap-0 z-50 w-full flex flex-col items-start justify-start bg-white rounded-3xl">
                <div className="lg:w-56 w-full flex flex-col items-start gap-2.5 p-6 border-r border-soft-200 lg:h-full">
                    <DialogHeader>
                        <DialogTitle className="text-soft-400 font-medium text-xs">SETTINGS</DialogTitle>
                    </DialogHeader>
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div className="flex-1 py-4 custom-scroll overflow-y-auto h-full w-full">
                    {activeTab === "profile" && <Profile />}
                    {activeTab === "security" && <Security />}
                    {activeTab === "company" && <Company />}
                    {activeTab === "notifications" && <Notifications />}
                    {activeTab === "orders" && <Orders />}
                    {activeTab === "billing" && <Billing />}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Modal;
*/}