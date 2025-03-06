import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
    const menuItems = [
        { label: "Profile", icon: <Icons.profile_circle className={cn(activeTab === "profile" && "stroke-strong-950")} />, tab: "profile" },
        { label: "Security", icon: <Icons.security_safe className={cn(activeTab === "security" && "stroke-strong-950")} />, tab: "security" },
        { label: "Kyc/Byc", icon: <Icons.settings className={cn(activeTab === "kyc" && "fill-strong-950")} />, tab: "kyc" },
        { label: "Notifications", icon: <Icons.notification_settings className={cn(activeTab === "notifications" && "stroke-strong-950")} />, tab: "notifications" },
        { label: "Company", icon: <Icons.building className={cn(activeTab === "company" && "stroke-strong-950")} />, tab: "company" },
        { label: "Orders", icon: <Icons.clock className={cn(activeTab === "orders" && "stroke-strong-950")} />, tab: "orders" },
        { label: "Billing", icon: <Icons.dollar_circle className={cn(activeTab === "billing" && "fill-strong-950")} />, tab: "billing" }
    ]
    return (
        <ul className="w-full flex flex-col items-start gap-1">
            {menuItems.map((item, index) => (
                <li
                    onClick={() => setActiveTab(item.tab)}
                    key={index} className={cn("p-2 h-9 w-full cursor-pointer rounded-lg hover:bg-weak-100 group flex items-center justify-between", activeTab === item.tab && "bg-weak-100")}>
                    <div className="flex items-center gap-1.5">
                        {item.icon}
                        <span className="font-medium text-sm text-strong-950">{item.label}</span>
                    </div>
                    <span className={cn("group-hover:opacity-100 opacity-0 transition-all duration-200", activeTab === item.tab && "opacity-100")}>
                        <Icons.chevron_right />
                    </span>
                </li>
            ))}
        </ul>
    )
}

export default Sidebar;