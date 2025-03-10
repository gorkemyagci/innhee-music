"use client"

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LayoutSidebar = () => {
    const pathname = usePathname();
    const menuItems = [
        { label: "Profile", icon: <Icons.profile_circle className={cn(pathname.includes("profile") && "stroke-strong-950")} />, href: "/settings" },
        { label: "Security", icon: <Icons.security_safe className={cn(pathname.includes("security") && "stroke-strong-950")} />, href: "/settings/security" },
        { label: "Kyc/Byc", icon: <Icons.settings className={cn(pathname.includes("kyc") && "fill-strong-950")} />, href: "/settings/kyc" },
        { label: "Notifications", icon: <Icons.notification_settings className={cn(pathname.includes("notifications") && "stroke-strong-950")} />, href: "/settings/notifications" },
        { label: "Company", icon: <Icons.building className={cn(pathname.includes("company") && "stroke-strong-950")} />, href: "/settings/company" },
        { label: "Orders", icon: <Icons.clock className={cn(pathname.includes("orders") && "stroke-strong-950")} />, href: "/settings/orders" },
        { label: "Billing", icon: <Icons.dollar_circle className={cn(pathname.includes("billing") && "fill-strong-950")} />, href: "/settings/billing" }
    ];
    return (
        <div className="flex flex-col gap-2 custom-scroll p-6 w-[240px] shrink-0 border-r border-soft-200 items-start min-h-[calc(100vh-75px)]">
            <span className="text-[#868C98] text-xs font-medium">SETTINGS</span>
            <ul className="w-full flex flex-col gap-1">
                {menuItems.map((item, index) => (
                    <Link href={item.href}>
                        <li
                            key={index}
                            className={cn("cursor-pointer rounded-lg hover:bg-weak-100 group flex items-center transition-all duration-200 p-2 h-9 w-full justify-between", pathname === item.href && "bg-weak-100")}
                        >
                            <div className="flex items-center gap-1.5">
                                <div>
                                    {item.icon}
                                </div>
                                <span className={cn("font-medium text-sub-600 text-sm", pathname === item.href && "text-strong-950")}>
                                    {item.label}
                                </span>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default LayoutSidebar;