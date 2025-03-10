import { Icons } from "@/components/icons";
import Link from "next/link";

const Menu = () => {
    const menuItems = [
        { label: "My Home", icon: <Icons.home_line className="fill-current" />, href: "#" },
        { label: "Order", icon: <Icons.briefcase_line className="fill-current" />, href: "/settings/orders" },
        { label: "Chat", icon: <Icons.building className="stroke-current" />, href: "#" },
        { label: "Collection", icon: <Icons.article_line className="fill-current" />, href: "#" },
    ]
    return (
        <div className="p-4 flex flex-col items-start gap-1">
            {menuItems.map((item, index) => (
                <Link href={item.href} key={index} prefetch className="w-full">
                    <div key={index} className="py-2 px-3 w-full cursor-pointer transition-all duration-200 hover:bg-weak-100 group flex items-center gap-2 rounded-lg">
                        <span className="group-hover:text-strong-950 text-[#525866] transition-all duration-200">
                            {item.icon}
                        </span>
                        <span className="text-sub-600 group-hover:text-strong-950 font-medium text-sm">{item.label}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Menu;