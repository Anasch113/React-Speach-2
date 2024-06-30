import PageLayout from "../../components/layout/pages-layout/PageLayout";
import img1 from "../../assets/transcript-sum1.jpg"
import img2 from "../../assets/hero-transcript.jpg"
import Wrapper from "../../components/layout/wrapper/Wrapper";
import { MdOutlineBrightness7 } from "react-icons/md";
import { TbMenuDeep, TbReportSearch } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GrIntegration } from "react-icons/gr";
const TranscriptSummarization = () => {
    const heroSection = {
        headline: "Efficient Transcription Summarizations and Analysis for Legal Cases",
        subheadline: "Transform Detailed Transcriptions into Actionable Insights",
        cta: "Learn More",
        image: img2,
    };

    const introduction = {
        title: "Why Choose Our Summarization and Analysis Services?",
        content: "In the fast-paced legal world, having quick access to summarized and analyzed transcription data can make a significant difference. Our services provide precise summaries and detailed analyses of legal transcriptions, ensuring you can focus on the critical aspects of your cases.",
        image: img1
    };

    const howItWorks = {
        title: "How Our Service Works",
        steps: [
            {id: 1, title: "Upload Your Transcripts", content: "Easily upload your audio or text transcriptions through our secure portal.", image: "path/to/step1-image.jpg" },
            {id: 2, title: "Automated Summarization", content: "Our AI technology processes and summarizes the transcriptions, highlighting key points and essential information.", image: "path/to/step2-image.jpg" },
            {id: 3, title: "Detailed Analysis", content: "Receive a comprehensive analysis of the transcription data, including trends, patterns, and actionable insights.", image: "path/to/step3-image.jpg" },
            {id: 4, title: "Download and Review", content: "Download the summarized and analyzed reports in various formats and review them at your convenience.", image: "path/to/step4-image.jpg" }
        ]
    };

    const features = {
        title: "Key Features of Our Summarization and Analysis Services",
        items: [
            { title: "Accurate Summarizations", content: "Get concise and accurate summaries of lengthy transcriptions, saving you valuable time.", icon:<MdOutlineBrightness7 size={30} /> },
            { title: "In-Depth Analysis", content: "Detailed analysis helps identify trends, key points, and important details relevant to your case.", icon: <TbMenuDeep size={30}/> },
            { title: "Customizable Reports", content: "Customize your reports to focus on specific aspects of the transcription that matter most to your case.", icon: <TbReportSearch size={30}/> },
            { title: "Secure and Confidential", content: "Your data is handled with the utmost security and confidentiality, ensuring compliance with legal standards.", icon: <RiSecurePaymentLine  size={30}/> },
            { title: "Easy Integration", content: "Seamlessly integrate our services with your existing legal practice management tools.", icon: <GrIntegration size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Using Our Services",
        content: "Our transcription summarization and analysis services provide numerous benefits for legal professionals, including:",
        items: [
            "Increased efficiency in case preparation.",
            "Enhanced ability to identify critical information quickly.",
            "Improved decision-making with actionable insights.",
            "Reduced time spent on manual transcription reviews.",
            "High accuracy and reliability of summaries and analyses."
        ],
        image: "path/to/benefits-image.jpg"
    };
    const useCases = null;

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "The summarization service has drastically reduced the time I spend on reviewing transcriptions. Highly recommend!", client: "Client 1", image: "path/to/testimonial1-image.jpg" },
            { content: "The analysis reports provide valuable insights that help me prepare for court cases more effectively.", client: "Client 2", image: "path/to/testimonial2-image.jpg" },
            { content: "The summarization service has drastically reduced the time I spend on reviewing transcriptions. Highly recommend!", client: "Client 1", image: "path/to/testimonial1-image.jpg" },
            { content: "The analysis reports provide valuable insights that help me prepare for court cases more effectively.", client: "Client 2", image: "path/to/testimonial2-image.jpg" },
            { content: "The summarization service has drastically reduced the time I spend on reviewing transcriptions. Highly recommend!", client: "Client 1", image: "path/to/testimonial1-image.jpg" },
            { content: "The analysis reports provide valuable insights that help me prepare for court cases more effectively.", client: "Client 2", image: "path/to/testimonial2-image.jpg" },
            { content: "The summarization service has drastically reduced the time I spend on reviewing transcriptions. Highly recommend!", client: "Client 1", image: "path/to/testimonial1-image.jpg" },
            { content: "The analysis reports provide valuable insights that help me prepare for court cases more effectively.", client: "Client 2", image: "path/to/testimonial2-image.jpg" },
        ]
    };

    const callToAction = {
        title: "Ready to Streamline Your Legal Workflow?",
        content: "Contact us today to learn more about how our transcription summarization and analysis services can benefit your legal practice.",
        cta: "Contact Us",
        image: "path/to/cta-image.jpg"
    };
    return (
        <div className="overflow-x-hidden">
        <Wrapper>
            <PageLayout
                heroSection={heroSection}
                introduction={introduction}
                howItWorks={howItWorks}
                features={features}
                benefits={benefits}
                testimonials={testimonials}
                callToAction={callToAction}
                useCases={useCases}
            />

        </Wrapper>

        </div>
    )
}

export default TranscriptSummarization