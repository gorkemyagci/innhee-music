"use client";
import { Icons } from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/custom-tabs";
import SignInForm from "./signin-form";
import { useQueryState } from "nuqs";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const SignInWrapper = () => {
    const [activeTab, setActiveTab] = useQueryState<"code" | "password">("tab", {
        defaultValue: "code",
        parse: (value): "code" | "password" => 
            value === "password" ? "password" : "code"
    });
    const t = useTranslations("auth.signIn");
    return (
        <>
            <motion.div
                className="w-[390px] p-4 lg:p-8 bg-white shadow-sm z-10 rounded-3xl flex flex-col items-center gap-6"
                layout
                transition={{
                    layout: { duration: 0.3, ease: "easeOut" }
                }}
            >
                <div className="flex flex-col items-center gap-2">
                    <Icons.auth_user />
                    <span className="text-2xl font-medium text-center text-main-900 max-w-[17.5rem]">
                        {t(`title.${activeTab}`)}
                    </span>
                </div>
                <Tabs defaultValue="code" className="w-full">
                    <TabsList className="grid bg-transparent w-full grid-cols-2">
                        <TabsTrigger value="code" className="cursor-pointer" onClick={() => setActiveTab("code")}>
                            {t("tabs.code")}
                        </TabsTrigger>
                        <TabsTrigger value="password" className="cursor-pointer" onClick={() => setActiveTab("password")}>
                            {t("tabs.password")}
                        </TabsTrigger>
                    </TabsList>
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {activeTab === "code" && (
                                <motion.div
                                    key="code"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <SignInForm activeTab={activeTab} />
                                </motion.div>
                            )}
                            {activeTab === "password" && (
                                <motion.div
                                    key="password"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <SignInForm activeTab={activeTab} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Tabs>
            </motion.div>
        </>
    )
}

export default SignInWrapper;