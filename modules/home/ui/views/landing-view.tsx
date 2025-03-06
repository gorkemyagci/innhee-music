import SettingsModal from "@/components/custom/modals/settings";
import BorderBackground from "../components/border-background";
import Actions from "../sections/landing/actions";
import AudioWorkers from "../sections/landing/audio-workers";
import Discover from "../sections/landing/discover";
import FAQ from "../sections/landing/faq";
import Features from "../sections/landing/features";
import Footer from "../sections/landing/footer";
import GetStarted from "../sections/landing/get-started";
import Hero from "../sections/landing/hero";
import JobOpportunities from "../sections/landing/job-opportunities";
import Partners from "../sections/landing/partners";

const Landing = () => {
    return <div className="w-full flex flex-col items-center">
        <Hero />
        <Partners />
        <div className="flex flex-col gap-10 relative w-full">
            <BorderBackground />
            <Features />
            <Discover />
            <AudioWorkers />
        </div>
        <GetStarted />
        <JobOpportunities />
        <Actions />
        <FAQ />
        <Footer />
    </div>
}

export default Landing;