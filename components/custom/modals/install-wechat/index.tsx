import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";

interface InstallWechatProps {
    children: React.ReactNode;
}

const InstallWechat = ({ children }: InstallWechatProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-center">WeChat QR Code</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center items-center py-3">
                    <Image
                        src="/assets/images/QR.png"
                        alt="WeChat QR Code"
                        width={153}
                        height={153}
                        className="w-[153px] h-[153px] pointer-events-none"
                    />
                </div>
                <p className="text-sm text-sub-600 font-normal text-center">Scan me with the installed WeChat App.</p>
            </DialogContent>
        </Dialog>
    )
}

export default InstallWechat;