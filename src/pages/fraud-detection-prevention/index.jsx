import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import heroImage from "../../assets/fraud-detection-hero.jpeg";
import introImage from "../../assets/fraud-detection-intro.jpeg";

import { AiOutlineBarChart } from "react-icons/ai";
import { AiOutlineRobot } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";

const FraudDetectionPage = () => {
    const heroSection = {
        headline: "Safeguard Your Business Against Fraud",
        subheadline: "Advanced Solutions to Detect and Prevent Fraudulent Activities",
        cta: "Learn More",
        image: heroImage,
    };

    const introduction = {
        title: "Empower Your Business with Effective Fraud Detection and Prevention",
        content: "Fraud poses a significant threat to businesses, resulting in financial losses, reputational damage, and legal liabilities. Our comprehensive Fraud Detection and Prevention solutions leverage advanced technologies and strategic methodologies to identify, mitigate, and deter fraudulent activities, safeguarding your organization's assets and reputation.",
        image: introImage
    };

    const howItWorks = {
        title: "How Our Fraud Detection and Prevention Solutions Work",
        steps: [
            { id: 1, title: "Data Collection", content: "Collect and analyze large volumes of transactional and operational data from various sources.",  image: "path/to/step1-image.jpg", },
            { id: 2, title: "Pattern Recognition", content: "Utilize advanced analytics and machine learning algorithms to detect patterns indicative of fraudulent behavior.",image: "path/to/step1-image.jpg", },
            { id: 3, title: "Risk Scoring", content: "Assign risk scores to transactions and activities based on identified patterns and anomalies.", image: "path/to/step1-image.jpg", },
            { id: 4, title: "Alerting and Remediation", content: "Generate real-time alerts for suspicious activities and initiate appropriate remediation measures.", image: "path/to/step1-image.jpg", }
        ]
    };

    const keyFeatures = {
        title: "Key Features of Our Fraud Detection and Prevention Solutions",
        items: [
            { title: "Advanced Analytics", content: "Harness the power of advanced analytics to uncover fraudulent patterns and trends.", icon: <AiOutlineBarChart size={30} /> },
            { title: "Machine Learning Algorithms", content: "Deploy machine learning algorithms to detect and adapt to evolving fraud tactics.", icon: <AiOutlineRobot size={30} /> },
            { title: "Real-time Monitoring", content: "Monitor transactions and activities in real-time to detect and respond to fraud as it occurs.", icon: <BsClockHistory size={30} /> },
            { title: "Customizable Rules Engine", content: "Create and customize rules and thresholds to align with your organization's risk tolerance and compliance requirements.", icon: <AiOutlineSetting size={30} /> },
            { title: "Fraud Investigation Tools", content: "Access tools and dashboards for conducting detailed fraud investigations and root cause analysis.", icon: <BiSearchAlt2 size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Using Our Fraud Detection and Prevention Solutions",
        content: "Our Fraud Detection and Prevention solutions offer numerous benefits, including:",
        items: [
            "Early detection of fraudulent activities",
            "Reduction in financial losses and reputational damage",
            "Enhanced regulatory compliance and risk management",
            "Improved operational efficiency and cost savings",
            "Greater confidence and trust among stakeholders"
        ]
    };

    const useCases = {
        title: "Ideal Use Cases for Fraud Detection and Prevention",
        items: [
            { title: "Financial Services", content: "Protect financial institutions from payment fraud, identity theft, and money laundering." },
            { title: "E-commerce", content: "Combat online fraud, including payment fraud, account takeovers, and fraudulent transactions." },
            { title: "Healthcare", content: "Prevent healthcare fraud, such as insurance fraud, prescription fraud, and billing fraud." },
            { title: "Government Agencies", content: "Safeguard government agencies from fraudulent activities, including procurement fraud and benefit fraud." }
        ]
    };

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "Implementing fraud detection tools from [Company Name] significantly reduced our fraud losses and improved our fraud detection rates.", client: "Client 1" },
            { content: "The customizable rules engine allowed us to tailor fraud detection algorithms to our specific business needs, resulting in more accurate alerts and fewer false positives.", client: "Client 2" }
        ]
    };

    const callToAction = {
        title: "Protect Your Business from Fraud Today",
        content: "Contact us to learn more about how our Fraud Detection and Prevention solutions can safeguard your organization against fraudulent activities.",
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

export default FraudDetectionPage;
