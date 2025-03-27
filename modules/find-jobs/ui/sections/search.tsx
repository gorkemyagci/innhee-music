"use client"
import SortSelect from "@/components/custom/form-elements/sort-select";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface SuggestedTag {
    id: string;
    name: string;
    selected: boolean;
}

const Search = () => {
    const [sort, setSort] = useState("");
    const t = useTranslations("header.search");
    const [suggestedTags, setSuggestedTags] = useState<SuggestedTag[]>([
        { id: "1", name: "All", selected: false },
        { id: "2", name: "Digital Art", selected: false },
        { id: "3", name: "NFT", selected: false },
        { id: "4", name: "Retrowave", selected: false },
    ]);

    const handleToggleTag = (tagId: string) => {
        setSuggestedTags(suggestedTags.map(tag => 
            tag.id === tagId ? { ...tag, selected: !tag.selected } : tag
        ));
    };

    return (
        <div className="flex flex-col items-start gap-3 w-full">
            <div className="flex items-center flex-1 justify-between gap-2 w-full">
                <div className="bg-white border border-[#E1E4EA] hover:border-weak-50 hover:bg-weak-50 transition-all duration-200 rounded-xl flex-1 h-10 flex items-center pl-3 pr-2.5 py-2.5">
                    <Icons.search />
                    <Input className="bg-transparent shadow-none border-none placeholder:text-[#99A0AE] focus-visible:ring-0 focus-visible:ring-offset-0" placeholder={t("placeholder")} />
                </div>
                <SortSelect value={sort} onChange={setSort} />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sub-600 font-normal text-xs">{t("suggested")}</span>
                <div className="flex items-center gap-1 flex-wrap">
                    {suggestedTags.map((tag) => (
                        <motion.div 
                            key={tag.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className={tag.selected 
                                ? "flex items-center justify-center gap-0.5 pr-1 pl-2 h-6 rounded-full border border-sub-600 bg-white"
                                : "px-2 h-6 bg-white flex gap-1 cursor-pointer items-center justify-center hover:bg-weak-50 hover:border-weak-50 py-1 rounded-full border border-soft-200 text-sub-600 text-xs font-medium transition-colors"
                            }
                            onClick={!tag.selected ? () => handleToggleTag(tag.id) : undefined}
                        >
                            <motion.span 
                                layout="position"
                                className={tag.selected ? "text-strong-950 text-xs" : "text-sub-600 text-xs font-medium"}
                            >
                                {tag.name}
                            </motion.span>
                            <AnimatePresence mode="popLayout">
                                {!tag.selected && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <Icons.plus className="size-2.5 fill-soft-400" />
                                    </motion.div>
                                )}
                                {tag.selected && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 0.15 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleTag(tag.id);
                                        }}
                                        className="flex items-center cursor-pointer justify-center ml-1"
                                    >
                                        <Icons.close className="size-[14px] stroke-sub-600" />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;