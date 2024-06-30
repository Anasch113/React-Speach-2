import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import heroImage from "../../assets/ai-based-settlement-analysis-hero.jpeg";
import introImage from "../../assets/ai-based-settlement-analysis-intro.jpeg";
import { FaDatabase, FaBrain, FaRegChartBar, FaCogs } from "react-icons/fa";

const AiBasedSettlementAnalysisPage = () => {
    const heroSection = {
        headline: "Unlock Insights for Optimal Settlements",
        subheadline: "Leverage AI Technology to Evaluate Settlement Options with Confidence",
        cta: "Learn More",
        image: heroImage,
    };

    const introduction = {
        title: "Make Informed Settlement Decisions with AI",
        content: "Negotiating settlements requires a careful assessment of legal, financial, and strategic considerations. Our AI-Based Settlement Analysis services harness the power of artificial intelligence to analyze relevant factors, predict outcomes, and provide actionable insights, empowering you to negotiate optimal settlements for your clients.",
        image: introImage
    };

    const howItWorks = {
        title: "How Our AI-Based Settlement Analysis Works",
        steps: [
            { id: 1, title: "Data Collection", content: "Collect relevant case data, including legal precedents, court decisions, case facts, and financial information." },
            { id: 2, title: "AI Analysis", content: "Utilize advanced AI algorithms to analyze the collected data and identify patterns, trends, and potential outcomes." },
            { id: 3, title: "Outcome Prediction", content: "Predict likely settlement outcomes based on the analysis of historical data and case-specific factors." },
            { id: 4, title: "Strategic Recommendations", content: "Provide strategic recommendations and negotiation tactics based on AI-generated insights to optimize settlement results." }
        ]
    };

    const keyFeatures = {
        title: "Key Features of Our AI-Based Settlement Analysis Services",
        items: [
            { title: "Data-driven Analysis", content: "Leverage data analytics and machine learning to analyze case data and generate actionable insights.", icon: <FaDatabase size={30} /> },
            { title: "Predictive Modeling", content: "Use predictive modeling techniques to forecast likely settlement outcomes and assess risk factors.", icon: <FaBrain size={30} /> },
            { title: "Customized Recommendations", content: "Tailor strategic recommendations and negotiation tactics to each case's unique circumstances and goals.", icon: <FaRegChartBar size={30} /> },
            { title: "Continuous Improvement", content: "Continuously refine and improve analysis models based on feedback and new data inputs.", icon: <FaCogs size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Using Our AI-Based Settlement Analysis Services",
        content: "Our AI-Based Settlement Analysis services offer numerous benefits, including:",
        items: [
            "Informed Decision-Making: Make strategic settlement decisions based on data-driven insights and predictions.",
            "Optimized Settlements: Negotiate optimal settlement terms and conditions to achieve the best outcomes for your clients.",
            "Risk Mitigation: Assess and mitigate risks associated with settlement negotiations through predictive modeling and analysis.",
            "Time and Cost Savings: Save time and resources by streamlining settlement analysis processes with AI technology.",
            "Client Satisfaction: Enhance client satisfaction by providing transparent and informed guidance throughout the settlement process."
        ]
    };

    const useCases = {
        title: "Ideal Use Cases for AI-Based Settlement Analysis",
        items: [
            { title: "Personal Injury Cases", content: "Evaluate settlement options for personal injury cases based on medical expenses, lost wages, and pain and suffering." },
            { title: "Commercial Disputes", content: "Analyze settlement opportunities for commercial disputes involving breach of contract, business torts, and damages claims." },
            { title: "Employment Litigation", content: "Assess settlement prospects for employment litigation matters, including discrimination, harassment, and wrongful termination claims." },
            { title: "Insurance Claims", content: "Predict likely settlement outcomes for insurance claims, including coverage disputes, liability assessments, and damage assessments." },
        ]
    };

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "The AI-generated insights provided by [Company Name] have been invaluable in negotiating favorable settlements for our clients.", client: "Client 1" },
            { content: "Thanks to [Company Name]'s AI-based analysis, we've been able to assess settlement risks and opportunities with greater clarity and confidence.", client: "Client 2" }
        ]
    };

    const callToAction = {
        title: "Negotiate Better Settlements with AI",
        content: "Ready to optimize your settlement negotiations with AI technology? Contact us now to learn more about our AI-Based Settlement Analysis services.",
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

export default AiBasedSettlementAnalysisPage;
