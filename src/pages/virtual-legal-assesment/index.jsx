import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import hero from "../../assets/virtual-legal-hero.jpeg";
import intro from "../../assets/virtual-legal-intro.jpeg";
import { AiOutlineSolution } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import { AiOutlineRadarChart } from "react-icons/ai";
import { RiShieldCheckLine } from "react-icons/ri";
import { BiLineChart } from "react-icons/bi";

const VirtualLegalAssistancePage = () => {
    const heroSection = {
        headline: "Get Expert Legal Help, Anytime, Anywhere",
        subheadline: "Access On-Demand Legal Support with Our Virtual Assistance Services",
        cta: "Get Started",
        image: hero,
    };

    const introduction = {
        title: "Unlock the Power of Virtual Legal Assistance",
        content: "Our Virtual Legal Assistance services offer convenient and efficient support to legal professionals, enabling them to streamline their workflows, enhance productivity, and deliver better client service. Experience the benefits of having a dedicated virtual assistant at your fingertips, ready to assist with research, document preparation, scheduling, and more.",
        image: intro
    };

    const howItWorks = {
        title: "How Our Virtual Legal Assistance Works",
        steps: [
            { id: 1, title: "Sign Up", content: "Create an account and choose the virtual assistance plan that fits your needs.", image: "path/to/step1-image.jpg" },
            { id: 2, title: "Task Submission", content: "Submit your legal tasks and requests through our user-friendly platform.", image: "path/to/step2-image.jpg" },
            { id: 3, title: "Assignment to Virtual Assistant", content: "Our team assigns your tasks to a qualified virtual assistant with expertise in your practice area.", image: "path/to/step3-image.jpg" },
            { id: 4, title: "Completion and Delivery", content: "Receive completed tasks within the agreed-upon timeframe, ready for your review and use.", image: "path/to/step4-image.jpg" }
        ]
    };

    const features = {
        title: "Key Features of Our Virtual Legal Assistance Services",
        items: [
            { title: "Dedicated Virtual Assistants", content: "Work with dedicated virtual assistants who understand your practice area and requirements.", icon: <AiOutlineSolution size={30} /> },
            { title: "Flexible Task Management", content: "Submit tasks and requests on-demand, with flexible scheduling and turnaround times.", icon: <BsCardChecklist size={30} /> },
            { title: "Document Preparation", content: "Get assistance with document drafting, formatting, proofreading, and other administrative tasks.", icon: <AiOutlineRadarChart size={30} /> },
            { title: "Legal Research Support", content: "Access reliable legal research support for case law, statutes, regulations, and more.", icon: <RiShieldCheckLine size={30} /> },
            { title: "Calendar Management", content: "Efficiently manage your schedule with assistance in scheduling meetings, appointments, and deadlines.", icon: <BiLineChart size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Using Our Virtual Legal Assistance Services",
        content: "Our Virtual Legal Assistance services offer numerous benefits, including:",
        items: [
            "Increased productivity and efficiency",
            "Cost-effective support without the overhead of hiring full-time staff",
            "Access to specialized expertise and resources",
            "Flexibility to scale support based on workload and demand",
            "Enhanced work-life balance by offloading routine tasks and administrative burdens"
        ]
    };

    const useCases = {
        title: "Ideal Use Cases for Virtual Legal Assistance",
        items: [
            { title: "Solo Practitioners", content: "Solo practitioners can leverage virtual assistance to handle administrative tasks and focus on core legal work." },
            { title: "Small Law Firms", content: "Small law firms can augment their existing staff with virtual assistance to manage workload fluctuations." },
            { title: "In-House Legal Teams", content: "In-house legal teams can benefit from virtual assistance to support overflow work and special projects." },
            { title: "Corporate Counsel", content: "Corporate counsel can outsource routine legal tasks to virtual assistants, optimizing resource allocation." }
        ]
    };

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "The virtual assistants have been a game-changer for our firm, allowing us to handle more cases and deliver better client service.", client: "Client 1" },
            { content: "I can't imagine running my practice without the support of virtual legal assistance. It's like having an extra pair of hands whenever I need them.", client: "Client 2" }
        ]
    };

    const callToAction = {
        title: "Ready to Experience the Benefits of Virtual Legal Assistance?",
        content: "Sign up today to get started with our Virtual Legal Assistance services and take your practice to the next level.",
        cta: "Sign Up Now",
        image: "path/to/call-to-action-image.jpg"
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

export default VirtualLegalAssistancePage;
