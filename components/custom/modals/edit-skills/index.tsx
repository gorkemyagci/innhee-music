"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/trpc/client";
import { useTranslations } from "next-intl";

interface Skill {
    id: string;
    name: string;
}

interface EditSkillsProps {
    children: React.ReactNode;
    initialTags?: Skill[];
    onSave?: (skills: Skill[]) => void;
}

const EditSkills = ({ children, initialTags = [], onSave }: EditSkillsProps) => {
    const t = useTranslations("modals.editSkills");
    const { data: skills } = trpc.jobPosting.getSkills.useQuery();    
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>(initialTags);
    const commandRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const availableSkills: Skill[] = skills && Array.isArray(skills) 
        ? skills.map(skill => ({
            id: skill.id,
            name: skill.name
        }))
        : [];
    
    const filteredSkills = availableSkills.filter(skill => 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedSkills.some(selectedSkill => selectedSkill.id === skill.id)
    );
    
    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setIsSearching(value.length > 0);
    };
    
    const handleFocus = () => {
        setIsFocused(true);
    };
    
    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 200);
    };
    
    const addSkill = (skill: Skill) => {
        if (!selectedSkills.some(t => t.id === skill.id)) {
            setSelectedSkills([...selectedSkills, skill]);
            setSearchQuery("");
            setIsSearching(false);
        }
    };
    
    const removeSkill = (skillId: string) => {
        setSelectedSkills(selectedSkills.filter(skill => skill.id !== skillId));
    };
    
    const handleSave = () => {
        if (onSave) {
            onSave(selectedSkills);
        }
    };
    
    const shouldShowList = (isFocused && searchQuery === "") || isSearching;
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0 bg-white border-soft-200 rounded-3xl">
                <DialogHeader className="p-4 flex items-start border-b border-soft-200 justify-between w-full">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-soft-200 flex items-center justify-center bg-white">
                            <Icons.settings />
                        </div>
                        <div className="flex flex-col gap-1">
                            <DialogTitle><span className="text-main-900 font-medium text-sm">{t("title")}</span></DialogTitle>
                            <span className="text-sub-600 font-normal text-xs">{t("subtitle")}</span>
                        </div>
                    </div>
                </DialogHeader>
                <div className="px-4 pb-4 flex flex-col gap-1">
                    <div className="flex items-center gap-0.5 pb-1.5">
                        <span className="text-strong-950 font-medium text-sm">{t("addSkills")}</span>
                        <Icons.info />
                    </div>
                    <div ref={commandRef} className="relative">
                        <Command className="rounded-lg border border-soft-200">
                            <div className="flex items-center">
                                <CommandInput
                                    placeholder={t("search.placeholder")}
                                    className="flex-1 outline-none border-0 focus:ring-0 focus-visible:ring-0 placeholder:text-soft-400"
                                    value={searchQuery}
                                    onValueChange={handleSearch}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    autoFocus={false}
                                />
                            </div>
                        </Command>
                        
                        <AnimatePresence>
                            {shouldShowList && (
                                <motion.div 
                                    className="absolute z-50 w-full bg-white border border-soft-200 rounded-lg mt-1 shadow-lg max-h-[300px] overflow-auto"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Command className="border-0">
                                        <CommandList className="max-h-none">
                                            {filteredSkills.length === 0 ? (
                                                <CommandEmpty>{t("search.noResults")}</CommandEmpty>
                                            ) : (
                                                <CommandGroup heading={searchQuery ? t("search.searchResults") : t("search.allSkills")}>
                                                    {filteredSkills.map((skill) => (
                                                        <CommandItem 
                                                            key={skill.id} 
                                                            onSelect={() => addSkill(skill)}
                                                            className="cursor-pointer hover:bg-weak-50"
                                                        >
                                                            {skill.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            )}
                                        </CommandList>
                                    </Command>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    
                    {selectedSkills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {selectedSkills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-weak-50 hover:border-weak-50 transition-all duration-200 bg-white border border-soft-200"
                                >
                                    <span className="text-sub-600 text-xs">{skill.name}</span>
                                    <button 
                                        onClick={() => removeSkill(skill.id)}
                                        className="focus:outline-none"
                                    >
                                        <Icons.close className="h-3 w-3 text-sub-600 cursor-pointer" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-3 mt-5 w-full">
                        <DialogClose asChild>
                            <Button variant="outline" className="border-soft-200 flex-1 h-9 rounded-lg text-sub-600 font-medium text-sm">{t("buttons.cancel")}</Button>
                        </DialogClose>
                        <Button onClick={handleSave} className="h-9 rounded-lg text-white flex-1 font-medium text-sm bg-neutral-950">{t("buttons.save")}</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditSkills;