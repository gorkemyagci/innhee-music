import SignInWrapper from "@/modules/auth/ui/views/signin-wrapper";

export const dynamic = "force-dynamic";

const SignIn = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <SignInWrapper />
        </div>
    )
}

export default SignIn;