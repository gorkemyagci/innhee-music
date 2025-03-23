"use client"
import { Icons } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    
    const items = [
        {
            question: "How do fixed-price contracts work?",
            answer: "Fermentum egestas at nunc tristique. Feugiat sodales viverra odio nisi non sem mauris. Nisi at purus habitant dictum etiam mi adipiscing. Congue at arcu aenean vitae aliquam eu tortor viverra id. Habitant sagittis faucibus pharetra odio fames rhoncus pellentesque sem est. Nunc ac eget tellus ultrices."
        },
        {
            question: "What is a Contract Initiation Fee?",
            answer: "Fermentum egestas at nunc tristique. Feugiat sodales viverra odio nisi non sem mauris. Nisi at purus habitant dictum etiam mi adipiscing. Congue at arcu aenean vitae aliquam eu tortor viverra id. Habitant sagittis faucibus pharetra odio fames rhoncus pellentesque sem est. Nunc ac eget tellus ultrices."
        }
    ];

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return <div className="w-full border border-soft-200 rounded-[12px] px-4">
        {items.map((item, index) => (
            <motion.div
                key={index}
                initial={false}
                className="flex flex-col border-b border-soft-200 py-4 gap-2 items-start"
            >
                <motion.div
                    className="flex items-center w-full justify-between cursor-pointer"
                    onClick={() => handleToggle(index)}
                >
                    <span className="text-strong-950 font-medium text-lg">{item.question}</span>
                    <AnimatePresence mode="wait">
                        {openIndex === index ? (
                            <motion.div
                                key="minus"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Icons.minus className="size-3 shrink-0" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="plus"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Icons.plus className="size-3 shrink-0" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                <AnimatePresence initial={false}>
                    {openIndex === index && (
                        <motion.span
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="text-sub-600 font-normal text-base -tracking-tight overflow-hidden"
                        >
                            {item.answer}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        ))}
    </div>
}

export default FAQ;