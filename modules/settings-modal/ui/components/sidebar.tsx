import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            setIsLoading(false);
        };
        
        // Initial check
        checkIfMobile();

        window.addEventListener("resize", checkIfMobile);
        
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    const menuItems = [
        { label: "Profile", icon: <Icons.profile_circle className={cn(activeTab === "profile" && "stroke-strong-950")} />, tab: "profile" },
        { label: "Security", icon: <Icons.security_safe className={cn(activeTab === "security" && "stroke-strong-950")} />, tab: "security" },
        { label: "Kyc/Byc", icon: <Icons.settings className={cn(activeTab === "kyc" && "fill-strong-950")} />, tab: "kyc" },
        { label: "Notifications", icon: <Icons.notification_settings className={cn(activeTab === "notifications" && "stroke-strong-950")} />, tab: "notifications" },
        { label: "Company", icon: <Icons.building className={cn(activeTab === "company" && "stroke-strong-950")} />, tab: "company" },
        { label: "Orders", icon: <Icons.clock className={cn(activeTab === "orders" && "stroke-strong-950")} />, tab: "orders" },
        { label: "Billing", icon: <Icons.dollar_circle className={cn(activeTab === "billing" && "fill-strong-950")} />, tab: "billing" }
    ];

    if (isLoading) {
        return null;
    }

    return (
        <ul className={cn(
            "w-full custom-scroll",
            isMobile 
                ? "flex flex-row items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2" 
                : "flex flex-col items-start gap-1"
        )}>
            {menuItems.map((item, index) => (
                <li
                    onClick={() => setActiveTab(item.tab)}
                    key={index} 
                    className={cn(
                        "cursor-pointer rounded-lg hover:bg-weak-100 group flex items-center transition-all duration-200",
                        isMobile 
                            ? cn(
                                "flex-col justify-center min-w-[80px] h-[72px] p-2 gap-1",
                                activeTab === item.tab 
                                    ? "bg-weak-100 border-b-2 border-strong-950" 
                                    : "border-b-2 border-transparent"
                              )
                            : cn(
                                "p-2 h-9 w-full justify-between",
                                activeTab === item.tab && "bg-weak-100"
                              )
                    )}
                >
                    <div className={cn(
                        "flex items-center",
                        isMobile ? "flex-col gap-1" : "gap-1.5"
                    )}>
                        <div className={cn(
                            isMobile && "p-1.5 rounded-full",
                            isMobile && activeTab === item.tab && "bg-weak-200"
                        )}>
                            {item.icon}
                        </div>
                        <span className={cn(
                            "font-medium text-strong-950",
                            isMobile ? "text-xs text-center" : "text-sm"
                        )}>
                            {item.label}
                        </span>
                    </div>
                    {!isMobile && (
                        <span className={cn("group-hover:opacity-100 opacity-0 transition-all duration-200", activeTab === item.tab && "opacity-100")}>
                            <Icons.chevron_right />
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default Sidebar;