import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import heroImage from "../../assets/litigation-cost-management-hero.jpeg";
import introImage from "../../assets/litigation-cost-management-intro.jpeg";
import { FaDollarSign, FaClipboardList, FaCheckCircle, FaBalanceScale } from "react-icons/fa";

const LitigationCostManagementPage = () => {
    const heroSection = {
        headline: "Optimize Your Legal Budgets with Effective Cost Management",
        subheadline: "Achieve Greater Efficiency and Control Over Litigation Expenses",
        cta: "Learn More",
        image: heroImage,
    };

    const introduction = {
        title: "Strategically Manage Your Litigation Costs",
        content: "Litigation expenses can quickly escalate, impacting your firm's profitability and client satisfaction. Our Litigation Cost Management services provide comprehensive solutions to help you control costs, maximize efficiency, and achieve better outcomes for your clients.",
        image: introImage
    };

    const howItWorks = {
        title: "How Our Litigation Cost Management Works",
        steps: [
            { id: 1, title: "Cost Analysis", content: "Conduct a thorough analysis of your litigation expenses, including legal fees, court costs, discovery expenses, and more." },
            { id: 2, title: "Budgeting and Forecasting", content: "Develop detailed litigation budgets and forecasts to estimate costs accurately and plan accordingly." },
            { id: 3, title: "Expense Tracking", content: "Implement systems and processes to track and monitor litigation expenses in real-time, allowing for proactive cost management." },
            { id: 4, title: "Cost Reduction Strategies", content: "Identify opportunities for cost reduction and optimization through alternative fee arrangements, outsourcing, and technology solutions." }
        ]
    };

    const keyFeatures = {
        title: "Key Features of Our Litigation Cost Management Services",
        items: [
            { title: "Comprehensive Analysis", content: "Conduct in-depth analysis of all litigation-related expenses to identify areas for improvement.", icon: <FaClipboardList size={30} /> },
            { title: "Budget Development", content: "Develop detailed litigation budgets and forecasts to manage costs effectively and mitigate risks.", icon: <FaDollarSign size={30} /> },
            { title: "Real-time Tracking", content: "Track and monitor litigation expenses in real-time to stay within budget and identify cost overruns.", icon: <FaCheckCircle size={30} /> },
            { title: "Cost Reduction Strategies", content: "Implement cost-saving measures and strategies to optimize your litigation budget and improve profitability.", icon: <FaBalanceScale size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Using Our Litigation Cost Management Services",
        content: "Our Litigation Cost Management services offer numerous benefits, including:",
        items: [
            "Cost Savings: Identify opportunities to reduce litigation expenses and maximize cost-effectiveness.",
            "Budget Compliance: Stay within budget and avoid cost overruns with real-time expense tracking and monitoring.",
            "Improved Profitability: Enhance firm profitability by optimizing litigation budgets and controlling expenses.",
            "Client Satisfaction: Deliver value to your clients by providing transparent and efficient cost management solutions.",
            "Risk Mitigation: Minimize financial risks associated with litigation through proactive cost management strategies."
        ]
    };

    const useCases = {
        title: "Ideal Use Cases for Litigation Cost Management",
        items: [
            { title: "Large-scale Litigation", content: "Manage costs effectively for complex litigation matters involving multiple parties, jurisdictions, and issues." },
            { title: "Budget-conscious Clients", content: "Meet the cost expectations of budget-conscious clients while maintaining high-quality legal services." },
            { title: "Volume Litigation", content: "Handle high-volume litigation cases efficiently and cost-effectively with streamlined cost management processes." },
            { title: "Risk Management", content: "Mitigate financial risks associated with litigation by implementing proactive cost management strategies." },
        ]
    };

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "The cost management solutions provided by [Company Name] have been instrumental in optimizing our litigation budgets and achieving favorable outcomes for our clients.", client: "Client 1" },
            { content: "Thanks to [Company Name]'s expertise, we've been able to control litigation costs effectively and deliver exceptional value to our clients.", client: "Client 2" }
        ]
    };

    const callToAction = {
        title: "Take Control of Your Litigation Costs Today",
        content: "Ready to optimize your legal budgets and improve profitability? Contact us now to learn more about our Litigation Cost Management services.",
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

export default LitigationCostManagementPage
