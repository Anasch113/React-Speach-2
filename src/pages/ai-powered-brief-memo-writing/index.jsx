import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import heroImage from "../../assets/ai-powered-writing-hero.jpeg";
import introImage from "../../assets/ai-powered-writing-intro.jpeg";
import { FaCog, FaPenAlt, FaCheckCircle, FaClock } from "react-icons/fa";

const AIPoweredWritingPage = () => {
    const heroSection = {
        headline: "Transform Your Legal Writing with AI",
        subheadline: "Effortlessly Generate High-Quality Briefs and Memos in Minutes",
        cta: "Learn More",
        image: heroImage,
    };

    const introduction = {
        title: "Elevate Your Legal Writing with AI Assistance",
        content: "Writing legal briefs and memos can be time-consuming and labor-intensive, but it doesn't have to be. Our AI-Powered Brief and Memo Writing services leverage advanced natural language processing algorithms to automate and streamline the writing process, enabling you to produce professional-quality documents quickly and efficiently.",
        image: introImage
    };

    const howItWorks = {
        title: "How Our AI-Powered Writing Works",
        steps: [
            { id: 1, title: "Input and Analysis", content: "Provide relevant case information, legal arguments, and research materials to the AI writing platform." },
            { id: 2, title: "AI Generation", content: "AI algorithms analyze the input data and generate draft briefs or memos based on legal templates and writing styles." },
            { id: 3, title: "Review and Editing", content: "Legal professionals review and edit the generated drafts to ensure accuracy, coherence, and compliance with legal standards." },
            { id: 4, title: "Finalization", content: "Finalize the documents and prepare them for submission or presentation to clients, colleagues, or the court." }
        ]
    };

    const keyFeatures = {
        title: "Key Features of Our AI-Powered Writing Services",
        items: [
            { title: "Automated Drafting", content: "Automate the drafting process with AI algorithms that generate coherent and well-structured briefs and memos.", icon: <FaCog size={30} /> },
            { title: "Customization Options", content: "Customize the AI writing process to suit your specific writing style, preferences, and formatting requirements.", icon: <FaPenAlt size={30} /> },
            { title: "Legal Accuracy", content: "Ensure legal accuracy and compliance with relevant laws, regulations, and judicial standards.", icon: <FaCheckCircle size={30} /> },
            { title: "Time and Cost Savings", content: "Save time and resources by reducing the manual effort and labor associated with legal writing tasks.", icon: <FaClock size={30} /> },
        ]
    };

    const benefits = {
        title: "Benefits of Using Our AI-Powered Writing Services",
        content: "Our AI-Powered Brief and Memo Writing services offer numerous benefits, including:",
        items: [
            "Efficiency: Generate high-quality legal documents quickly and efficiently, saving time and resources.",
            "Consistency: Ensure consistency in writing style, tone, and formatting across all your legal documents.",
            "Accuracy: Enhance the accuracy and precision of your legal writing with AI assistance.",
            "Scalability: Scale your writing capabilities to handle large volumes of briefs and memos with ease.",
            "Competitive Advantage: Gain a competitive edge by leveraging AI technology to produce superior-quality documents."
        ]
    };

    const useCases = {
        title: "Ideal Use Cases for AI-Powered Writing",
        items: [
            { title: "Case Briefs", content: "Generate case briefs summarizing key legal arguments, facts, and authorities for litigation or appellate matters." },
            { title: "Legal Memoranda", content: "Produce legal memoranda analyzing legal issues, providing legal advice, or supporting legal arguments." },
            { title: "Client Communications", content: "Draft client letters, opinions, or advisories with clear and concise legal analysis and recommendations." },
        ]
    };

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "The AI-generated briefs and memos provided by [Company Name] have been instrumental in streamlining our legal writing process and improving productivity.", client: "Client 1" },
            { content: "Thanks to [Company Name]'s AI writing services, we've been able to produce high-quality legal documents more efficiently and effectively than ever before.", client: "Client 2" }
        ]
    };

    const callToAction = {
        title: "Streamline Your Legal Writing Today",
        content: "Ready to revolutionize your legal writing process with AI assistance? Contact us now to learn more about our AI-Powered Brief and Memo Writing services.",
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

export default AIPoweredWritingPage;
