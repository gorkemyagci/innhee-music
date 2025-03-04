import { Icons } from "@/components/icons";
import VerifyForm from "@/modules/auth/ui/views/verify-form";
import Image from "next/image";

const Verify = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
                className="w-[440px] p-8 bg-white shadow-sm z-10 rounded-3xl flex flex-col items-center gap-6"
            >
                <div className="flex border-b border-soft-200 pb-3 flex-col items-center gap-2">
                    <Icons.verify />
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-medium text-center text-main-900 max-w-[17.5rem]">
                            Enter Verification Code
                        </span>
                        <span className="text-sub-600 font-normal">We’ve sent a code to <span className="text-main-900 font-medium">arthur@gmail.com</span></span>
                    </div>
                </div>
                <VerifyForm />
            </div>
        </div>
    )
}

export default Verify;