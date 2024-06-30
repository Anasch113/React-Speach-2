import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import heroImage from "../../assets/compliance-automation-hero.jpeg";
import introImage from "../../assets/compliance-automation-intro.jpeg";
import { AiFillDatabase } from "react-icons/ai";
import { AiFillAlert } from "react-icons/ai";
import { AiOutlineAim } from "react-icons/ai";
import { RiFileList3Line } from "react-icons/ri";
import { RiStackLine } from "react-icons/ri";

const ComplianceAutomationPage = () => {
    const heroSection = {
        headline: "Streamline Your Compliance Processes with Automation",
        subheadline: "Efficient Solutions to Simplify Compliance Management and Reduce Risks",
        cta: "Learn More",
        image: heroImage,
    };

    const introduction = {
        title: "Empower Your Business with Compliance Automation",
        content: "Compliance with regulations and standards is essential for businesses to mitigate risks, ensure transparency, and maintain trust with stakeholders. Our Compliance Automation solutions leverage advanced technologies and automation tools to streamline compliance processes, reduce administrative burdens, and enhance regulatory adherence, enabling you to focus on core business activities.",
        image: introImage
    };

    const howItWorks = {
        title: "How Our Compliance Automation Solutions Work",
        steps: [
            { id: 1, title: "Data Integration", content: "Integrate data from internal and external sources, including regulatory databases, policies, and procedures.", image: "path/to/step1-image.jpg", },
            { id: 2, title: "Rule Mapping", content: "Map regulatory requirements to internal controls, policies, and procedures using rule-based algorithms.",  image: "path/to/step1-image.jpg",},
            { id: 3, title: "Automated Monitoring", content: "Automatically monitor compliance activities and processes in real-time to identify deviations and non-compliance.",  image: "path/to/step1-image.jpg", },
            { id: 4, title: "Reporting and Analytics", content: "Generate comprehensive reports and analytics to track compliance performance, trends, and areas for improvement.",  image: "path/to/step1-image.jpg", }
        ]
    };

    const keyFeatures = {
        title: "Key Features of Our Compliance Automation Solutions",
        items: [
            { title: "Regulatory Mapping", content: "Map regulatory requirements to internal controls and policies for proactive compliance management.", icon: <AiFillDatabase size={30} /> },
            { title: "Automated Monitoring", content: "Automate monitoring and surveillance of compliance activities and processes to detect anomalies and deviations.", icon: <AiFillAlert size={30} /> },
            { title: "Workflow Automation", content: "Automate workflow processes, approvals, and notifications to streamline compliance tasks and reduce manual efforts.", icon: <AiOutlineAim size={30} /> },
            { title: "Audit Trail and Documentation", content: "Maintain detailed audit trails and documentation to ensure transparency and accountability in compliance activities.", icon: <RiFileList3Line size={30} /> },
            { title: "Scalability and Flexibility", content: "Scale compliance automation solutions to meet evolving regulatory requirements and business needs.", icon: <RiStackLine size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Using Our Compliance Automation Solutions",
        content: "Our Compliance Automation solutions offer numerous benefits, including:",
        items: [
            "Increased efficiency and productivity in compliance management",
            "Reduction in compliance-related errors and risks",
            "Enhanced visibility and transparency into compliance activities",
            "Cost savings through reduced manual efforts and resources",
            "Ability to adapt to changing regulatory landscapes and business environments"
        ]
    };

    const useCases = {
        title: "Ideal Use Cases for Compliance Automation",
        items: [
            { title: "Regulatory Compliance", content: "Ensure compliance with industry-specific regulations, such as GDPR, HIPAA, SOX, and PCI-DSS." },
            { title: "Policy Management", content: "Automate policy creation, dissemination, and tracking to ensure consistent adherence to organizational policies." },
            { title: "Risk Management", content: "Automate risk assessment, mitigation, and monitoring processes to proactively manage compliance risks." },
            { title: "Internal Controls", content: "Automate internal control testing and monitoring to strengthen governance and risk management frameworks." }
        ]
    };

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "Implementing compliance automation tools from [Company Name] significantly improved our compliance management processes, enabling us to reduce risks and streamline operations.", client: "Client 1" },
            { content: "The automated monitoring and reporting features provided by [Company Name]'s solutions helped us achieve greater transparency and accountability in our compliance activities.", client: "Client 2" }
        ]
    };

    const callToAction = {
        title: "Simplify Compliance Management with Automation",
        content: "Contact us to learn more about how our Compliance Automation solutions can help streamline your compliance processes and reduce risks.",
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

export default ComplianceAutomationPage;
