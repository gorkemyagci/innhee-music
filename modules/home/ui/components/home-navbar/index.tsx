"use client"
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { pageUrls } from "@/lib/constants/page-urls";
import Link from "next/link";
import SearchInput from "./search-input";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const HomeNavbar = () => {
    const pathname = usePathname();
    const navItems = [
        { label: "Find Works", icon: <Icons.layout_grid className={cn("size-5", pathname === "/find-works" ? "fill-[#335CFF]" : "fill-sub-600")} />, href: "/find-works" },
        { label: "Find jobs", icon: <Icons.calendar_line className={cn("size-5", pathname === "/find-jobs" ? "fill-[#335CFF]" : "fill-sub-600")} />, href: "/find-jobs" },
        { label: "Beats Market", icon: <Icons.timer className={cn("size-5", pathname === "/beats-market" ? "fill-[#335CFF]" : "fill-sub-600")} />, href: "/beats-market" },
        { label: "Referral", icon: <Icons.folders className={cn("size-5", pathname === "/referral" ? "fill-[#335CFF]" : "fill-sub-600")} />, href: "/referral" }
    ]
    return <nav className="h-[4.5rem] w-full px-8">
        <div className="max-w-7xl w-full h-full flex items-center justify-between">
            <div className="flex items-center gap-5">
                <Link href={pageUrls.HOME} prefetch>
                    <Icons.logo />
                </Link>
                <ul className="flex items-center gap-0">
                    {navItems.map((item, index) => (
                        <li key={index} className={cn("py-2 px-3",
                            pathname === item.href && "bg-weak-50 rounded-lg"
                        )}>
                            <Link href={item.href} prefetch className="flex items-center gap-1.5">
                                {item.icon}
                                <span className="text-black font-medium tracking-tight">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center gap-7">
                <SearchInput />
                <span>
                    <Icons.sunline />
                </span>
                <Link href={pageUrls.SIGN_IN} prefetch>
                    <span className="text-black font-medium tracking-tight">Login</span>
                </Link>
                <Link href={pageUrls.SIGN_UP} prefetch>
                    <Button className="rounded-xl w-[101px] h-[40px] bg-[#20232D]">
                        Get Started
                    </Button>
                </Link>
            </div>
        </div>
    </nav>
}

export default HomeNavbar;