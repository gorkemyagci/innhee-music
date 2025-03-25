"use client"
import { Icons } from "@/components/icons";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFilterContext } from "../sections/filter";
import { useTranslations } from "next-intl";

interface Tool {
    id: string;
    name: string;
    selected: boolean;
}

const FilterTools = () => {
    const t = useTranslations("filter.tools");
    const [allTools, setAllTools] = useState<Tool[]>([
        {
            id: "1",
            name: "Retrowave",
            selected: false
        },
        {
            id: "2",
            name: "Digital Painting",
            selected: true
        },
        {
            id: "3",
            name: "NFT",
            selected: false
        },
    ]);

    const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
    const { isFilterCleared } = useFilterContext();

    const handleSelectTool = (tool: Tool) => {
        if (!selectedTools.some(t => t.id === tool.id)) {
            setSelectedTools([...selectedTools, tool]);
        }
    };

    const handleRemoveTool = (toolId: string) => {
        setSelectedTools(selectedTools.filter(tool => tool.id !== toolId));
    };

    const handleClearAll = () => {
        setSelectedTools([]);
    };

    const availableTools = allTools.filter(
        tool => !selectedTools.some(t => t.id === tool.id)
    );

    // Initialize selected tools
    useEffect(() => {
        const initialSelectedTools = allTools.filter(tool => tool.selected);
        setSelectedTools(initialSelectedTools);
    }, []);

    // Listen for filter clear events
    useEffect(() => {
        if (isFilterCleared) {
            handleClearAll();
        }
    }, [isFilterCleared]);

    return (
        <div className="flex flex-col items-start gap-2">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <span className="text-strong-950 font-medium text-sm">{t("title")}</span>
                    <Icons.info />
                </div>
                <span
                    className="text-sub-600 font-medium text-xs border-b border-sub-600 cursor-pointer"
                    onClick={handleClearAll}
                >
                    {t("clear")}
                </span>
            </div>

            <div className="border border-soft-200 p-2.5 rounded-[10px] flex flex-wrap gap-2 w-full min-h-[60px]">
                <AnimatePresence>
                    {selectedTools.length > 0 ? (
                        selectedTools.map((tool) => (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center justify-center gap-0.5 pr-1 pl-2 h-6 rounded-md border border-sub-600 bg-white"
                            >
                                <span className="text-sub-600 text-xs font-medium">{tool.name}</span>
                                <button
                                    onClick={() => handleRemoveTool(tool.id)}
                                    className="flex items-center justify-center cursor-pointer"
                                >
                                    <Icons.close className="size-[14px] stroke-sub-600" />
                                </button>
                            </motion.div>
                        ))
                    ) : null}
                </AnimatePresence>
            </div>

            {availableTools.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    <AnimatePresence>
                        {availableTools.map((tool) => (
                            <motion.button
                                key={tool.id}
                                onClick={() => handleSelectTool(tool)}
                                className="px-2 h-6 bg-white flex cursor-pointer items-center justify-center hover:bg-weak-50 hover:border-weak-50 py-1 rounded-md border border-soft-200 text-sub-600 text-xs font-medium transition-colors"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                {tool.name}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default FilterTools;