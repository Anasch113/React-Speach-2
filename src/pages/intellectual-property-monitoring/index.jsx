import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import heroImage from "../../assets/intellectual-property-hero.jpeg";
import introImage from "../../assets/intellectual-property-intro.jpeg";
import { AiFillDatabase } from "react-icons/ai";
import { AiFillAlert } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import { BiBarChartAlt } from "react-icons/bi";
import { FaGlobe } from "react-icons/fa";

const IntellectualPropertyMonitoringPage = () => {
    const heroSection = {
        headline: "Protect Your Intellectual Property Assets",
        subheadline: "Comprehensive Monitoring Solutions to Safeguard Your Intellectual Property Rights",
        cta: "Get Started",
        image: heroImage,
    };

    const introduction = {
        title: "Empower Your Business with Proactive Intellectual Property Monitoring",
        content: "Intellectual property (IP) assets are valuable assets that require vigilant protection against infringement, piracy, and unauthorized use. Our Intellectual Property Monitoring solutions offer comprehensive monitoring and enforcement capabilities to safeguard your IP rights, mitigate risks, and preserve the integrity of your brand and innovations.",
        image: introImage
    };

    const howItWorks = {
        title: "How Our Intellectual Property Monitoring Solutions Work",
        steps: [
            { id: 1, title: "Data Collection", content: "Aggregate and analyze intellectual property data from various sources, including patent databases, trademark registries, and online marketplaces.", image: "path/to/step1-image.jpg", },
            { id: 2, title: "Monitoring and Detection", content: "Monitor online and offline channels for potential infringements, counterfeits, and unauthorized uses of your intellectual property assets.", image: "path/to/step1-image.jpg", },
            { id: 3, title: "Alerting and Enforcement", content: "Generate real-time alerts for detected infringements and initiate appropriate enforcement actions, including cease and desist notices, takedown requests, and legal actions.", image: "path/to/step1-image.jpg", }
        ]
    };

    const keyFeatures = {
        title: "Key Features of Our Intellectual Property Monitoring Solutions",
        items: [
            { title: "Comprehensive Coverage", content: "Monitor a wide range of intellectual property assets, including patents, trademarks, copyrights, and trade secrets.", icon: <AiFillDatabase size={30} /> },
            { title: "Real-time Alerts", content: "Receive real-time alerts for potential infringements and unauthorized uses of your intellectual property assets.", icon: <AiFillAlert size={30} /> },
            { title: "Customizable Monitoring", content: "Customize monitoring parameters and thresholds to align with your specific IP protection needs and priorities.", icon: <AiOutlineSetting size={30} /> },
            { title: "Actionable Insights", content: "Access actionable insights and reports to inform enforcement strategies and decision-making.", icon: <BiBarChartAlt size={30} /> },
            { title: "Global Reach", content: "Monitor intellectual property activities globally to address infringements across different jurisdictions and markets.", icon: <FaGlobe size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Using Our Intellectual Property Monitoring Solutions",
        content: "Our Intellectual Property Monitoring solutions offer numerous benefits, including:",
        items: [
            "Early detection and prevention of intellectual property infringements",
            "Protection of brand reputation and market share",
            "Reduction in legal risks and enforcement costs",
            "Enhanced compliance with intellectual property laws and regulations",
            "Preservation of innovation and competitive advantage"
        ]
    };

    const useCases = {
        title: "Ideal Use Cases for Intellectual Property Monitoring",
        items: [
            { title: "Brand Protection", content: "Monitor online and offline channels to protect your brand identity and trademarks from counterfeiting and infringement." },
            { title: "Product Piracy Prevention", content: "Detect and deter product piracy and unauthorized distribution of copyrighted materials and digital content." },
            { title: "Patent Infringement Detection", content: "Identify and address instances of patent infringement to protect your investments in research and development." },
            { title: "Market Intelligence", content: "Gain insights into market trends and competitor activities through intellectual property monitoring and analysis." }
        ]
    };

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "The real-time alerts and comprehensive coverage provided by [Company Name] helped us identify and address trademark infringements quickly, preserving our brand reputation and market share.", client: "Client 1" },
            { content: "The actionable insights and customizable monitoring features of [Company Name]'s solutions enabled us to proactively protect our intellectual property assets and stay ahead of potential threats.", client: "Client 2" }
        ]
    };

    const callToAction = {
        title: "Protect Your Intellectual Property Assets Today",
        content: "Contact us to learn more about how our Intellectual Property Monitoring solutions can help safeguard your intellectual property rights and preserve the value of your innovations and brands.",
        cta: "Contact Us",
        image: heroImage
    };

    return (
        <div>
            <Wrapper>
                <PageLayout
                    heroSection={heroSection}
                    introduction={introduction}
                    howItWorks={howItWorks}
                   features={keyFeatures}
                    benefits={benefits}
                    useCases={useCases}
                    testimonials={testimonials}
                    callToAction={callToAction}
                />
            </Wrapper>
        </div>
    )
}

export default IntellectualPropertyMonitoringPage;
