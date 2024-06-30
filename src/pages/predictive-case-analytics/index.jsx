import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import hero from "../../assets/predictive-case-hero.jpeg"
import intro from "../../assets/predictive-intro.jpeg"
import { MdOutlineBrightness7 } from "react-icons/md";
import { TbMenuDeep, TbReportSearch } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GrIntegration } from "react-icons/gr";


const PredictiveCase = () => {
    const heroSection = {
        headline: "Revolutionize Your Legal Practice with Predictive Case Analytics",
        subheadline: "Leverage Data-Driven Insights to Predict Case Outcomes and Strategize Effectively",
        cta: "Get Started",
        image: hero
    };

    const introduction = {
        title: "Harness the Power of Predictive Analytics in Legal Cases",
        content: "In the legal industry, understanding potential outcomes and formulating winning strategies is crucial. Our predictive case analytics service utilizes advanced machine learning algorithms to provide data-driven insights, helping legal professionals make informed decisions, anticipate challenges, and optimize their case strategies.",
        image: intro,
    };

    const howItWorks = {
        title: "How Predictive Case Analytics Works",
        steps: [
            { id: 1, title: "Input Case Data", content: "Input relevant case data, including historical case information, legal precedents, and other pertinent details.", image: "path/to/step1-image.jpg" },
            { id: 2, title: "Analyze Data with AI", content: "Our AI-powered system analyzes the data using sophisticated algorithms to identify patterns and predict outcomes.", image: "path/to/step2-image.jpg" },
            { id: 3, title: "Receive Predictive Insights", content: "Receive detailed predictive insights, including probable case outcomes, risk assessments, and strategic recommendations.", image: "path/to/step3-image.jpg" },
            { id: 4, title: "Implement Strategies", content: "Use the insights to develop effective case strategies, optimize resource allocation, and improve client advisement.", image: "path/to/step4-image.jpg" }
        ]
    };

    const features = {
        title: "Key Features of Our Predictive Case Analytics Service",
        items: [
            { title: "Accurate Outcome Predictions", content: "Predict case outcomes with high accuracy using advanced machine learning algorithms.", icon: <MdOutlineBrightness7 size={30} /> },
            { title: "Risk Assessment", content: "Identify potential risks and challenges, allowing you to mitigate them proactively.", icon: <TbMenuDeep size={30} /> },
            { title: "Strategic Recommendations", content: "Receive actionable recommendations to enhance your case strategy and increase your chances of success.", icon: <TbReportSearch size={30} /> },
            { title: "Historical Case Analysis", content: "Analyze historical case data to uncover trends and patterns that influence current case outcomes.", icon: <RiSecurePaymentLine size={30} /> },
            { title: "User-Friendly Dashboard", content: "Intuitive dashboard for easy navigation and analysis of predictive insights.", icon: <GrIntegration size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Predictive Case Analytics for Legal Professionals",
        content: "Our predictive case analytics service offers numerous benefits, including:",
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
        image: "path/to/cta-image.jpg" // Replace with your image path
    };

    return (
        <Wrapper>
            <PageLayout
                heroSection={heroSection}
                introduction={introduction}
                howItWorks={howItWorks}
                features={features}
                benefits={benefits}
                callToAction={callToAction}
            />

        </Wrapper>
    );
};

export default PredictiveCase;
