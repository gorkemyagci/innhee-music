"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/store/auth-store"
import { pageUrls } from "@/lib/constants/page-urls"
import SettingsModal from "@/components/custom/modals/settings"
import { useRouter } from "next/navigation"

const ProfileDropdown = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    const handleLogout = () => {
        useAuthStore.getState().logout();
        typeof window !== "undefined" && window.location.replace("/");
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 mt-4 py-2 border-none rounded-2xl z-50" align="end">
                    <div className="p-2 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <span className="absolute -top-1 -right-1 size-5 z-10">
                                    <Icons.top_rated />
                                </span>
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="/assets/images/profile.png" alt="Emma Wright" />
                                    <AvatarFallback>EW</AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <h3 className="font-medium text-sm text-strong-950">Emma Wright</h3>
                                <div className="flex items-center gap-3">
                                    <p className="text-xs text-sub-600">ID: 1235984</p>
                                    <Icons.copy className="cursor-pointer" onClick={() => copyToClipboard("1235984")} />
                                    {isCopied && (
                                        <Button variant="outline" size="sm" className="h-5 px-1 font-medium text-sub-600 text-xs bg-white rounded-md border border-soft-200 hover:bg-gray-50">
                                            <Icons.select_box_circle />
                                            Copied
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="flex items-center justify-between px-4 py-2 hover:bg-gray-50"
                            onSelect={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <motion.div className="text-gray-600">
                                    <Icons.moon />
                                </motion.div>
                                <span className="text-sm text-gray-700">Dark Mode</span>
                            </div>
                            <Switch
                                checked={isDarkMode}
                                className="cursor-pointer"
                                onCheckedChange={setIsDarkMode}
                            />
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center gap-3 px-4 py-2" onClick={() => setIsSettingsModalOpen(true)}>
                            <Icons.user_settings />
                            <span className="text-sm font-normal text-strong-950">Account Settings</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center gap-3 px-4 py-2">
                            <Icons.layout_grid />
                            <span className="text-sm font-normal text-strong-950">Integrations</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => router.push("/settings")}
                            className="flex items-center gap-3 px-4 py-2">
                            <Icons.settings />
                            <span className="text-sm font-normal text-strong-950">Settings</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuLabel className="px-4 py-2">
                        <p className="text-xs font-medium text-soft-400">SUPPORT</p>
                    </DropdownMenuLabel>

                    <DropdownMenuGroup>
                        <DropdownMenuItem className="flex items-center gap-3 px-4 py-2">
                            <Icons.file />
                            <span className="text-sm font-normal text-strong-950">Guide</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center gap-3 px-4 py-2">
                            <Icons.question_answer />
                            <span className="text-sm font-normal text-strong-950">Help Center</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <div className="px-4 py-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-strong-950 font-medium">Balance</p>
                                <p className="text-xs font-normal text-sub-600">$12,000.05</p>
                            </div>
                            <p className="text-sub-600 font-medium text-sm">
                                Top up
                            </p>
                        </div>
                    </div>

                    <DropdownMenuItem className="flex cursor-pointer items-center gap-3 px-4 py-2" onClick={handleLogout}>
                        <Icons.logout />
                        <span className="text-sm font-normal text-strong-950">Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <SettingsModal open={isSettingsModalOpen} setOpen={setIsSettingsModalOpen} />
        </>
    )
}

export default ProfileDropdown