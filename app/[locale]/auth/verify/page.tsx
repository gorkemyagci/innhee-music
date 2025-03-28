import { Icons } from "@/components/icons";
import VerifyForm from "@/modules/auth/ui/views/verify-form";
import { getTranslations } from "next-intl/server";

interface VerifyPageProps {
    searchParams: Promise<{ email?: string }>;
}

export const dynamic = "force-dynamic";

const Verify = async ({ searchParams }: VerifyPageProps) => {
    const t = await getTranslations("auth.verify");
    const email = (await searchParams).email || "your email";
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
                className="w-full sm:max-w-full max-w-[350px] lg:w-[440px] p-4 sm:p-8 bg-white shadow-sm z-10 rounded-2xl sm:rounded-3xl flex flex-col items-center gap-4 sm:gap-6"
            >
                <div className="flex w-full border-b border-soft-200 pb-2 sm:pb-3 flex-col items-center gap-1.5 sm:gap-2">
                    <Icons.verify />
                    <div className="flex flex-col gap-0.5 sm:gap-1">
                        <span className="text-xl sm:text-2xl font-medium text-center text-main-900 max-w-[17.5rem]">
                            {t("title")}
                        </span>
                        <span className="text-sm sm:text-base text-sub-600 font-normal text-center">
                            {t("description")} <span className="text-main-900 font-medium">{email}</span>
                        </span>
                    </div>
                </div>
                <VerifyForm />
            </div>
        </div>
    )
}

export default Verify;