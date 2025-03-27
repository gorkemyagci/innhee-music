"use client"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import UserAvatar from "@/components/user-avatar";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import CustomSelect from "@/components/custom/select";
import { trpc } from "@/trpc/client";
import { SkillLevel } from "@/lib/types";
import { useTranslations } from "next-intl";

interface JobDetailsProps {
    form: UseFormReturn<any>;
}

const mockUsers = [
    { id: 1, name: "Cleve Music", imageUrl: "/assets/images/avatar-4-1.png" },
    { id: 2, name: "John Smith", imageUrl: "/assets/images/avatar-4-1.png" },
    { id: 3, name: "Emma Wilson", imageUrl: "/assets/images/avatar-4-1.png" },
    { id: 4, name: "Michael Brown", imageUrl: "/assets/images/avatar-4-1.png" },
    { id: 5, name: "Sarah Davis", imageUrl: "/assets/images/avatar-4-1.png" },
];

const JobDetails = ({ form }: JobDetailsProps) => {
    const t = useTranslations("sendOrder.jobDetails");
    const { data: skillsData } = trpc.jobPosting.getAllSkillLevels.useQuery();
    const [skillLevels, setSkillLevels] = useState<SkillLevel[]>([]);
    const { control, setValue, watch } = form;
    const skillLevelsForm = watch("skillLevels") || [];
    const [sendValue, setSendValue] = useState("");
    const [textareaValue, setTextareaValue] = useState("");
    const skillLevelOptions = skillLevels
        .filter((level: SkillLevel) => !skillLevelsForm.some((selected: string) => selected === level.name))
        .map((level: SkillLevel) => ({
            value: level.id,
            label: level.name
        }));
    const handleSelectSkillLevel = (value: string) => {
        if (skillLevelsForm.length >= 4) return;
        const selectedSkill = skillLevels.find((level: SkillLevel) => level.id === value);
        if (selectedSkill && !skillLevelsForm.includes(selectedSkill.name)) {
            setValue("skillLevels", [...skillLevelsForm, selectedSkill.name]);
        }
    };

    const handleRemoveSkillLevel = (value: string) => {
        setValue(
            "skillLevels",
            skillLevelsForm.filter((level: string) => level !== value)
        );
    };
    useEffect(() => {
        if (skillsData) {
            setSkillLevels(skillsData);
        }
    }, [skillsData]);
    const maxChars = 1000;
    const filteredUsers = mockUsers.filter(user => user.name.toLowerCase().includes(sendValue.toLowerCase()));
    return <div className="w-full flex flex-col items-start gap-5">
        <span className="text-strong-950 text-[24px] lg:text-[32px] font-medium">{t("title")}</span>
        <div className="flex w-full flex-col gap-5">
            <div className="flex w-full flex-col sm:flex-row gap-5 items-start sm:items-center">
                <FormField
                    control={form.control}
                    name="receiver.userId"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-strong-950 text-sm font-medium">{t("send.label")}</FormLabel>
                            <FormControl>
                                <div className={cn("border relative h-11 py-2.5 pl-1.5 pr-2.5 border-soft-200 rounded-[10px] flex items-center justify-between w-full", filteredUsers.length > 0 && sendValue && "rounded-b-none")}>
                                    <AnimatePresence mode="wait">
                                        {field.value ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex border border-soft-200 rounded-[8px] items-center h-7 p-1 gap-1"
                                            >
                                                <UserAvatar
                                                    imageUrl={mockUsers.find(user => user.id === field.value)?.imageUrl || ""}
                                                    size="sm"
                                                    name={mockUsers.find(user => user.id === field.value)?.name || ""}
                                                />
                                                <div className="flex items-center gap-0.5">
                                                    <span className="text-sub-600 text-xs shrink-0 font-medium">
                                                        {mockUsers.find(user => user.id === field.value)?.name}
                                                    </span>
                                                    <Icons.close
                                                        onClick={() => {
                                                            field.onChange("");
                                                            form.setValue("receiver.name", "");
                                                            setSendValue("");
                                                        }}
                                                        className="size-3 cursor-pointer text-sub-600"
                                                    />
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="w-full"
                                            >
                                                <Input
                                                    placeholder={t("send.placeholder")}
                                                    className="h-full outline-none placeholder:text-sm focus:outline-none focus:ring-0 p-2.5 border-none shadow-none"
                                                    onChange={(e) => setSendValue(e.target.value)}
                                                    value={sendValue}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <AnimatePresence>
                                        {filteredUsers.length > 0 && sendValue && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 w-[calc(100%+2px)] -translate-x-[1px] bg-white border border-t-0 border-soft-200 rounded-b-[10px] overflow-hidden"
                                            >
                                                {filteredUsers.map((user, index) => (
                                                    <motion.div
                                                        initial={{ y: -3 }}
                                                        animate={{ y: 0 }}
                                                        transition={{ duration: 0.15, delay: index * 0.03 }}
                                                        key={user.id}
                                                        onClick={() => {
                                                            field.onChange(user.id);
                                                            form.setValue("receiver.name", user.name);
                                                            setSendValue("");
                                                        }}
                                                        className="cursor-pointer p-2.5 text-sm font-medium text-strong-950 hover:bg-weak-50 transition-all duration-200"
                                                    >
                                                        {user.name}
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <Select
                                        value={form.watch("visibility")}
                                        onValueChange={(value) => form.setValue("visibility", value)}
                                    >
                                        <SelectTrigger className="h-full focus-visible:ring-0 flex items-center justify-end max-w-[105px] gap-1.5 p-0 border-none shadow-none">
                                            <Icons.global className="size-4" />
                                            <span className="text-sub-600 text-sm font-normal">
                                                {form.watch("visibility")}
                                            </span>
                                        </SelectTrigger>
                                        <SelectContent className="border-soft-200">
                                            <SelectItem value="can view" className="cursor-pointer">can view</SelectItem>
                                            <SelectItem value="can edit" className="cursor-pointer">can edit</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="orderTitle"
                    render={({ field }) => (
                        <FormItem className="w-full sm:w-[200px]">
                            <FormLabel className="text-strong-950 text-sm font-medium">{t("orderTitle.label")}</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => field.onChange(value)}
                                >
                                    <SelectTrigger className="focus-visible:ring-0 cursor-pointer h-11 flex items-center gap-1.5 p-2.5 pl-3 border border-soft-200 rounded-[10px] shadow-none">
                                        <span className="text-sub-600 text-sm font-normal">
                                            {field.value || t("orderTitle.placeholder")}
                                        </span>
                                    </SelectTrigger>
                                    <SelectContent className="border-soft-200">
                                        <SelectItem value="Order 1" className="cursor-pointer">Order 1</SelectItem>
                                        <SelectItem value="Order 2" className="cursor-pointer">Order 2</SelectItem>
                                        <SelectItem value="Order 3" className="cursor-pointer">Order 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="contractTitle"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className="text-strong-950 text-sm font-medium">{t("contractTitle.label")}</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={t("contractTitle.placeholder")}
                                className="h-10 outline-none placeholder:text-sm focus:outline-none focus:ring-0 rounded-[10px] p-2.5 border border-soft-200 shadow-none"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className="text-strong-950 text-sm font-medium">{t("description.label")}</FormLabel>
                        <FormControl className="w-full">
                            <div className="relative my-0.5">
                                <Textarea
                                    placeholder={t("description.placeholder")}
                                    className="h-[112px] outline-none placeholder:text-sm focus:outline-none focus:ring-0 rounded-[10px] p-2.5 border border-soft-200 shadow-none"
                                    value={textareaValue}
                                    onChange={(e) => {
                                        const newText = e.target.value;
                                        setTextareaValue(newText);
                                        field.onChange(newText);
                                    }}
                                    maxLength={maxChars}
                                />
                                <div className="absolute bottom-2 right-2 text-sub-400 text-xs flex items-center">
                                    <span className="w-[60px] text-right">{textareaValue.length}/{maxChars}</span>
                                </div>
                            </div>
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="skillLevels"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <div className="flex items-center gap-1">
                            <FormLabel className="text-sub-600 font-medium text-sm">{t("skillLevels.label")}</FormLabel>
                            <span className="text-sub-600 font-normal text-sm">{t("skillLevels.max")}</span>
                            <Icons.info className="size-5 text-sub-600 ml-1" />
                        </div>
                        <FormControl>
                            <CustomSelect
                                options={skillLevelOptions}
                                value=""
                                onChange={handleSelectSkillLevel}
                                className="w-full mt-2"
                            />
                        </FormControl>
                        <div className="flex flex-wrap gap-2 pt-2 w-full">
                            <AnimatePresence>
                                {field.value?.length > 0 ? (
                                    field.value.map((skill: string) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex items-center justify-center gap-0.5 pr-1 pl-2 h-6 rounded-md border border-soft-200 bg-white"
                                        >
                                            <span className="text-sub-600 text-xs font-medium">{skill}</span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveSkillLevel(skill);
                                                }}
                                                className="flex items-center justify-center cursor-pointer"
                                            >
                                                <Icons.close className="size-[14px] stroke-soft-400" />
                                            </button>
                                        </motion.div>
                                    ))
                                ) : null}
                            </AnimatePresence>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    </div>
}

export default JobDetails;