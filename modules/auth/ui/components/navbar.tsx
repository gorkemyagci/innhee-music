"use client";

import { Icons } from "@/components/icons";
import Link from "next/link";
import { pageUrls } from "@/lib/constants/page-urls";
import { usePathname } from "next/navigation";

const AuthNavbar = () => {
    const pathname = usePathname();
    return (
        <div className="w-full flex items-center justify-between">
            <Link href={pageUrls.HOME} prefetch>
                <Icons.logo />
            </Link>
            {pathname.includes("sign-in") ? (
                <div className="flex items-center gap-2">
                    <span className="text-sub-600 font-normal text-sm">
                        Don't have an account?
                    </span>
                    <Link href={pageUrls.SIGN_UP} prefetch>
                        <span className="text-main-900 font-medium text-sm underline">
                            Sign Up
                        </span>
                    </Link>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <span className="text-sub-600 font-normal text-sm">
                        Already have an account?
                    </span>
                    <Link href={pageUrls.SIGN_IN} prefetch>
                        <span className="text-main-900 font-medium text-sm underline">
                            Sign In
                        </span>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default AuthNavbar;