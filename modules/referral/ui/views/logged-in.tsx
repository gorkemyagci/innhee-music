import Image from "next/image";
import Share from "../sections/share";
import RebateCondition from "../sections/rebate-condition";
import UserProfile from "../sections/user-profile";

const LoggedIn = () => {
    return (
        <div className="w-full max-w-[1440px] mx-auto p-4 sm:py-5 sm:pb-10 lg:flex lg:items-start lg:gap-6">
            <div className="flex-[3] border border-neutral-200 rounded-2xl p-4 sm:p-6 flex flex-col items-center shadow-md gap-8 sm:gap-14 mb-6 lg:mb-0">
                <div className="flex w-full flex-col items-center gap-6 sm:gap-10">
                    <div className="flex w-full items-center flex-col gap-4 sm:gap-5">
                        <Image
                            src="/assets/svgs/referral-badge.svg"
                            alt="referral badge"
                            width={256}
                            height={156}
                            className="w-48 sm:w-64 h-auto"
                        />
                        <div className="w-full flex items-center flex-col gap-2 sm:gap-3">
                            <p className="text-strong-950 font-medium text-xl sm:text-2xl text-center">Give $200, Get $25</p>
                            <span className="text-center text-sub-600 font-medium text-xs sm:text-sm px-2">Everyone you refer gets $200 in credit over 60 days. Once they've spent $25 with us, you get $25. There is no limit to the amount of credit you can earn through referrals.</span>
                        </div>
                    </div>
                    <Share loggedIn={true} />
                </div>
                <RebateCondition />
            </div>
            <div className="lg:block">
                <UserProfile />
            </div>
        </div>
    )
}

export default LoggedIn;