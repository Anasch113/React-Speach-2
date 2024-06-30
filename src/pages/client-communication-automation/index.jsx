import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import heroImage from "../../assets/client-communication-hero.jpeg";
import introImage from "../../assets/client-communication-intro.jpeg";
import { FaEnvelope, FaUserFriends, FaClock, FaComment, FaChartLine } from "react-icons/fa";

const ClientCommunicationAutomationPage = () => {
    const heroSection = {
        headline: "Enhance Client Engagement with Automated Communication",
        subheadline: "Effortlessly Manage Client Relationships and Improve Satisfaction",
        cta: "Learn More",
        image: heroImage,
    };

    const introduction = {
        title: "Streamline Client Interactions with Automation",
        content: "Effective client communication is essential for building strong relationships and delivering exceptional legal services. Our Client Communication Automations leverage cutting-edge technology to automate routine communication tasks, allowing you to focus on providing personalized attention and strategic advice to your clients.",
        image: introImage
    };

    const howItWorks = {
        title: "How Our Client Communication Automations Work",
        steps: [
            { id: 1, title: "Client Data Integration", content: "Integrate client contact information, case details, and communication preferences into our automated system." },
            { id: 2, title: "Automated Messaging", content: "Automate routine client communications, such as appointment reminders, case updates, and deadline notifications." },
            { id: 3, title: "Personalization and Customization", content: "Tailor automated messages to each client's individual needs, preferences, and case status." },
            { id: 4, title: "Feedback and Analytics", content: "Collect client feedback and analyze communication performance metrics to continuously improve and optimize your client interactions." }
        ]
    };

    const keyFeatures = {
        title: "Key Features of Our Client Communication Automations",
        items: [
            { title: "Automated Messaging", content: "Automate routine client communications, such as appointment reminders, status updates, and document requests.", icon: <FaEnvelope size={30} /> },
            { title: "Personalization", content: "Tailor messages to each client's unique needs, preferences, and case circumstances for a personalized experience.", icon: <FaUserFriends size={30} /> },
            { title: "Multi-channel Communication", content: "Reach clients through their preferred communication channels, including email, text messaging, and client portals.", icon: <FaComment size={30} /> },
            { title: "Scheduling and Reminders", content: "Schedule appointments, meetings, and deadlines automatically and send timely reminders to clients.", icon: <FaClock size={30} /> },
            { title: "Feedback and Analytics", content: "Collect client feedback, track communication performance metrics, and gain insights for continuous improvement.", icon: <FaChartLine size={30} /> }
        ]
    };

    const benefits = {
        title: "Benefits of Using Our Client Communication Automations",
        content: "Our Client Communication Automations offer numerous benefits, including:",
        items: [
            "Improved Client Satisfaction: Enhance client experience with timely, personalized communication and support.",
            "Increased Efficiency: Save time and resources by automating routine communication tasks and administrative work.",
            "Better Engagement: Foster stronger client relationships and loyalty through consistent and proactive communication.",
            "Enhanced Productivity: Focus on high-value legal tasks and strategic client advice while automation handles routine communications.",
            "Data-driven Insights: Gain actionable insights from client feedback and communication analytics to optimize your practice."
        ]
    };

    const useCases = {
        title: "Ideal Use Cases for Client Communication Automations",
        items: [
            { title: "Client Onboarding", content: "Automate client intake processes, welcome messages, and onboarding instructions for new clients." },
            { title: "Case Updates", content: "Keep clients informed about case progress, court dates, and important deadlines through automated status updates." },
            { title: "Appointment Reminders", content: "Send automated appointment reminders and confirmations to reduce no-shows and scheduling conflicts." },
            { title: "Document Requests", content: "Automate requests for client documents, signatures, and information needed for case preparation." },
        ]
    };

    const testimonials = {
        title: "What Our Clients Say",
        items: [
            { content: "The automated communication system from [Company Name] has transformed our client interactions, improving satisfaction and efficiency.", client: "Client 1" },
            { content: "Thanks to [Company Name]'s automation tools, we've been able to provide timely updates and support to our clients, enhancing their overall experience.", client: "Client 2" }
        ]
    };

    const callToAction = {
        title: "Automate Your Client Communications Today",
        content: "Ready to streamline your client interactions and improve satisfaction? Contact us now to learn more about our Client Communication Automations.",
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

export default ClientCommunicationAutomationPage;
