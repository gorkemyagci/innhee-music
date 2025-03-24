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
import { useTranslations } from "next-intl";
import LanguageSelector from "./language-selector";

const HomeNavbarModule = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const t = useTranslations();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const navItems = [
        { label: t("header.navigation.findWorker"), href: pageUrls.DASHBOARD },
        { label: t("header.navigation.findProjects"), href: pageUrls.FIND_JOBS },
        { label: t("header.navigation.findServices"), href: pageUrls.BEATS_MARKET },
        { label: t("header.navigation.bonus"), href: pageUrls.REFERRAL }
    ];

    const closeMenu = () => setIsMobileMenuOpen(false);

    const NavbarContent = () => (
        <div className="max-w-[1440px] mx-auto w-full h-full flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-5">
                <motion.div>
                    <Link href={pageUrls.HOME} prefetch>
                        <Icons.logo />
                    </Link>
                </motion.div>
                <ul className="hidden lg:flex items-center gap-1">
                    {navItems.map((item, index) => (
                        <motion.li
                            key={index}
                            className={cn("pr-3 pl-2 py-2 hover:bg-weak-50 transition-all duration-200 rounded-lg"
                            )}
                        >
                            <Link href={item.href} prefetch className="flex items-center gap-1.5">
                                <span className="text-strong-950 text-sm font-normal tracking-tight">{item.label}</span>
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-7">
                <div className="hidden lg:block">
                    <SearchInput />
                </div>
                <LanguageSelector />
                <Icons.sunline />
                {!isAuthenticated ? (
                    <Link href={pageUrls.SIGN_IN} prefetch>
                        <Button
                            type="button"
                            className={cn("w-full h-10 disabled:cursor-auto group rounded-[10px] text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]")}>
                            <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                            {t("header.buttons.freeStart")}
                        </Button>
                    </Link>
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
            <div className="fixed top-0 left-0 right-0 w-full z-50">
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
                                                <span className="text-sm sm:text-base text-black font-medium tracking-tight">{item.label}</span>
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

export default HomeNavbarModule;