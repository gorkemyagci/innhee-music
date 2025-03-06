"use client"
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { pageUrls } from "@/lib/constants/page-urls";
import Link from "next/link";
import SearchInput from "./search-input";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AuthedNavbar from "./authed-navbar";

const HomeNavbarModule = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const navItems = [
        { label: "Find Works", icon: <Icons.layout_grid className={cn("size-5", pathname === "/find-works" ? "fill-[#335CFF]" : "fill-sub-600")} />, href: "/find-works" },
        { label: "Find jobs", icon: <Icons.calendar_line className={cn("size-5", pathname === "/find-jobs" ? "fill-[#335CFF]" : "fill-sub-600")} />, href: "/find-jobs" },
        { label: "Beats Market", icon: <Icons.timer className={cn("size-5", pathname === "/beats-market" ? "fill-[#335CFF]" : "fill-sub-600")} />, href: "/beats-market" },
        { label: "Referral", icon: <Icons.folders className={cn("size-5", pathname === "/referral" ? "fill-[#335CFF]" : "fill-sub-600")} />, href: "/referral" }
    ]

    const closeMenu = () => setIsMobileMenuOpen(false);



    const NavbarContent = () => (
        <div className="max-w-[1440px] mx-auto w-full h-full flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-5">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="scale-90 sm:scale-100"
                >
                    <Link href={pageUrls.HOME} prefetch>
                        <Icons.logo />
                    </Link>
                </motion.div>
                <ul className="hidden lg:flex items-center gap-0">
                    {navItems.map((item, index) => (
                        <motion.li
                            key={index}
                            className={cn("py-2 px-3",
                                pathname === item.href && "bg-weak-50 rounded-lg"
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href={item.href} prefetch className="flex items-center gap-1.5">
                                {item.icon}
                                <span className="text-black font-medium tracking-tight">{item.label}</span>
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-7">
                <div className="hidden lg:block">
                    <SearchInput />
                </div>
                {!isAuthenticated ? (
                    <>
                        <motion.span
                            className="cursor-pointer hidden sm:block"
                        >
                            <Icons.sunline />
                        </motion.span>
                        <div className="hidden lg:flex items-center gap-4">
                            <Link href={pageUrls.SIGN_IN} prefetch>
                                <motion.span
                                    className="text-black font-medium tracking-tight cursor-pointer"
                                >
                                    Login
                                </motion.span>
                            </Link>
                            <Link href={pageUrls.SIGN_UP} prefetch>
                                <motion.div
                                >
                                    <Button className="rounded-xl w-[101px] h-[40px] bg-[#20232D]">
                                        Get Started
                                    </Button>
                                </motion.div>
                            </Link>
                        </div>
                    </>
                ) : (
                    <AuthedNavbar />
                )}
                <motion.button
                    className="lg:hidden text-gray-800"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    whileTap={{ scale: 0.9 }}
                >
                    {isMobileMenuOpen ? (
                        <Icons.close className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                        <Icons.menu className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                </motion.button>
            </div>
        </div>
    );
    return (
        <>
            <div className="h-[4.5rem] w-full" />
            <div className="fixed top-0 left-0 right-0 w-full z-30">
                {isMobile ? (
                    <motion.nav
                        className={cn("h-[4.5rem] w-full bg-white",
                            pathname !== "/" && "border-b border-soft-200"
                        )}
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                        <div className="h-full w-full max-w-[100vw] px-2 sm:px-4 lg:px-8">
                            <NavbarContent />
                        </div>
                    </motion.nav>
                ) : (
                    <nav className={cn("h-[4.5rem] w-full bg-white",
                        pathname !== "/" && "border-b border-soft-200"
                    )}>
                        <div className="h-full w-full max-w-[100vw] px-2 sm:px-4 lg:px-8">
                            <NavbarContent />
                        </div>
                    </nav>
                )}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-full h-[calc(100vh-4.5rem)] bg-white lg:hidden overflow-y-auto"
                        >
                            <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
                                <div className="w-full">
                                    <SearchInput />
                                </div>
                                <ul className="flex flex-col gap-3 sm:gap-4">
                                    {navItems.map((item, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                transition: { delay: index * 0.1 }
                                            }}
                                            className={cn("py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg",
                                                pathname === item.href && "bg-weak-50"
                                            )}
                                        >
                                            <Link href={item.href} prefetch className="flex items-center gap-2 sm:gap-3" onClick={closeMenu}>
                                                {item.icon}
                                                <span className="text-sm sm:text-base text-black font-medium tracking-tight">{item.label}</span>
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                                <div className="flex flex-col gap-3 sm:gap-4 mt-2 sm:mt-4">
                                    <Link href={pageUrls.SIGN_IN} prefetch onClick={closeMenu}>
                                        <motion.div
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full h-9 sm:h-10 flex items-center justify-center px-3 sm:px-4 text-center text-sm sm:text-base text-black font-medium tracking-tight rounded-lg border border-gray-200"
                                        >
                                            Login
                                        </motion.div>
                                    </Link>
                                    <Link href={pageUrls.SIGN_UP} prefetch onClick={closeMenu}>
                                        <motion.div
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full"
                                        >
                                            <Button className="w-full flex items-center justify-center px-3 sm:px-4 h-9 sm:h-10 text-sm sm:text-base rounded-xl bg-[#20232D]">
                                                Get Started
                                            </Button>
                                        </motion.div>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

export default HomeNavbarModule;