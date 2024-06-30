import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import heroImage from "../../assets/jury-selection-hero.jpeg";
import introImage from "../../assets/jury-selection-intro.jpeg";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiOutlineLineChart } from "react-icons/ai";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { AiOutlineRadarChart } from "react-icons/ai";
import { BiCustomize } from "react-icons/bi";

const JurySelectionSentimentAnalysisPage = () => {
    const heroSection = {
        headline: "Optimize Your Jury Selection Process with Sentiment Analysis",
        subheadline: "Gain Insights into Juror Sentiments to Build a Winning Case",
        cta: "Request a Demo",
        image: heroImage,
    };

    const introduction = {
        title: "Unlock the Power of Sentiment Analysis for Jury Selection",
        content: "Jury selection is a critical aspect of trial strategy, and understanding the sentiments and biases of potential jurors can significantly impact case outcomes. Our Sentiment Analysis for Jury Selection tool utilizes advanced AI algorithms to analyze juror responses, social media activity, and public data, providing invaluable insights to help you build a persuasive case.",
        image: introImage
    };

    const howItWorks = {
        title: "How Sentiment Analysis for Jury Selection Works",
        steps: [
            { id: 1, title: "Data Collection", content: "Collect juror information, including demographic data, social media profiles, and survey responses.",  image: "path/to/step1-image.jpg", },
            { id: 2, title: "Sentiment Analysis", content: "Utilize AI-powered sentiment analysis algorithms to assess juror sentiments, attitudes, and potential biases.",  image: "path/to/step1-image.jpg", },
            { id: 3, title: "Data Visualization", content: "Visualize sentiment analysis results through intuitive dashboards and reports for easy interpretation.",  image: "path/to/step1-image.jpg", },
            { id: 4, title: "Decision Support", content: "Use insights from sentiment analysis to inform jury selection strategies and develop persuasive case narratives.",  image: "path/to/step1-image.jpg", }
        ]
    };

    const keyFeatures = {
        title: "Key Features of Sentiment Analysis for Jury Selection",
        items: [
            { title: "Juror Profiling", content: "Create detailed profiles of potential jurors based on demographic data, social media activity, and other public information.", icon: <AiOutlineUsergroupAdd size={30} /> },
            { title: "Sentiment Analysis Algorithms", content: "Leverage advanced AI algorithms to analyze juror sentiments, attitudes, and emotional responses.", icon: <AiOutlineLineChart size={30} /> },
            { title: "Bias Detection", content: "Detect potential biases and prejudices among potential jurors to mitigate risks during jury selection.", icon: <AiOutlineSafetyCertificate size={30} /> },
            { title: "Predictive Analytics", content: "Utilize predictive analytics to forecast juror behavior and attitudes during trial proceedings.", icon: <AiOutlineRadarChart size={30} /> },
            { title: "Customizable Reporting", content: "Generate customizable reports and visualizations to present sentiment analysis findings effectively.", icon: <BiCustomize size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Using Sentiment Analysis for Jury Selection",
        content: "Our Sentiment Analysis for Jury Selection tool offers numerous benefits, including:",
        items: [
            "Improved jury selection accuracy",
            "Enhanced understanding of juror sentiments and biases",
            "Increased efficiency in trial strategy development",
            "Mitigation of potential risks related to biased jurors",
            "Higher chances of building a persuasive case and achieving favorable outcomes"
        ]
    };

    const useCases = {
        title: "Ideal Use Cases for Sentiment Analysis for Jury Selection",
        items: [
            { title: "Civil Litigation", content: "Gain insights into juror sentiments and attitudes in civil litigation cases to develop compelling arguments." },
            { title: "Criminal Defense", content: "Identify potential biases among jurors in criminal defense cases to build effective defense strategies." },
            { title: "Personal Injury", content: "Assess juror sentiments related to personal injury claims to tailor arguments and maximize case value." },
            { title: "Corporate Litigation", content: "Utilize sentiment analysis to understand juror perceptions in corporate litigation matters and minimize risks." }
        ]
    };

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "Sentiment analysis revolutionized our jury selection process, allowing us to identify and exclude biased jurors effectively.", client: "Client 1" },
            { content: "The insights from sentiment analysis helped us develop a winning trial strategy and secure a favorable verdict for our client.", client: "Client 2" }
        ]
    };

    const callToAction = {
        title: "Ready to Optimize Your Jury Selection Process?",
        content: "Request a demo today to see how our Sentiment Analysis for Jury Selection tool can help you build a winning case.",
        cta: "Request Demo",
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

export default JurySelectionSentimentAnalysisPage;
