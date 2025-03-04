import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

const PasswordChanged = () => {
    return (
        <div className="w-96 p-4 lg:p-8 bg-white shadow-sm z-10 rounded-3xl flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
                <Icons.changed_password />
                <div className="flex flex-col items-center gap-1.5">
                    <span className="text-2xl font-medium text-center text-main-900 max-w-[17.5rem]">
                        Successfully Changed
                    </span>
                    <span className="text-sub-600 font-normal text-center">Your password has been successfully changed.</span>
                </div>
            </div>
            <Button  className="w-full bg-[#20232D]/90 hover:bg-[#20232D]/85 transition-all h-10 border border-[#57585a] rounded-xl text-white text-sm font-medium shadow-[0_0_1px_#242628] relative overflow-hidden">
                Go To Website
            </Button>
        </div>
    )
}

export default PasswordChanged;