import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import heroImage from "../../assets/legal-process-automation-hero.jpeg";
import introImage from "../../assets/legal-process-automation-intro.jpeg";
import { FaFileAlt, FaFileContract, FaTasks, FaBalanceScale, FaRegClipboard } from "react-icons/fa";

const LegalProcessAutomationPage = () => {
    const heroSection = {
        headline: "Efficiency Redefined: Streamline Legal Processes with Automation",
        subheadline: "Automate Your Legal Workflows for Enhanced Productivity and Accuracy",
        cta: "Learn More",
        image: heroImage,
    };

    const introduction = {
        title: "Unlock the Power of Legal Process Automation",
        content: "Legal work is often complex and time-consuming, but it doesn't have to be. Our Legal Process Automation Solutions leverage cutting-edge technology to automate repetitive tasks, streamline workflows, and optimize efficiency, allowing you to focus on delivering exceptional legal services to your clients.",
        image: introImage
    };

    const howItWorks = {
        title: "How Our Legal Process Automation Solutions Work",
        steps: [
            { id: 1, title: "Workflow Analysis", content: "Analyze your existing legal workflows and identify opportunities for automation." },
            { id: 2, title: "Process Automation", content: "Automate routine legal tasks such as document generation, contract review, and case management." },
            { id: 3, title: "Integration", content: "Integrate our automation solutions seamlessly with your existing legal software and systems." },
            { id: 4, title: "Monitoring and Optimization", content: "Monitor automated processes in real-time and continuously optimize for maximum efficiency." }
        ]
    };

    const keyFeatures = {
        title: "Key Features of Our Legal Process Automation Solutions",
        items: [
            { title: "Document Automation", content: "Generate legal documents quickly and accurately using customizable templates.", icon: <FaFileAlt size={30} /> },
            { title: "Contract Management", content: "Automate contract creation, review, and approval processes to accelerate deal cycles.", icon: <FaFileContract size={30} /> },
            { title: "Case Management", content: "Streamline case intake, management, and reporting for improved client service.", icon: <FaTasks size={30} /> },
            { title: "Compliance Tracking", content: "Automate compliance monitoring and reporting to ensure adherence to regulations.", icon: <FaBalanceScale size={30} /> },
            { title: "Task Assignment and Tracking", content: "Assign tasks to team members automatically and track progress in real-time.", icon: <FaRegClipboard size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Using Our Legal Process Automation Solutions",
        content: "Our Legal Process Automation Solutions offer numerous benefits, including:",
        items: [
            "Increased Efficiency: Save time and resources by automating repetitive tasks.",
            "Enhanced Accuracy: Minimize errors and improve consistency in legal work.",
            "Improved Client Service: Deliver faster turnaround times and better outcomes for clients.",
            "Cost Savings: Reduce overhead costs associated with manual processes.",
            "Scalability: Scale your legal practice efficiently as your caseload grows."
        ]
    };

    const useCases = {
        title: "Ideal Use Cases for Legal Process Automation",
        items: [
            { title: "Document Generation", content: "Automate the creation of legal documents such as contracts, agreements, and letters." },
            { title: "Contract Review", content: "Speed up contract review processes by automating contract analysis and redlining." },
            { title: "Case Intake and Management", content: "Streamline case intake, client onboarding, and matter management for law firms." },
            { title: "Compliance Reporting", content: "Automate regulatory compliance monitoring and reporting for corporate legal departments." }
        ]
    };

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "Implementing legal automation from [Company Name] has revolutionized our firm's operations, allowing us to handle more cases with greater efficiency.", client: "Client 1" },
            { content: "Thanks to [Company Name]'s solutions, we've been able to reduce manual work and focus on providing high-quality legal services to our clients.", client: "Client 2" }
        ]
    };

    const callToAction = {
        title: "Automate Your Legal Workflows Today",
        content: "Ready to streamline your legal processes? Contact us now to learn more about our Legal Process Automation Solutions.",
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

export default LegalProcessAutomationPage;
