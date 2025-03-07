"use client"
import { Icons } from "@/components/icons";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFilterContext } from "../sections/filter";

interface Tag {
    id: string;
    name: string;
    selected: boolean;
}

const FeaturedTags = () => {
    const [tags, setTags] = useState<Tag[]>([
        {
            id: "1",
            name: "Digital Painting",
            selected: false
        },
        {
            id: "2",
            name: "Retrowave",
            selected: true
        },
        {
            id: "3",
            name: "Digital Painting",
            selected: false
        },
        {
            id: "4",
            name: "NFT",
            selected: false
        },
    ]);

    const { isFilterCleared } = useFilterContext();

    // Listen for filter clear events
    useEffect(() => {
        if (isFilterCleared) {
            handleClearAll();
        }
    }, [isFilterCleared]);

    const handleToggleTag = (tagId: string) => {
        setTags(tags.map(tag => 
            tag.id === tagId ? { ...tag, selected: !tag.selected } : tag
        ));
    };

    const handleClearAll = () => {
        setTags(tags.map(tag => ({ ...tag, selected: false })));
    };

    return (
        <div className="flex flex-col items-start gap-2">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <span className="text-strong-950 font-medium text-sm">Featured Tags</span>
                    <Icons.info />
                </div>
                <span
                    className="text-sub-600 font-medium text-xs border-b border-sub-600 cursor-pointer"
                    onClick={handleClearAll}
                >
                    Clear
                </span>
            </div>

            <div className="flex flex-wrap gap-2 w-full">
                {tags.map((tag) => (
                    <div
                        key={tag.id}
                        className={tag.selected 
                            ? "flex items-center justify-center gap-0.5 pr-1 pl-2 h-6 rounded-md border border-sub-600 bg-white"
                            : "px-2 h-6 bg-white flex cursor-pointer items-center justify-center hover:bg-weak-50 hover:border-weak-50 py-1 rounded-md border border-soft-200 text-sub-600 text-xs font-medium transition-colors"
                        }
                        onClick={!tag.selected ? () => handleToggleTag(tag.id) : undefined}
                    >
                        <div className="flex items-center gap-1.5">
                            <div className="flex items-center justify-center">
                                <Icons.tags />
                            </div>
                            <span className={tag.selected ? "text-strong-950 text-xs" : "text-sub-600 text-xs font-medium"}>
                                {tag.name}
                            </span>
                        </div>
                        {tag.selected && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleTag(tag.id);
                                }}
                                className="flex items-center cursor-pointer justify-center ml-1"
                            >
                                <Icons.close className="size-[14px] stroke-sub-600" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedTags;