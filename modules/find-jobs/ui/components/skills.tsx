"use client"
import { Icons } from "@/components/icons";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFilterContext } from "../sections/filter";

interface Skill {
    id: string;
    name: string;
    selected: boolean;
}

const FilterSkills = () => {
    const [allSkills, setAllSkills] = useState<Skill[]>([
        {
            id: "1",
            name: "Retrowave",
            selected: true
        },
        {
            id: "2",
            name: "Digital Painting",
            selected: false
        },
        {
            id: "3",
            name: "NFT",
            selected: false
        },
        {
            id: "4",
            name: "NFT",
            selected: true
        },
        
    ]);

    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
    const { isFilterCleared } = useFilterContext();

    // Initialize selected skills based on the 'selected' property
    useEffect(() => {
        const initialSelectedSkills = allSkills.filter(skill => skill.selected);
        setSelectedSkills(initialSelectedSkills);
    }, []);

    // Listen for filter clear events
    useEffect(() => {
        if (isFilterCleared) {
            handleClearAll();
        }
    }, [isFilterCleared]);

    const handleSelectSkill = (skill: Skill) => {
        if (!selectedSkills.some(s => s.id === skill.id)) {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const handleRemoveSkill = (skillId: string) => {
        setSelectedSkills(selectedSkills.filter(skill => skill.id !== skillId));
    };

    const handleClearAll = () => {
        setSelectedSkills([]);
    };

    const availableSkills = allSkills.filter(
        skill => !selectedSkills.some(s => s.id === skill.id)
    );

    return (
        <div className="flex flex-col items-start gap-2">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <span className="text-strong-950 font-medium text-sm">Skills</span>
                    <Icons.info />
                </div>
                <span
                    className="text-sub-600 font-medium text-xs border-b border-sub-600 cursor-pointer"
                    onClick={handleClearAll}
                >
                    Clear
                </span>
            </div>

            <div className="border border-soft-200 p-2.5 rounded-[10px] flex flex-wrap gap-2 w-full min-h-[60px]">
                <AnimatePresence>
                    {selectedSkills.length > 0 ? (
                        selectedSkills.map((skill) => (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center justify-center gap-0.5 pr-1 pl-2 h-6 rounded-md border border-sub-600 bg-white"
                            >
                                <span className="text-sub-600 text-xs font-medium">{skill.name}</span>
                                <button
                                    onClick={() => handleRemoveSkill(skill.id)}
                                    className="flex items-center justify-center cursor-pointer"
                                >
                                    <Icons.close className="size-[14px] stroke-sub-600" />
                                </button>
                            </motion.div>
                        ))
                    ) : null}
                </AnimatePresence>
            </div>

            {availableSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    <AnimatePresence>
                        {availableSkills.map((skill) => (
                            <motion.button
                                key={skill.id}
                                onClick={() => handleSelectSkill(skill)}
                                className="px-2 h-6 bg-white flex cursor-pointer items-center justify-center hover:bg-weak-50 hover:border-weak-50 py-1 rounded-md border border-soft-200 text-sub-600 text-xs font-medium transition-colors"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                {skill.name}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default FilterSkills;