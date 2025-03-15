import { Separator } from "@/components/ui/separator";
import WokerItem from "../components/woker-item";
import { useState } from "react";
import CustomPagination from "@/components/pagination";
import { motion, AnimatePresence } from "framer-motion";

interface WokerProps {
    portfolio: any;
}

const Woker = ({ portfolio }: WokerProps) => {
    const filteredItems = portfolio?.portfolioItems?.filter((item: any) => 
        item.attachments && item.attachments.length > 0
    ) || [];

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [direction, setDirection] = useState(0);
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    
    const handlePageChange = (pageNumber: number) => {
        setDirection(pageNumber > currentPage ? 1 : -1);
        setCurrentPage(pageNumber);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
        }),
    };

    const transition = {
        type: "spring",
        stiffness: 300,
        damping: 30,
    };

    return (
        <div className="w-full flex flex-col items-start gap-2">
            {filteredItems.length > 0 ? (
                <>
                    <div className="w-full relative overflow-hidden">
                        <AnimatePresence initial={false} mode="wait" custom={direction}>
                            <motion.div
                                key={currentPage}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={transition}
                                className="w-full"
                            >
                                {currentItems.map((item: any, index: number) => (
                                    <div key={item.id} className="w-full">
                                        <WokerItem index={indexOfFirstItem + index} item={item} />
                                        {index < currentItems.length - 1 && (
                                            <Separator className="bg-soft-200 w-full" />
                                        )}
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <CustomPagination 
                        totalItems={filteredItems.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : (
                <div className="w-full text-center py-8 text-soft-400">
                    No portfolio items with attachments found.
                </div>
            )}
        </div>
    )
}

export default Woker;