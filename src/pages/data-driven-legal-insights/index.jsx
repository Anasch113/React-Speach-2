import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import heroImage from "../../assets/data-driven-legal-insights-hero.jpeg";
import introImage from "../../assets/data-driven-legal-insights-intro.jpeg";
import { FaDatabase, FaChartBar, FaLaptopCode, FaBell, FaSyncAlt } from "react-icons/fa";

const DataDrivenLegalInsightsPage = () => {
    const heroSection = {
        headline: "Harnessing Data for Legal Success",
        subheadline: "Unlock Actionable Insights to Drive Better Legal Outcomes",
        cta: "Learn More",
        image: heroImage,
    };

    const introduction = {
        title: "Empower Your Legal Practice with Data-Driven Insights",
        content: "In today's digital age, data is a powerful asset that can transform the practice of law. Our Data-Driven Legal Insights services leverage advanced analytics and machine learning techniques to extract actionable insights from legal data, enabling you to make informed decisions, enhance efficiency, and deliver superior client service.",
        image: introImage
    };

    const howItWorks = {
        title: "How Our Data-Driven Legal Insights Work",
        steps: [
            { id: 1, title: "Data Collection", content: "Aggregate and organize legal data from diverse sources, including case law, statutes, regulations, and client documents." },
            { id: 2, title: "Data Analysis", content: "Apply advanced analytics and natural language processing techniques to analyze legal data and extract key insights." },
            { id: 3, title: "Insights Generation", content: "Generate actionable insights and trends from the analyzed legal data to inform legal strategies and decision-making." },
            { id: 4, title: "Application and Action", content: "Translate insights into actionable strategies and tactics to optimize legal outcomes and client satisfaction." }
        ]
    };

    const keyFeatures = {
        title: "Key Features of Our Data-Driven Legal Insights Services",
        items: [
            { title: "Comprehensive Data Coverage", content: "Access a wide range of legal data sources to gain comprehensive insights into legal trends and developments.", icon: <FaDatabase size={30} /> },
            { title: "Advanced Analytics", content: "Leverage cutting-edge analytics tools and techniques to extract meaningful insights from complex legal data.", icon: <FaChartBar size={30} /> },
            { title: "Customized Insights", content: "Receive tailored insights and recommendations based on your specific legal practice areas and client needs.", icon: <FaLaptopCode size={30} /> },
            { title: "Real-time Updates", content: "Stay informed with real-time updates and alerts on relevant legal developments and trends.", icon: <FaBell size={30} /> },
            { title: "Continuous Improvement", content: "Continuously refine and enhance insights through iterative analysis and feedback loops.", icon: <FaSyncAlt size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Using Our Data-Driven Legal Insights Services",
        content: "Our Data-Driven Legal Insights services offer numerous benefits, including:",
        items: [
            "Informed Decision-Making: Make strategic decisions based on data-driven insights and trends.",
            "Enhanced Efficiency: Streamline legal research and analysis processes with automated insights generation.",
            "Better Client Service: Provide clients with valuable insights and recommendations to address their legal needs effectively.",
            "Competitive Advantage: Stay ahead of the competition by leveraging data to drive innovation and excellence in legal practice."
        ]
    };

    const useCases = {
        title: "Ideal Use Cases for Data-Driven Legal Insights",
        items: [
            { title: "Litigation Strategy", content: "Optimize litigation strategies by analyzing case law, judge rulings, and jury verdicts to predict outcomes." },
            { title: "Contract Analysis", content: "Automate contract review and analysis processes to identify risks, trends, and opportunities." },
            { title: "Regulatory Compliance", content: "Stay compliant with changing regulations by monitoring and analyzing regulatory updates and enforcement actions." },
            { title: "Market Intelligence", content: "Gain insights into market trends, competitor strategies, and industry developments to inform business decisions." }
        ]
    };

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "The insights provided by [Company Name] have been invaluable in shaping our legal strategies and achieving favorable outcomes for our clients.", client: "Client 1" },
            { content: "Thanks to [Company Name]'s data-driven approach, we've been able to stay ahead of legal trends and provide proactive advice to our clients.", client: "Client 2" }
        ]
    };

    const callToAction = {
        title: "Gain a Competitive Edge with Data-Driven Insights",
        content: "Ready to harness the power of data for legal success? Contact us today to learn more about our Data-Driven Legal Insights services.",
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

export default DataDrivenLegalInsightsPage;
