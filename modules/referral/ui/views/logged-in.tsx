import Image from "next/image";
import Share from "../sections/share";
import RebateCondition from "../sections/rebate-condition";
import UserProfile from "../sections/user-profile";


const LoggedIn = () => {
    return (
        <div className="w-full max-w-7xl mx-auto py-5 pb-10 flex items-start gap-6">
            <div className="flex-[3] border border-neutral-200 rounded-2xl p-6 flex flex-col items-center shadow-md gap-14">
                <div className="flex w-full flex-col items-center gap-10">
                    <div className="flex w-full items-center flex-col gap-5">
                        <Image
                            src="/assets/svgs/referral-badge.svg"
                            alt="referral badge"
                            width={256}
                            height={156}
                        />
                        <div className="w-full flex items-center flex-col gap-3">
                            <p className="text-strong-950 font-medium text-2xl">Give $200, Get $25</p>
                            <span className="text-center text-sub-600 font-medium text-sm">Everyone you refer gets $200 in credit over 60 days. Once they've spent $25 with us, you get $25. There is no limit to the amount of credit you can earn through referrals.</span>
                        </div>
                    </div>
                    <Share loggedIn={true} />
                </div>
                <RebateCondition />
            </div>
            <UserProfile />
        </div>
    )
}

export default LoggedIn;