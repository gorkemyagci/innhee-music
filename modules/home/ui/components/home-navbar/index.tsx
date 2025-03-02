import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { pageUrls } from "@/lib/constants/page-urls";
import Link from "next/link";
import SearchInput from "./search-input";

const navItems = [
    { label: "Find Works", href: "" },
    { label: "Find jobs", href: "" },
    { label: "Beats Market", href: "" },
    { label: "Referral", href: "" }
]

const HomeNavbar = () => {
    return <nav className="h-[4.5rem] w-full px-8">
        <div className="max-w-7xl w-full h-full flex items-center justify-between">
            <div className="flex items-center gap-12">
                <Link href={pageUrls.HOME} prefetch>
                    <Icons.logo />
                </Link>
                <ul className="flex items-center gap-4">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href} prefetch>
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