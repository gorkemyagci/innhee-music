"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface EditAboutProps {
    children: React.ReactNode;
    initialText?: string;
    onSave?: (text: string) => void;
}

const EditAbout = ({ children, initialText = "", onSave }: EditAboutProps) => {
    const t = useTranslations("modals.editAbout");
    const [text, setText] = useState(initialText);
    const [isOpen, setIsOpen] = useState(false);
    const maxChars = 200;
    const utils = trpc.useUtils();

    const { data: userData } = trpc.auth.getMe.useQuery(undefined, {
        enabled: isOpen
    });

    useEffect(() => {
        if (initialText) {
            setText(initialText);
        }
    }, [initialText]);


    useEffect(() => {
        if (userData && userData.about) {
            setText(userData.about);
        }
    }, [userData]);

    useEffect(() => {
        if (isOpen && userData?.about) {
            setText(userData.about);
        }
    }, [isOpen, userData]);

    const updateMutation = trpc.user.update.useMutation({
        onSuccess: () => {
            toast.success("About information updated successfully");
            utils.auth.getMe.invalidate();
            if (onSave) onSave(text);
            setIsOpen(false);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update about information");
        }
    });

    const handleSave = () => {
        updateMutation.mutate({
            about: text
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0 bg-white border-soft-200 rounded-3xl">
                <DialogHeader className="p-4 flex items-start border-b border-soft-200 justify-between w-full">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-soft-200 flex items-center justify-center bg-white">
                            <Icons.upload_line />
                        </div>
                        <div className="flex flex-col gap-1">
                            <DialogTitle><span className="text-main-900 font-medium text-sm">{t("title")}</span></DialogTitle>
                            <span className="text-sub-600 font-normal text-xs">{t("subtitle", { maxChars })}</span>
                        </div>
                    </div>
                </DialogHeader>
                <div className="px-4 pb-4 flex flex-col gap-3">
                    <div className="relative my-2">
                        <Textarea
                            value={text}
                            placeholder={t("placeholder")}
                            className="w-full min-h-[120px] border-soft-200 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-sub-400 resize-none pr-3"
                            onChange={(e) => {
                                const newText = e.target.value;
                                setText(newText);
                            }}
                            maxLength={maxChars}
                        />
                        <div className="absolute bottom-2 right-2 text-sub-400 text-xs flex items-center">
                            <span className="w-[60px] text-right">{text.length}/{maxChars}</span>
                            <Icons.resize className="ml-1 size-4 flex-shrink-0" />
                        </div>
                    </div>
                    <Separator className="bg-soft-200" />
                    <div className="flex items-center gap-3 w-full">
                        <DialogClose asChild>
                            <Button variant="outline" className="border-soft-200 flex-1 h-9 rounded-lg text-sub-600 font-medium text-sm">{t("buttons.cancel")}</Button>
                        </DialogClose>
                        <Button 
                            className="h-9 rounded-lg text-white flex-1 font-medium text-sm bg-neutral-950"
                            onClick={handleSave}
                            disabled={updateMutation.isPending}
                        >
                            {updateMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : t("buttons.save")}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditAbout;