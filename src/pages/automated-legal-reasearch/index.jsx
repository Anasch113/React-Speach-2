

import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import img1 from "../../assets/automated-legal-hero.jpeg"
import img2 from "../../assets/automated-intro.jpeg"
import { MdOutlineBrightness7 } from "react-icons/md";
import { TbMenuDeep, TbReportSearch } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GrIntegration } from "react-icons/gr";

const AutomatedLegalResearch = () => {
    const heroSection = {
        headline: "Revolutionize Your Legal Research with Automation",
        subheadline: "Streamline Your Research Process and Uncover Insights Faster with AI-Powered Legal Research Tools",
        cta: "Start Your Free Trial",
        image: img1,
    };

    const introduction = {
        title: "Transform Legal Research with Cutting-Edge Automation",
        content: "In the fast-paced legal industry, efficiency and accuracy in research are crucial. Our automated legal research service leverages AI technology to provide comprehensive, accurate, and timely legal research, enabling legal professionals to focus on higher-value tasks and make informed decisions.",
        image: img2
    };

    const howItWorks = {
        title: "How Our Automated Legal Research Service Works",
        steps: [
            { id: 1, title: "Input Your Research Query", content: "Enter your research query, including specific legal questions, case details, or relevant keywords.", image: "path/to/step1-image.jpg" },
            { id: 2, title: "AI-Powered Search", content: "Our advanced AI engine scans vast legal databases, case law, statutes, and legal precedents to find relevant information.", image: "path/to/step2-image.jpg" },
            { id: 3, title: "Curated Results", content: "Receive a curated list of relevant cases, statutes, and legal articles, organized by relevance and importance.", image: "path/to/step3-image.jpg" },
            { id: 4, title: "Advanced Analysis", content: "Utilize our tools to analyze and summarize the research findings, highlighting key points and actionable insights.", image: "path/to/step4-image.jpg" }
        ]
    };

    const features = {
        title: "Key Features of Our Automated Legal Research Service",
        items: [
            { title: "Comprehensive Database Access", content: "Access a vast database of legal documents, including case law, statutes, and legal articles.", icon: <MdOutlineBrightness7 size={30} /> },
            { title: "Advanced Search Algorithms", content: "Utilize advanced search algorithms to find the most relevant legal information quickly and accurately.", icon: <TbMenuDeep size={30} /> },
            { title: "Real-Time Updates", content: "Stay updated with the latest legal developments and precedents as they are added to the database.", icon: <TbReportSearch size={30} /> },
            { title: "Detailed Analysis and Summaries", content: "Receive detailed analysis and summaries of research results, saving you time and effort.", icon: <RiSecurePaymentLine size={30} /> },
            { title: "User-Friendly Interface", content: "Navigate easily with an intuitive, user-friendly interface designed for legal professionals.", icon: <GrIntegration size={30} /> }
        ]
    };
    const testimonials = null;
    const useCases = null;

    const benefits = {
        title: "Benefits of Automated Legal Research for Legal Professionals",
        content: "Our automated legal research service offers numerous benefits, including:",
        items: [
            "Enhanced decision-making with data-driven insights.",
            "Improved accuracy in predicting case outcomes.",
            "Proactive risk management and mitigation.",
            "Optimized resource allocation for better efficiency.",
            "Increased client satisfaction through informed advisement."
        ],
        image: "path/to/benefits-image.jpg" // Replace with your image path
    };
    const callToAction = {
        title: "Ready to Streamline Your Legal Workflow?",
        content: "Contact us today to learn more about how our transcription summarization and analysis services can benefit your legal practice.",
        cta: "Contact Us",
        image: "path/to/cta-image.jpg"
    };
    return (
        <Wrapper>
            <PageLayout
                heroSection={heroSection}
                introduction={introduction}
                howItWorks={howItWorks}
                features={features}
                benefits={benefits}
                testimonials={testimonials}
                useCases={useCases}
                callToAction={callToAction}
            />

        </Wrapper>
    );
};

export default AutomatedLegalResearch;
