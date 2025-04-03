"use client"

import { Button } from "@/components/ui/button";
import Head from "../components/head";
import { Icons } from "@/components/icons";
import UserAvatar from "@/components/user-avatar";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { useAuthStore } from "@/store/auth-store";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
    nickname?: string;
    email?: string;
    [key: string]: any;
}

const Profile = () => {
    const { token, user } = useAuthStore();
    const [nickname, setNickname] = useState("Anonymous");
    const [webLink, setWebLink] = useState("");
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [isEditingWebLink, setIsEditingWebLink] = useState(false);
    const [tempNickname, setTempNickname] = useState(nickname);
    const [tempWebLink, setTempWebLink] = useState(webLink);
    const [profileImage, setProfileImage] = useState("/assets/images/profile.png");
    const [isUploading, setIsUploading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        useAuthStore.getState().initializeFromToken();
    }, []);
    const utils = trpc.useUtils();
    useEffect(() => {
        if (token) {
            try {
                const tokenValue = token.startsWith('Bearer ') ? token.substring(7) : token;
                const decoded = jwtDecode<DecodedToken>(tokenValue);
                if (decoded && decoded.nickname) {
                    setNickname(decoded.nickname);
                    setTempNickname(decoded.nickname);
                }
            } catch {}
        }
    }, [token]);

    const update = trpc.user.update.useMutation({
        onSuccess: (data) => {  
            toast.success("Profile updated successfully");
            const access_token = data.access_token;
            useAuthStore.getState().updateToken(access_token);
            utils.auth.getMe.invalidate();
        },
        onError: (error) => {
            toast.error("Failed to update profile");
        }
    });

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 640);
            setIsTablet(width >= 640 && width < 1024);
            setIsLoading(false);
        };

        checkScreenSize();

        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success(`${label} copied to clipboard`);
            })
            .catch(() => {
                toast.error("Failed to copy to clipboard");
            });
    };

    const handleSaveNickname = () => {
        update.mutate({ nickname: tempNickname });
        setNickname(tempNickname);
        setIsEditingNickname(false);
        toast.success("Nickname updated successfully");
    };

    const handleSaveWebLink = () => {
        setWebLink(tempWebLink);
        setIsEditingWebLink(false);
        toast.success("Web link updated successfully");
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error("Please select an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        setIsUploading(true);
        const reader = new FileReader();

        reader.onload = (event) => {
            setTimeout(() => {
                if (event.target?.result) {
                    setProfileImage(event.target.result as string);
                    setIsUploading(false);
                    toast.success("Profile photo updated successfully");
                }
            }, 1000);
        };

        reader.onerror = () => {
            setIsUploading(false);
            toast.error("Failed to read the image file");
        };

        reader.readAsDataURL(file);
    };

    if (isLoading) {
        return null;
    }

    return (
        <div className="w-full">
            <Head heading="Privacy & Security" subHeading="Personalize your privacy settings and enhance the security of your account." />
            <div className={cn(
                "w-full flex flex-col items-start",
                isMobile ? "px-4 pt-3 gap-4" : "px-6 pt-4 gap-6"
            )}>
                <div className={cn(
                    "flex items-center justify-between",
                    isMobile ? "w-full" : "w-1/2"
                )}>
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-main-900 text-sm font-medium">Apex ID</span>
                        <span className="text-sub-600 font-normal text-xs">A-12341234</span>
                    </div>
                    <Button
                        variant="outline"
                        className="border border-soft-200 w-8 h-8 rounded-lg p-1.5 flex items-center justify-center"
                        onClick={() => copyToClipboard("A-12341234", "Apex ID")}
                    >
                        <Icons.copy />
                    </Button>
                </div>

                <div className="border border-dashed w-full h-[1px] border-soft-200" />
                <div className={cn(
                    "flex items-center justify-between",
                    isMobile ? "w-full flex-col items-start gap-3" : isTablet ? "w-full" : "w-[65%]"
                )}>
                    <div className={cn(
                        "flex flex-col items-start gap-1",
                        isMobile && "mb-1"
                    )}>
                        <span className="text-main-900 text-sm font-medium">Profile Photo</span>
                        <span className="text-sub-600 font-normal text-xs">Min 400x400px, PNG or JPEG formats.</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative"
                        >
                            <AnimatePresence mode="wait">
                                {isUploading ? (
                                    <motion.div
                                        key="uploading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full"
                                    >
                                        <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
                            <UserAvatar
                                imageUrl={profileImage}
                                name="Avatar"
                                className="h-14 w-14 cursor-pointer"
                                onClick={handleUploadClick}
                            />
                        </motion.div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleFileChange}
                        />
                        <Button
                            variant="outline"
                            className="border border-soft-200 w-16 h-8 rounded-lg text-sm font-medium text-sub-600 p-1.5 flex items-center justify-center"
                            onClick={handleUploadClick}
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <div className="h-4 w-4 border-2 border-sub-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : "Upload"}
                        </Button>
                    </div>
                </div>

                <div className="border border-dashed w-full h-[1px] border-soft-200" />
                <div className={cn(
                    "flex w-full",
                    isMobile ? "flex-col gap-3" : "items-center justify-between"
                )}>
                    <div className={cn(
                        "flex flex-col items-start gap-1",
                        isMobile ? "w-full" : "w-1/3"
                    )}>
                        <span className="text-main-900 text-sm font-medium">Nicknames</span>
                        <span className="text-sub-600 font-normal text-xs">Your name will be visible to your contacts.</span>
                    </div>
                    <div className={cn(
                        "flex",
                        isMobile ? "w-full justify-between items-center" : "w-1/3 justify-start"
                    )}>
                        <AnimatePresence mode="wait">
                            {isEditingNickname ? (
                                <motion.div
                                    key="nickname-input"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                    className={cn(
                                        isMobile ? "w-[85%]" : "w-full"
                                    )}
                                >
                                    <Input
                                        type="text"
                                        value={tempNickname}
                                        onChange={(e) => setTempNickname(e.target.value)}
                                        className="h-9 text-sm font-normal text-main-900 w-full"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveNickname();
                                            if (e.key === 'Escape') setIsEditingNickname(false);
                                        }}
                                    />
                                </motion.div>
                            ) : (
                                <motion.span
                                    key="nickname-text"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-main-900 text-sm font-normal cursor-pointer"
                                    onClick={() => copyToClipboard(nickname, "Nickname")}
                                >
                                    {nickname}
                                </motion.span>
                            )}
                        </AnimatePresence>
                        {isMobile && !isEditingNickname && (
                            <motion.div
                                key="edit-button-mobile"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <Button
                                    variant="ghost"
                                    className="p-0 h-9 w-9 flex items-center justify-center"
                                    onClick={() => {
                                        setTempNickname(nickname);
                                        setIsEditingNickname(true);
                                    }}
                                >
                                    <Icons.pencil />
                                </Button>
                            </motion.div>
                        )}
                    </div>
                    {!isMobile && (
                        <div>
                            <AnimatePresence mode="wait">
                                {isEditingNickname ? (
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
                                            onClick={handleSaveNickname}
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
                                                setTempNickname(nickname);
                                                setIsEditingNickname(true);
                                            }}
                                        >
                                            <Icons.pencil />
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                    {isMobile && isEditingNickname && (
                        <motion.div
                            key="save-button-mobile"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full border border-soft-200"
                                onClick={handleSaveNickname}
                            >
                                <Icons.check_icon />
                            </Button>
                        </motion.div>
                    )}
                </div>
                <div className="border border-dashed w-full h-[1px] border-soft-200" />
                <div className={cn(
                    "flex w-full",
                    isMobile ? "flex-col gap-3" : "items-center justify-between"
                )}>
                    <div className={cn(
                        "flex flex-col items-start gap-1",
                        isMobile ? "w-full" : "w-1/3"
                    )}>
                        <span className="text-main-900 text-sm font-medium">Web Links</span>
                        <span className="text-sub-600 font-normal text-xs">Links for your company's website and social media accounts.</span>
                    </div>
                    <div className={cn(
                        "flex",
                        isMobile ? "w-full justify-between items-center" : "w-1/3 justify-start"
                    )}>
                        <AnimatePresence mode="wait">
                            {isEditingWebLink ? (
                                <motion.div
                                    key="weblink-input"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                    className={cn(
                                        isMobile ? "w-[85%]" : "w-full"
                                    )}
                                >
                                    <Input
                                        type="text"
                                        value={tempWebLink}
                                        onChange={(e) => setTempWebLink(e.target.value)}
                                        className="h-9 text-sm font-normal text-main-900 w-full"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveWebLink();
                                            if (e.key === 'Escape') setIsEditingWebLink(false);
                                        }}
                                    />
                                </motion.div>
                            ) : (
                                <motion.span
                                    key="weblink-text"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-main-900 text-sm font-normal cursor-pointer"
                                    onClick={() => copyToClipboard(webLink, "Web Link")}
                                >
                                    {webLink}
                                </motion.span>
                            )}
                        </AnimatePresence>
                        {isMobile && !isEditingWebLink && (
                            <motion.div
                                key="edit-button-mobile"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <Button
                                    variant="ghost"
                                    className="p-0 h-9 w-9 flex items-center justify-center"
                                    onClick={() => {
                                        setTempWebLink(webLink);
                                        setIsEditingWebLink(true);
                                    }}
                                >
                                    <Icons.pencil />
                                </Button>
                            </motion.div>
                        )}
                    </div>
                    {!isMobile && (
                        <div>
                            <AnimatePresence mode="wait">
                                {isEditingWebLink ? (
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
                                            onClick={handleSaveWebLink}
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
                                                setTempWebLink(webLink);
                                                setIsEditingWebLink(true);
                                            }}
                                        >
                                            <Icons.pencil />
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                    {isMobile && isEditingWebLink && (
                        <motion.div
                            key="save-button-mobile"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full border border-soft-200"
                                onClick={handleSaveWebLink}
                            >
                                <Icons.check_icon />
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile;