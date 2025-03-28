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
            "pt-6": pathname.includes(pageUrls.SIGN_IN)
        })}>
            <InstallWechat>
                <Button className="bg-white border border-soft-200 hover:bg-white flex-1 h-10 rounded-xl flex items-center justify-center">
                    <Icons.wechat className="size-5" />
                </Button>
            </InstallWechat>
            <Button className="bg-white shadow-none hover:bg-gray-100/60 ease-out hover:border-gray-100/60 border border-soft-200 transition-[background-color,border-color] duration-500 flex-1 h-10 rounded-xl flex items-center justify-center">
                <Icons.google className="size-5" />
            </Button>
        </div>
    )
}

export default Accounts;