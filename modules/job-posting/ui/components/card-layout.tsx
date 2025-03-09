"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "@/components/icons";
import SubmitButton from "@/modules/auth/ui/components/submit-button";
import { useQueryState } from "nuqs";
import { jobPostingMenu } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

interface CardLayoutProps {
    isOpen: boolean;
    toggleOpen: () => void;
    children: React.ReactNode;
    item: any;
    onSubmit?: () => void;
    loading?: boolean;
}

const CardLayout = ({ isOpen, toggleOpen, children, item, onSubmit, loading }: CardLayoutProps) => {
    const [tab, setTab] = useQueryState("tab", { defaultValue: "basic-information" });

    const nextItem = (() => {
        if (!item) return null;
        const currentIndex = jobPostingMenu.findIndex(menuItem => menuItem.value === item.value);
        if (currentIndex === -1 || currentIndex === jobPostingMenu.length - 1) return null;
        return jobPostingMenu[currentIndex + 1];
    })();

    return (
        <Card className={cn("w-full lg:w-[440px] border-soft-200 rounded-[20px] shadow-none", !isOpen && "pb-2", item?.value === "preview" && "gap-0")}>
            <CardHeader
                onClick={toggleOpen}
                className={cn("bg-transparent border-soft-200 pb-4 pr-6 pl-5 flex flex-row items-center justify-between cursor-pointer", !isOpen ? "border-b-none" : "border-b")}
            >
                <div className="flex items-center gap-3">
                    <span className="rounded-full flex items-center justify-center h-10 w-10 border border-soft-200 text-strong-950 font-medium text-sm">0{item?.id}</span>
                    <span className="text-strong-950 font-medium text-sm">{item?.title}</span>
                </div>
                <motion.div
                    className="w-6 h-6 rounded-md border border-soft-200 flex items-center justify-center p-0.5"
                    animate={{ rotate: isOpen ? 90 : 270 }}
                    transition={{ duration: 0.3 }}
                >
                    <Icons.chevron_short_right />
                </motion.div>
            </CardHeader>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        <CardContent className={cn("space-y-6", item?.value === "preview" && "p-0 m-0")}>
                            {children}
                        </CardContent>
                        {item.value === "preview" ?
                            <CardFooter className="flex gap-2 justify-center p-5 mt-5 pb-0 pt-0">
                                <Button variant="outline" className="h-9 flex-1 rounded-lg border-soft-200 text-sub-600 font-medium text-sm">Draft</Button>
                                <SubmitButton
                                    text="Post"
                                    className="h-9 flex-1 rounded-lg"
                                    onClick={onSubmit}
                                    loading={loading}
                                />
                            </CardFooter>
                            : <CardFooter className="flex justify-end p-5 mt-5 pb-0 pt-0">
                                <SubmitButton
                                    text="Next"
                                    className="h-9 w-14 rounded-lg"
                                    onClick={() => nextItem && setTab(nextItem.value)}
                                    disabled={!nextItem}
                                />
                            </CardFooter>}
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    )
}

export default CardLayout;