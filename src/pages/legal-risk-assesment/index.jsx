import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import hero from "../../assets/automated-legal-hero.jpeg"
import intro from "../../assets/automated-intro.jpeg"
import { AiOutlineSolution } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import { AiOutlineRadarChart } from "react-icons/ai";
import { RiShieldCheckLine } from "react-icons/ri";
import { BiLineChart } from "react-icons/bi";

const LegalRiskAssessmentPage = () => {
    const heroSection = {
        headline: "Mitigate Legal Risks and Enhance Compliance with Advanced Assessment Tools",
        subheadline: "Empower Your Legal Strategy with Data-Driven Risk Management Solutions",
        cta: "Request Demo",
        image: hero,
    };

    const introduction = {
        title: "Gain Insight, Minimize Exposure: Legal Risk and Assessment",
        content: "In today's dynamic legal landscape, proactively managing and assessing legal risks is essential for ensuring compliance and protecting your organization's interests. Our Legal Risk and Assessment solutions provide comprehensive tools and insights to help you navigate regulatory complexities and mitigate potential liabilities.",
        image: intro
    };
const whyMatters = null;


    const features = {
        title: "Key Features of Our Legal Risk and Assessment Solutions",
        items: [
            { title: "Risk Identification", content: "Identify potential legal risks across various business operations, contracts, and regulatory compliance areas.", icon: <AiOutlineSolution size={30} /> },
            { title: "Compliance Monitoring", content: "Monitor regulatory changes and ensure compliance with evolving legal requirements and industry standards.", icon: <BsCardChecklist size={30} /> },
            { title: "Risk Quantification", content: "Quantify legal risks based on severity, likelihood, and potential impact on business operations.", icon: <AiOutlineRadarChart size={30} /> },
            { title: "Mitigation Strategies", content: "Develop and implement effective risk mitigation strategies to address identified legal vulnerabilities.", icon: <RiShieldCheckLine size={30} /> },
            { title: "Dashboard and Reporting", content: "Access real-time dashboards and comprehensive reports to track legal risk exposure and monitor mitigation efforts.", icon: <BiLineChart size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Using Our Legal Risk and Assessment Solutions",
        content: "",
        items: [
            "Proactive risk management and mitigation",
            "Enhanced compliance with regulatory requirements",
            "Improved decision-making based on data-driven insights",
            "Reduced exposure to legal liabilities and litigation costs",
            "Greater transparency and accountability in risk assessment processes"
        ]
    };

    const useCases = {
        title: "Use Cases for Legal Risk and Assessment Solutions",
        items: [
            { title: "Contract Management", content: "Evaluate contractual risks and ensure compliance with contractual obligations and terms." },
            { title: "Regulatory Compliance", content: "Monitor regulatory changes and assess compliance with industry-specific regulations and standards." },
            { title: "Mergers and Acquisitions", content: "Conduct due diligence and assess legal risks associated with mergers, acquisitions, and corporate transactions." },
            { title: "Litigation Preparedness", content: "Anticipate potential legal challenges and develop strategies to minimize litigation risks and exposure." }
        ]
    };

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "Our legal team relies on these solutions to proactively identify and mitigate potential legal risks, ensuring our business operations remain compliant and resilient.", client: "Client 1" },
            { content: "These tools have revolutionized our risk management practices, providing actionable insights and enabling us to make informed decisions to protect our organization's interests.", client: "Client 2" }
        ]
    };

    const callToAction = {
        title: "Ready to Enhance Your Legal Risk Management?",
        content: "Request a demo today to learn more about how our Legal Risk and Assessment solutions can help your organization navigate legal complexities and mitigate potential risks.",
        cta: "Request Demo",
    image: "path/to/call-to-action-image.jpg",

    };

    return (
        <div>
            <Wrapper>
                <PageLayout
                    heroSection={heroSection}
                    introduction={introduction}
                howItWorks={whyMatters}
                   features={features}
                    benefits={benefits}
                    useCases={useCases}
                    testimonials={testimonials}
                    callToAction={callToAction}
                />
            </Wrapper>
        </div>
    )
}

export default LegalRiskAssessmentPage;
