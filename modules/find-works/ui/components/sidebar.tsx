"use client"
import { Separator } from "@/components/ui/separator";
import Profile from "../sections/sidebar/profile";
import Menu from "../sections/sidebar/menu";
import Skills from "../sections/sidebar/skills";
import Tags from "../sections/sidebar/tags";
import About from "../sections/sidebar/about";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if we're on mobile when component mounts and when window resizes
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        // Initial check
        checkIfMobile();
        
        // Add event listener for window resize
        window.addEventListener("resize", checkIfMobile);
        
        // Cleanup
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    return (
        <>
            {/* Mobile toggle button - only visible on mobile */}
            <div className="lg:hidden fixed top-[70px] left-4 z-50">
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="rounded-full shadow-md"
                >
                    {isMobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
                </Button>
            </div>

            {/* Sidebar content */}
            <div 
                className={cn(
                    "border border-soft-200 pb-6 flex-[2] max-w-[300px] min-h-[calc(100vh-114px)] rounded-[20px] bg-white",
                    "transition-all duration-300 ease-in-out",
                    // Mobile styles
                    "lg:static lg:translate-x-0 lg:opacity-100 lg:pointer-events-auto",
                    isMobile && "fixed top-[60px] left-0 z-40",
                    isMobile && !isMobileOpen && "-translate-x-full opacity-0 pointer-events-none",
                    isMobile && isMobileOpen && "translate-x-0 opacity-100 pointer-events-auto shadow-xl"
                )}
            >
                <Profile />
                <Separator className="bg-soft-200" />
                <Menu />
                <Separator className="bg-soft-200" />
                <Skills />
                <Separator className="bg-soft-200" />
                <Tags />
                <Separator className="bg-soft-200" />
                <About />
            </div>

            {/* Overlay for mobile - only visible when sidebar is open on mobile */}
            {isMobile && isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 z-30 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;