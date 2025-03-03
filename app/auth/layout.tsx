import { Icons } from "@/components/icons";
import AuthNavbar from "@/modules/auth/ui/components/navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen w-full bg-weak-100 py-7">
            <div className="w-full max-w-7xl mx-auto">
                <AuthNavbar />
                <Icons.grid_pattern className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
                <main className="h-[calc(100vh-107px)]">{children}</main>
                <div className="flex items-center justify-between">
                    <span className="text-sub-600 text-sm font-normal">
                        © 2025 MusicLogo
                    </span>
                    <div className="flex items-center gap-1.5">
                        <Icons.global />
                        <span className="text-sub-600 text-sm font-normal flex items-center gap-0">ENG <Icons.dropdown /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;