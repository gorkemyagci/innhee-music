import { Icons } from "@/components/icons";
import PasswordChanged from "@/modules/auth/ui/components/password-changed";
import ForgotForm from "@/modules/auth/ui/views/forgot-form";

const ForgotPassword = () => {
    const isChanged = false;
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {isChanged ? <PasswordChanged /> : <div
                className="w-96 p-4 lg:p-8 bg-white shadow-sm z-10 rounded-3xl flex flex-col items-center gap-6"
            >
                <div className="flex flex-col items-center gap-2">
                    <Icons.forgot_password />
                    <div className="flex flex-col items-center gap-1.5">
                        <span className="text-2xl font-medium text-center text-main-900 max-w-[17.5rem]">
                            Forgot Password
                        </span>
                        <span className="text-sub-600 font-normal">Enter your details to login.</span>
                    </div>
                </div>
                <ForgotForm />
            </div>}
        </div>
    )
}

export default ForgotPassword;