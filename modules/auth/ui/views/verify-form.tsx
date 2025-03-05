import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import SubmitButton from "../components/submit-button";

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
            <SubmitButton text="Submit Code" />
            <div className="flex items-center flex-col gap-1">
                <p className="text-sub-600 font-normal text-sm">Experiencing issues receiving the code?</p>
                <span className="text-main-900 font-medium text-sm underline">Resend code</span>
            </div>
        </div>
    )
}

export default VerifyForm;