"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Settings, UserCog, Grid3X3, FileText, HelpCircle, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const ProfileDropdown = ({ isOpen }: { isOpen: boolean }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const menuItems = [
        {
            type: "profile",
            name: "Emma Wright",
            id: "1235984",
            avatar: "/path-to-avatar.jpg" // Replace with actual avatar path
        },
        {
            type: "switch",
            label: "Dark Mode",
            icon: <motion.div className="text-gray-600"><Settings size={18} /></motion.div>
        },
        {
            type: "link",
            label: "Account Settings",
            icon: <UserCog size={18} className="text-gray-600" />
        },
        {
            type: "link",
            label: "Integrations",
            icon: <Grid3X3 size={18} className="text-gray-600" />
        },
        {
            type: "link",
            label: "Settings",
            icon: <Settings size={18} className="text-gray-600" />
        },
        {
            type: "section",
            label: "SUPPORT"
        },
        {
            type: "link",
            label: "Guide",
            icon: <FileText size={18} className="text-gray-600" />
        },
        {
            type: "link",
            label: "Help Center",
            icon: <HelpCircle size={18} className="text-gray-600" />
        },
        {
            type: "balance",
            balance: "12,000.05",
            label: "Balance",
            action: "Top up"
        },
        {
            type: "link",
            label: "Logout",
            icon: <LogOut size={18} className="text-gray-600" />
        }
    ]

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-4"
                >
                    <div className="space-y-2">
                        {menuItems.map((item, index) => {
                            if (item.type === "profile") {
                                return (
                                    <div key={index} className="px-4 pb-4 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={item.avatar} />
                                                <AvatarFallback>EW</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm text-gray-500">ID: {item.id}</p>
                                                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs bg-gray-50 hover:bg-gray-100">
                                                        <FileText size={12} className="mr-1" />
                                                        Copy
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            if (item.type === "switch") {
                                return (
                                    <div key={index} className="px-4 py-2 flex items-center justify-between hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            {item.icon}
                                            <span className="text-sm text-gray-700">{item.label}</span>
                                        </div>
                                        <Switch
                                            checked={isDarkMode}
                                            onCheckedChange={setIsDarkMode}
                                        />
                                    </div>
                                )
                            }

                            if (item.type === "section") {
                                return (
                                    <div key={index} className="px-4 pt-4 pb-2">
                                        <p className="text-xs font-medium text-gray-400">{item.label}</p>
                                    </div>
                                )
                            }

                            if (item.type === "balance") {
                                return (
                                    <div key={index} className="px-4 py-3 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-500">{item.label}</p>
                                                <p className="text-lg font-semibold">${item.balance}</p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                {item.action}
                                            </Button>
                                        </div>
                                    </div>
                                )
                            }

                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                                    className="px-4 py-2 flex items-center gap-3 cursor-pointer"
                                >
                                    {item.icon}
                                    <span className="text-sm text-gray-700">{item.label}</span>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ProfileDropdown