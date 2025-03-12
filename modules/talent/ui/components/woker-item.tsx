import { Icons } from "@/components/icons";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const WokerItem = ({ index }: { index: any }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div key={index} className="w-full">
            {/* Mobile view (collapsed/expanded with animation) */}
            <div className="md:hidden w-full">
                <div className="flex items-center justify-between w-full py-3">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Icons.play_pause className="flex-shrink-0 cursor-pointer" />
                            {expanded && (
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
                                />
                            )}
                        </div>
                        <div className="flex flex-col items-start gap-1">
                            <span className="text-main-900 font-medium text-sm">Funky Bounce Logo</span>
                            <span className="text-soft-400 font-medium text-xs">WORKER REMARKS TEXT</span>
                        </div>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1 h-auto rounded-full hover:bg-gray-100"
                        onClick={() => setExpanded(!expanded)}
                    >
                        <motion.div
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                        </motion.div>
                    </Button>
                </div>
                
                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ 
                                height: "auto", 
                                opacity: 1,
                                transition: {
                                    height: { duration: 0.3 },
                                    opacity: { duration: 0.2, delay: 0.1 }
                                }
                            }}
                            exit={{ 
                                height: 0, 
                                opacity: 0,
                                transition: {
                                    height: { duration: 0.3 },
                                    opacity: { duration: 0.2 }
                                }
                            }}
                            className="overflow-hidden"
                        >
                            <div className="py-3 px-2 mb-3 flex flex-col gap-4 bg-gray-50 rounded-lg">
                                <div className="flex flex-wrap items-center gap-1.5">
                                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs bg-white">
                                        Mixing
                                    </div>
                                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs bg-white">
                                        Singing
                                    </div>
                                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs bg-white">
                                        Jazz
                                    </div>
                                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs bg-white">
                                        Hip pop
                                    </div>
                                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs bg-white">
                                        K pop
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="flex items-center gap-1.5">
                                            <Icons.time_line className="size-3.5" />
                                            <span className="text-main-900 font-medium text-[15px]">0:22</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Icons.calendar_line className="size-3.5" />
                                            <span className="text-soft-400 font-medium text-[13px]">112 BPM</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Icons.save className="cursor-pointer" />
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-1.5">
                                    <Icons.profile_star className="size-3.5" />
                                    <span className="text-soft-400 font-medium text-xs">work / work history / evaluation</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Desktop view */}
            <div className="hidden md:flex w-full items-center justify-between py-4">
                <div className="flex items-center gap-2">
                    <Icons.play_pause className="flex-shrink-0 cursor-pointer" />
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-main-900 font-medium">Funky Bounce Logo</span>
                        <span className="text-soft-400 font-medium text-xs">WORKER REMARKS TEXT</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                        Mixing
                    </div>
                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                        Singing
                    </div>
                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                        Jazz
                    </div>
                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                        Hip pop
                    </div>
                    <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                        K pop
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-main-900 font-medium text-[15px]">0:22</span>
                        <span className="text-soft-400 font-medium text-[13px]">112 BPM</span>
                    </div>
                    <span className="text-soft-400 font-medium text-sm">work / work history / evaluation</span>
                    <Icons.save className="cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default WokerItem;