import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import hero from "../../assets/real-time.png";
import intro from "../../assets/intro-real.jpg";
import useCase from "../../assets/usecase-real.jpg";
import { CgTranscript } from "react-icons/cg";
import { MdOutlineHighlight } from "react-icons/md";
import { TbBoxMultiple } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GrIntegration } from "react-icons/gr";

const RealTranscript = () => {
    const heroSection = {
        headline: "Real-Time Transcription Services for Legal Professionals",
        subheadline: "Accurate and Instantaneous Transcriptions for Courtrooms and Legal Proceedings",
        cta: "Get Started",
        image: hero,
    };

    const introduction = {
        title: "Experience the Power of Real-Time Transcription",
        content: "In the legal world, every word matters. Our real-time transcription service ensures that you capture every detail of your legal proceedings accurately and instantly. Whether you're in a courtroom, during a deposition, or in a legal meeting, our advanced technology provides immediate and precise transcriptions.",
        image: intro
    };

    const howItWorks = {
        title: "How Our Real-Time Transcription Service Works",
        steps: [
            {id:1, title: "Set Up Your Device", content: "Easily set up our service on your laptop, tablet, or smartphone. No special equipment needed.", image: "path/to/step1-image.jpg" },
            {id:2, title: "Start Your Session", content: "Start your legal proceeding and let our AI-powered service handle the transcription in real-time.", image: "path/to/step2-image.jpg" },
            {id:3, title: "Instant Access to Transcripts", content: "Receive immediate access to accurate transcripts, allowing you to follow along and review in real-time.", image: "path/to/step3-image.jpg" }
        ]
    };

    const features = {
        title: "Key Features of Our Real-Time Transcription Service",
        items: [
            { title: "Immediate Transcription", content: "Get real-time transcriptions as the proceedings happen, ensuring you never miss a word.", icon: <CgTranscript  size={30} />  },
            { title: "High Accuracy", content: "Our advanced AI technology guarantees high accuracy, even in fast-paced legal environments.", icon: <MdOutlineHighlight size={30} /> },
            { title: "Multiple Device Support", content: "Access real-time transcriptions on any device – be it a laptop, tablet, or smartphone.", icon: <TbBoxMultiple size={30} /> },
            { title: "Secure and Confidential", content: "Our service ensures that all transcriptions are secure and confidential, complying with legal standards.", icon: <RiSecurePaymentLine  size={30}/> },
            { title: "Integration with Legal Tools", content: "Seamlessly integrate our transcription service with your existing legal software and tools.", icon: <GrIntegration size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Real-Time Transcription for Legal Professionals",
        content: "Our real-time transcription service offers numerous benefits, including:",
        items: [
            "Enhanced efficiency in courtrooms and legal meetings.",
            "Immediate access to transcripts for review and analysis.",
            "Reduction in time spent on manual note-taking.",
            "High accuracy ensuring every detail is captured.",
            "Improved collaboration with instant sharing of transcriptions."
        ],
        image: "path/to/benefits-image.jpg"
    };

    const useCases = {
        title: "Ideal Use Cases for Real-Time Transcription",
        items: [
            { title: "Courtroom Proceedings", content: "Capture every detail of courtroom proceedings in real-time, facilitating immediate review and decision-making.", image: useCase, }
        ]
    };

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
        <div>
            <Wrapper>
                <PageLayout
                    heroSection={heroSection}
                    introduction={introduction}
                    howItWorks={howItWorks}
                    features={features}
                    benefits={benefits}
                    useCases={useCases}
                    testimonials={testimonials}
                    callToAction={callToAction}
                />
            </Wrapper>
        </div>
    )
}

export default RealTranscript