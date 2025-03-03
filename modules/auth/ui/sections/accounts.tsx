import { Icons } from "@/components/icons"

import { Button } from "@/components/ui/button"

import InstallWechat from "@/components/custom/modals/install-wechat"

const Accounts = () => {
    return (
        <div className="flex w-full pt-6 items-center gap-2">
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