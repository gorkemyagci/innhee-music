import { Icons } from "@/components/icons";
import SignUpForm from "@/modules/auth/ui/views/signup-form";

const SignUp = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
                className="w-96 p-8 bg-white shadow-sm z-10 rounded-3xl flex flex-col items-center gap-6"
            >
                <div className="flex flex-col items-center gap-2">
                    <Icons.create_user />
                    <span className="text-2xl font-medium text-center text-main-900 max-w-[17.5rem]">
                        Register
                    </span>
                </div>
                <SignUpForm />
            </div>
        </div>
    )
}

export default SignUp;