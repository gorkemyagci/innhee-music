import BecomePartner from "../sections/become-partner";
import HowItWorks from "../sections/how-it-works";
import Share from "../sections/share";
import RebateCondition from "../sections/rebate-condition";
import FAQ from "@/modules/home/ui/sections/landing/faq";

const NotLoggedIn = () => {
    return (
        <div className="w-full max-w-[1440px] mx-auto px-2 lg:px-5 py-5 pb-10">
            <div className="lg:bg-white flex flex-col items-start gap-10 lg:py-6 lg:px-10 lg:border lg:border-neutral-200 lg:shadow-lg lg:rounded-3xl">
                <BecomePartner />
                <HowItWorks />
                <Share />
                <RebateCondition />
            </div>
            <FAQ />
        </div>
    )
}

export default NotLoggedIn;