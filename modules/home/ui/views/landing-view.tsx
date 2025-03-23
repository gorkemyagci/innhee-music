import Discover from "../sections/landing/discover";
import FAQ from "../sections/landing/faq";
import Features from "../sections/landing/features";
import Footer from "../sections/landing/footer";
import Hero from "../sections/landing/hero";
import AppInfo from "../sections/landing/info";
import WhatsInside from "../sections/landing/whats-inside";

const Landing = () => {
    return <div className="w-full flex flex-col items-center">
        <Hero />
        <WhatsInside />
        <Features />
        <Discover />
        <AppInfo />
        <FAQ />
        <Footer />
    </div>
}

export default Landing;