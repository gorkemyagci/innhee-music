import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image";
import { useTranslations } from "next-intl";

const UserProfile = () => {
    const t = useTranslations("referral.userProfile");
    
    return (
        <div className="flex-1 border border-soft-200 rounded-2xl p-6 flex flex-col items-center shadow-sm gap-4">
            <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">{t("tabs.overview")}</TabsTrigger>
                    <TabsTrigger value="comments" disabled>{t("tabs.comments")}</TabsTrigger>
                    <TabsTrigger value="rewards" disabled>{t("tabs.rewards")}</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="flex flex-col w-full items-center gap-1">
                            <p className="text-strong-950 font-medium text-lg">Matthew Johnson</p>
                            <span className="text-sub-600 font-normal text-xs">Software Engineer</span>
                        </div>
                        <Image
                            src="/assets/svgs/referral-user-badge.svg"
                            alt="referral user badge"
                            width={290}
                            height={156}
                        />
                        <span className="text-sub-600 font-normal text-xs">
                            {t("badge")}
                        </span>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default UserProfile;