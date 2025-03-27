import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface InstallWechatModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

const InstallWechatModal = ({ isOpen, onClose, children }: InstallWechatModalProps) => {
    const t = useTranslations("modals.installWechat");
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-center">{t("title")}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4 py-4">
                    <div className="relative w-48 h-48">
                        <Image
                            src="/assets/images/wechat-qr.png"
                            alt="WeChat QR Code"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <p className="text-center text-sm text-sub-600">
                        {t("scanText")}
                    </p>
                    <Button onClick={onClose} className="w-full">
                        {t("buttons.close")}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default InstallWechatModal;