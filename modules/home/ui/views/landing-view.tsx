import Discover from "../sections/landing/discover";
import FAQ from "../sections/landing/faq";
import Features from "../sections/landing/features";
import Footer from "../sections/landing/footer";
import Hero from "../sections/landing/hero";
import Choose from "../sections/landing/choose";
import Workflow from "../sections/landing/workflow";

const Landing = () => {
    return <div className="w-full flex flex-col items-center">
        <Hero />
        <Choose />
        <Features />
        <Discover />
        <Workflow />
        <FAQ />
        <Footer />
    </div>
}

export default Landing;