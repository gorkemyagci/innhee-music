import { Icons } from "@/components/icons";
import AuthNavbar from "@/modules/auth/ui/components/navbar";
import LanguageSwitcher from "@/modules/auth/ui/components/language-switcher";
import { getTranslations } from "next-intl/server";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
    const t = await getTranslations("auth.layout");

    return (
        <div className="min-h-screen w-full bg-weak-100 py-3 md:py-4">
            <div className="w-full max-w-8xl px-4 md:px-6 lg:px-8 mx-auto">
                <AuthNavbar />
                <Icons.grid_pattern className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full max-w-[80%] md:max-w-[70%] lg:max-w-[60%] opacity-50 md:opacity-100" />
                <main className="h-[calc(100vh-90px)] md:h-[calc(100vh-107px)]">{children}</main>
                <div className="flex items-center justify-between py-2 md:py-0">
                    <span className="text-sub-600 text-xs md:text-sm font-normal">
                        {t("copyright")}
                    </span>
                    <LanguageSwitcher />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;