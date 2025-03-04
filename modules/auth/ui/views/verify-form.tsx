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
            <Button type="submit" className="w-full bg-[#20232D]/90 hover:bg-[#20232D]/90 transition-all h-10 border border-[#57585a] rounded-[10px] text-white text-sm font-medium shadow-[0_0_1px_#242628] relative overflow-hidden">Submit Code</Button>
            <div className="flex items-center flex-col gap-1">
                <p className="text-sub-600 font-normal text-sm">Experiencing issues receiving the code?</p>
                <span className="text-main-900 font-medium text-sm underline">Resend code</span>
            </div>
        </div>
    )
}

export default VerifyForm;