import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import heroImage from "../../assets/expert-witness-matching-heroo.jpeg";
import introImage from "../../assets/expert-witness-matching-intro.jpeg";
import { FaUsers, FaCheckCircle, FaCogs, FaHandshake, FaLifeRing } from "react-icons/fa";

const ExpertWitnessMatchingPage = () => {
    const heroSection = {
        headline: "Find the Right Expert Witness for Your Case",
        subheadline: "Match Your Legal Needs with Top-notch Expertise",
        cta: "Learn More",
        image: heroImage,
    };

    const introduction = {
        title: "Effortlessly Secure Expert Testimony",
        content: "Choosing the right expert witness can be pivotal in winning your case. Our Expert Witness Matching services connect legal professionals with qualified experts in various fields, ensuring you have the specialized knowledge and insight needed to support your case effectively.",
        image: introImage
    };

    const howItWorks = {
        title: "How Our Expert Witness Matching Works",
        steps: [
            { id: 1, title: "Case Assessment", content: "Provide details about your case, including legal issues, required expertise, and geographic preferences." },
            { id: 2, title: "Expert Identification", content: "Utilize our extensive network and database to identify experts with relevant experience and qualifications." },
            { id: 3, title: "Matching and Evaluation", content: "Match your case requirements with potential expert witnesses and evaluate their suitability based on credentials and expertise." },
            { id: 4, title: "Engagement and Support", content: "Facilitate engagement between legal professionals and expert witnesses, providing ongoing support and coordination." }
        ]
    };

    const keyFeatures = {
        title: "Key Features of Our Expert Witness Matching Services",
        items: [
            { title: "Diverse Expertise", content: "Access a wide range of expert witnesses across various industries, specialties, and disciplines.", icon: <FaUsers size={30} /> },
            { title: "Quality Assurance", content: "Ensure the credibility and reliability of expert witnesses through rigorous vetting and evaluation processes.", icon: <FaCheckCircle size={30} /> },
            { title: "Customized Matching", content: "Receive personalized recommendations based on your specific case requirements and preferences.", icon: <FaCogs size={30} /> },
            { title: "Flexible Engagement", content: "Choose from different engagement models, including consulting, deposition, and trial testimony.", icon: <FaHandshake size={30} /> },
            { title: "Dedicated Support", content: "Receive dedicated support and assistance throughout the expert witness selection and engagement process.", icon: <FaLifeRing size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Using Our Expert Witness Matching Services",
        content: "Our Expert Witness Matching services offer numerous benefits, including:",
        items: [
            "Access to Specialized Expertise: Tap into a pool of qualified experts with specialized knowledge and experience.",
            "Improved Case Strategy: Enhance your case strategy with expert insights and testimony tailored to your legal needs.",
            "Time and Cost Savings: Save time and resources by outsourcing the search for expert witnesses to our experienced team.",
            "Enhanced Credibility: Bolster your case credibility and persuasiveness with credible and authoritative expert testimony.",
            "Peace of Mind: Rest assured knowing you have the right expertise on your side to support your case effectively."
        ]
    };

    const useCases = {
        title: "Ideal Use Cases for Expert Witness Matching",
        items: [
            { title: "Complex Litigation", content: "Secure expert witnesses for complex litigation matters requiring specialized technical or scientific knowledge." },
            { title: "Industry-specific Cases", content: "Find experts with industry-specific expertise for cases involving regulatory compliance, product liability, or intellectual property disputes." },
            { title: "Medical Malpractice", content: "Identify qualified medical experts for cases involving medical negligence, malpractice, or personal injury claims." },
            { title: "Construction Disputes", content: "Connect with construction and engineering experts for disputes involving defects, delays, or construction accidents." }
        ]
    };

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "The expert witness recommended by [Company Name] played a crucial role in supporting our case and securing a favorable outcome.", client: "Client 1" },
            { content: "Thanks to [Company Name]'s expertise, we were able to find the perfect expert witness to testify on behalf of our client, strengthening our case significantly.", client: "Client 2" }
        ]
    };

    const callToAction = {
        title: "Optimize Your Litigation Strategy Today",
        content: "Ready to enhance your litigation approach? Contact us now to learn more about our Expert Witness Matching services.",
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

export default ExpertWitnessMatchingPage;
