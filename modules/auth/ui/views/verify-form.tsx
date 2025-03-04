import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

const VerifyForm = () => {
    return (
        <div className="flex w-full items-center flex-col gap-5">
            <InputOTP maxLength={6}>
                <InputOTPGroup className="flex gap-2.5">
                    <InputOTPSlot index={0} className="border w-10 h-12 rounded-xl bg-white shadow-sm border-soft-200 text-main-900 font-medium text-xl" />
                    <InputOTPSlot index={1} className="border w-10 h-12 rounded-xl bg-white shadow-sm border-soft-200 text-main-900 font-medium text-xl" />
                    <InputOTPSlot index={2} className="border w-10 h-12 rounded-xl bg-white shadow-sm border-soft-200 text-main-900 font-medium text-xl" />
                    <InputOTPSlot index={3} className="border w-10 h-12 rounded-xl bg-white shadow-sm border-soft-200 text-main-900 font-medium text-xl" />
                    <InputOTPSlot index={4} className="border w-10 h-12 rounded-xl bg-white shadow-sm border-soft-200 text-main-900 font-medium text-xl" />
                    <InputOTPSlot index={5} className="border w-10 h-12 rounded-xl bg-white shadow-sm border-soft-200 text-main-900 font-medium text-xl" />
                </InputOTPGroup>
            </InputOTP>
            <Button type="submit" className="w-full h-10 rounded-[10px] text-white text-sm font-medium relative overflow-hidden transition-all
                    bg-gradient-to-b from-[#20232D]/90 to-[#20232D]
                    border border-[#20232D]/80 shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">Submit Code</Button>
            <div className="flex items-center flex-col gap-1">
                <p className="text-sub-600 font-normal text-sm">Experiencing issues receiving the code?</p>
                <span className="text-main-900 font-medium text-sm underline">Resend code</span>
            </div>
        </div>
    )
}

export default VerifyForm;