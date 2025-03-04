import BecomePartner from "../sections/become-partner";
import HowItWorks from "../sections/how-it-works";
import Share from "../sections/share";
import RebateCondition from "../sections/rebate-condition";
import FAQ from "@/modules/home/ui/sections/landing/faq";

const NotLoggedIn = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-5 lg:px-0 py-5 pb-10">
            <div className="bg-white flex flex-col items-start gap-10 py-6 px-10 border border-neutral-200 shadow-lg rounded-3xl">
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