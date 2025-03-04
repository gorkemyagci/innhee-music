"use client";
import { Icons } from "@/components/icons"

import { Button } from "@/components/ui/button"

import InstallWechat from "@/components/custom/modals/install-wechat"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { pageUrls } from "@/lib/constants/page-urls";

const Accounts = () => {
    const pathname = usePathname();
    return (
        <div className={cn("flex w-full items-center gap-2", {
            "pt-6": pathname === pageUrls.SIGN_IN
        })}>
            <InstallWechat>
                <Button className="bg-white border border-soft-200 hover:bg-white flex-1 h-10 rounded-xl flex items-center justify-center">
                    <Icons.wechat />
                </Button>
            </InstallWechat>
            <Button className="bg-white border border-soft-200 hover:bg-white flex-1 h-10 rounded-xl flex items-center justify-center">
                <Icons.google />
            </Button>
        </div>
    )
}

export default Accounts;