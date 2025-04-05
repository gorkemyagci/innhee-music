"use client";
import { Icons } from "@/components/icons";
import Head from "../components/head";
import { trpc } from "@/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Security = () => {
    const { data, isPending } = trpc.auth.getMe.useQuery();
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [tempEmail, setTempEmail] = useState(data?.email || "");
    const [tempPhone, setTempPhone] = useState(data?.phone || "");
    const [tempPassword, setTempPassword] = useState("");
    const utils = trpc.useUtils();

    const updateEmail = trpc.user.updateEmail.useMutation({
        onSuccess: (data) => {
            toast.success("Email updated successfully");
            utils.auth.getMe.invalidate();
            setIsEditingEmail(false);
        },
        onError: (error) => {
            toast.error("Failed to update email");
        }
    });

    const updatePhone = trpc.user.updatePhone.useMutation({
        onSuccess: (data) => {
            toast.success("Phone number updated successfully");
            utils.auth.getMe.invalidate();
            setIsEditingPhone(false);
        },
        onError: (error) => {
            toast.error("Failed to update phone number");
        }
    });

    const updatePassword = trpc.user.updatePassword.useMutation({
        onSuccess: () => {
            toast.success("Password updated successfully");
            setIsEditingPassword(false);
            setTempPassword("");
        },
        onError: (error) => {
            toast.error("Failed to update password");
        }
    });

    const handleSaveEmail = () => {
        updateEmail.mutate({ email: tempEmail });
    };

    const handleSavePhone = () => {
        updatePhone.mutate({ phone: tempPhone });
    };

    const handleSavePassword = () => {
        if (!tempPassword) return;
        
        const requestBody: { password: string; oldPassword?: string } = {
            password: tempPassword
        };
        if (data?.password) {
            requestBody.oldPassword = data.password;
        }
        updatePassword.mutate(requestBody);
    };

    if (isPending) {
        return (
            <div className="w-full">
                <Head heading="Security" subHeading="Personalize your privacy settings and enhance the security of your account." />
                <div className="w-full px-6 pt-6 flex flex-col gap-6 items-start">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-4" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <Head heading="Security" subHeading="Personalize your privacy settings and enhance the security of your account." />
            <div className="w-full px-6 pt-6 flex flex-col gap-6 items-start">
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-strong-950 font-medium text-sm">Email</p>
                        <span className="text-sub-600 text-xs font-normal">Business email address recommended.</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <AnimatePresence mode="wait">
                            {isEditingEmail && !updateEmail.isPending ? (
                                <motion.div
                                    key="email-input"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                    className="lg:w-52 w-40"
                                >
                                    <Input
                                        type="email"
                                        value={tempEmail}
                                        onChange={(e) => setTempEmail(e.target.value)}
                                        className="h-9 text-sm font-normal text-main-900"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveEmail();
                                            if (e.key === 'Escape') setIsEditingEmail(false);
                                        }}
                                    />
                                </motion.div>
                            ) : (
                                <motion.span
                                    key="email-text"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-sub-600 font-normal text-sm"
                                >
                                    {updateEmail?.isPending ? (
                                        <div className="flex items-center gap-2 text-sub-600 font-normal text-sm">
                                            <Loader2 className="w-3 h-3 animate-spin text-sub-600" />
                                            Saving..
                                        </div>
                                    ) : data?.email || "No email"}
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                            {isEditingEmail && !updateEmail.isPending ? (
                                <motion.div
                                    key="save-button"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 rounded-full border border-soft-200"
                                        onClick={handleSaveEmail}
                                    >
                                        <Icons.check_icon />
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="edit-button"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    <Button
                                        variant="ghost"
                                        className="p-0 h-9 w-9 flex items-center justify-center"
                                        onClick={() => {
                                            setTempEmail(data?.email || "");
                                            setIsEditingEmail(true);
                                        }}
                                    >
                                        <Icons.pencil />
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="border border-dashed w-full h-[1px] border-soft-200" />
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-strong-950 font-medium text-sm">Phone Number</p>
                        <span className="text-sub-600 text-xs font-normal">Business phone number recommended.</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <AnimatePresence mode="wait">
                            {isEditingPhone && !updatePhone.isPending ? (
                                <motion.div
                                    key="phone-input"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                    className="lg:w-52 w-40"
                                >
                                    <Input
                                        type="text"
                                        value={tempPhone}
                                        onChange={(e) => setTempPhone(e.target.value)}
                                        className="h-9 text-sm font-normal text-main-900"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSavePhone();
                                            if (e.key === 'Escape') setIsEditingPhone(false);
                                        }}
                                    />
                                </motion.div>
                            ) : (
                                <motion.span
                                    key="phone-text"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-sub-600 font-normal text-sm"
                                >
                                    {updatePhone?.isPending ? (
                                        <div className="flex items-center gap-2 text-sub-600 font-normal text-sm">
                                            <Loader2 className="w-3 h-3 animate-spin text-sub-600" />
                                            Saving..
                                        </div>
                                    ) : data?.phone || "No phone number"}
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                            {isEditingPhone && !updatePhone.isPending ? (
                                <motion.div
                                    key="save-button"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 rounded-full border border-soft-200"
                                        onClick={handleSavePhone}
                                        disabled={updatePhone.isPending}
                                    >
                                        <Icons.check_icon />
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="edit-button"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    <Button
                                        variant="ghost"
                                        className="p-0 h-9 w-9 flex items-center justify-center"
                                        onClick={() => {
                                            setTempPhone(data?.phone || "");
                                            setIsEditingPhone(true);
                                        }}
                                    >
                                        <Icons.pencil />
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="border border-dashed w-full h-[1px] border-soft-200" />
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-strong-950 font-medium text-sm">Wechat</p>
                        <span className="text-sub-600 text-xs font-normal">Business phone number recommended.</span>
                    </div>
                    <span className="text-sub-600 font-normal text-sm">wec**at</span>
                    <Icons.pencil />
                </div>
                <div className="border border-dashed w-full h-[1px] border-soft-200" />
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-strong-950 font-medium text-sm">Change Password</p>
                        <span className="text-sub-600 text-xs font-normal">Update password for enhanced account security.</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <AnimatePresence mode="wait">
                            {isEditingPassword ? (
                                <motion.div
                                    key="password-input"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-48"
                                >
                                    <Input
                                        type="password"
                                        placeholder="New password"
                                        value={tempPassword}
                                        onChange={(e) => setTempPassword(e.target.value)}
                                        className="h-9 text-sm font-normal text-main-900"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSavePassword();
                                            if (e.key === 'Escape') setIsEditingPassword(false);
                                        }}
                                    />
                                </motion.div>
                            ) : (
                                <motion.span
                                    key="password-text"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-sub-600 font-normal text-sm"
                                >
                                    {updatePassword.isPending ? (
                                        <div className="flex items-center gap-2 text-sub-600 font-normal text-sm">
                                            <Loader2 className="w-3 h-3 animate-spin text-sub-600" />
                                            Saving..
                                        </div>
                                    ) : "••••••••"}
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                            {isEditingPassword ? (
                                <motion.div
                                    key="save-button"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 rounded-full border border-soft-200"
                                        onClick={handleSavePassword}
                                    >
                                        <Icons.check_icon />
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="edit-button"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    <Button
                                        variant="ghost"
                                        className="p-0 h-9 w-9 flex items-center justify-center"
                                        onClick={() => setIsEditingPassword(true)}
                                    >
                                        <Icons.pencil />
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="border border-dashed w-full h-[1px] border-soft-200" />
            </div>
        </div>
    )
}

export default Security;