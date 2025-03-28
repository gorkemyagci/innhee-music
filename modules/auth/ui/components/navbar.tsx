"use client";

import { Icons } from "@/components/icons";
import Link from "next/link";
import { pageUrls } from "@/lib/constants/page-urls";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const AuthNavbar = () => {
    const pathname = usePathname();
    const t = useTranslations("auth.navbar");

    return (
        <div className="w-full flex items-center justify-between">
            <Link href={pageUrls.HOME} prefetch>
                <Icons.logo />
            </Link>
            {pathname.includes("sign-in") ? (
                <div className="flex items-center gap-2">
                    <span className="text-sub-600 font-normal text-sm">
                        {t("noAccount")}
                    </span>
                    <div
                        onClick={() => {
                            typeof window !== "undefined" && window.location.replace(pageUrls.SIGN_IN)
                        }}
                    >
                        <span className="text-main-900 font-medium text-sm underline">
                            {t("signUp")}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <span className="text-sub-600 font-normal text-sm">
                        {t("hasAccount")}
                    </span>
                    <Link href={pageUrls.SIGN_IN} prefetch>
                        <span className="text-main-900 font-medium text-sm underline">
                            {t("signIn")}
                        </span>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default AuthNavbar;