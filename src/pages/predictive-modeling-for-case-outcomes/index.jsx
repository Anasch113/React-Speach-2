import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import heroImage from "../../assets/predictive-modeling-hero.jpeg";
import introImage from "../../assets/predictive-modeling-intro.jpeg";
import { FaCogs, FaChartLine, FaCheckCircle, FaClock} from "react-icons/fa";

const PredictiveModelingPage = () => {
    const heroSection = {
        headline: "Anticipate Your Legal Future",
        subheadline: "Leverage Data to Predict Case Outcomes with Confidence",
        cta: "Learn More",
        image: heroImage,
    };

    const introduction = {
        title: "Gain Insight, Make Informed Decisions",
        content: "Predictive modeling is revolutionizing the legal industry, enabling legal professionals to forecast case outcomes with unprecedented accuracy. Our Predictive Modeling for Case Outcomes services harness the power of data analytics and machine learning to provide valuable insights into potential case results, empowering you to make informed decisions and optimize your legal strategy.",
        image: introImage
    };

    const howItWorks = {
        title: "How Our Predictive Modeling Works",
        steps: [
            { id: 1, title: "Data Collection", content: "Collect relevant case data, including historical case outcomes, legal precedents, and case-specific variables." },
            { id: 2, title: "Data Analysis", content: "Apply advanced analytics and machine learning algorithms to analyze and extract patterns from the collected data." },
            { id: 3, title: "Model Development", content: "Develop predictive models tailored to specific legal practice areas and case types, incorporating key variables and factors." },
            { id: 4, title: "Outcome Prediction", content: "Use predictive models to forecast potential case outcomes based on the analysis of historical data and case characteristics." }
        ]
    };

    const keyFeatures = {
        title: "Key Features of Our Predictive Modeling Services",
        items: [
            { title: "Customized Models", content: "Develop customized predictive models tailored to your practice areas and case requirements.", icon: <FaCogs size={30} /> },
            { title: "Data-driven Insights", content: "Gain actionable insights into case outcomes based on data analysis and predictive modeling.", icon: <FaChartLine size={30} /> },
            { title: "Accuracy and Reliability", content: "Benefit from accurate and reliable predictions backed by advanced analytics and machine learning techniques.", icon: <FaCheckCircle size={30} /> },
            { title: "Continuous Improvement", content: "Continuously refine and improve predictive models based on feedback and new data inputs.", icon: <FaClock size={30} /> },
        ]
    };

    const benefits = {
        title: "Benefits of Using Our Predictive Modeling Services",
        content: "Our Predictive Modeling for Case Outcomes services offer numerous benefits, including:",
        items: [
            "Informed Decision-Making: Make strategic decisions confidently based on data-driven insights into potential case results.",
            "Optimized Legal Strategy: Develop and refine your legal strategy proactively to maximize your chances of success.",
            "Resource Allocation: Allocate resources effectively by focusing on cases with higher predicted success rates.",
            "Client Confidence: Instill confidence in your clients by providing them with realistic expectations and transparent communication.",
            "Time and Cost Savings: Save time and money by prioritizing cases with favorable predicted outcomes and avoiding unnecessary litigation."
        ]
    };

    const useCases = {
        title: "Ideal Use Cases for Predictive Modeling",
        items: [
            { title: "Litigation Strategy", content: "Optimize litigation strategies by forecasting case outcomes and adjusting legal tactics accordingly." },
            { title: "Settlement Negotiations", content: "Inform settlement negotiations by providing accurate predictions of potential case results." },
            { title: "Risk Assessment", content: "Assess and mitigate legal risks by identifying cases with higher probabilities of adverse outcomes." },
            { title: "Resource Allocation", content: "Allocate legal resources efficiently by prioritizing cases with more favorable predicted outcomes." }
        ]
    };

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "The predictive models provided by [Company Name] have been instrumental in shaping our legal strategy and achieving positive outcomes for our clients.", client: "Client 1" },
            { content: "Thanks to [Company Name]'s predictive modeling, we were able to anticipate case outcomes accurately and make strategic decisions that led to favorable results.", client: "Client 2" }
        ]
    };

    const callToAction = {
        title: "Unlock the Power of Predictive Modeling",
        content: "Ready to anticipate your legal future with confidence? Contact us today to learn more about our Predictive Modeling for Case Outcomes services.",
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

export default PredictiveModelingPage;
