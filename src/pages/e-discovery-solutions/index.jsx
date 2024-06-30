
import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdFreeBreakfast } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { BiNetworkChart } from "react-icons/bi";
import { GrDocumentTime } from "react-icons/gr";
import hero from "../../assets/e-discovery-hero.jpeg";
import intro from "../../assets/e-discovery-intro.jpeg";
const EDiscoveryPage = () => {
  const heroSection = {
    headline: "Revolutionize Your E-Discovery Process with Advanced Technology",
    subheadline:
      "Uncover Insights and Streamline Your Workflow with AI-Powered E-Discovery Solutions",
    cta: "Get Started Today",
    image: hero,
  };

  const introduction = {
    title: "Transform E-Discovery with Cutting-Edge Solutions",
    content:
      "In today’s digital age, managing vast amounts of electronic data for legal cases can be daunting. Our e-discovery solutions leverage AI technology to streamline the discovery process, ensuring efficiency, accuracy, and compliance. Discover how our advanced tools can enhance your e-discovery workflow.",
    image: intro,
  };

  const howItWorks = {
    title: "How Our E-Discovery Solutions Work",
    steps: [
      {
        id:1,
        title: " Data Collection",
        content:
          "Easily collect and preserve electronic data from various sources, ensuring data integrity and chain of custody.",
        image: "path/to/step1-image.jpg",
      },
      {
        id:2,
        title: "Data Processing",
        content:
          "Our advanced AI engine processes the collected data, identifying relevant information and filtering out noise.",
        image: "path/to/step2-image.jpg",
      },
      {
        id:3,
        title: "Data Review",
        content:
          "Review the processed data with our intuitive interface, using powerful search and analysis tools to uncover key insights.",
        image: "path/to/step3-image.jpg",
      },
      {
        id:4,
        title: "Data Production",
        content:
          "Easily produce the relevant data in the required format for legal proceedings, ensuring compliance with regulatory standards.",
        image: "path/to/step4-image.jpg",
      },
    ],
  };

  const features = {
    title: "Key Features of Our E-Discovery Solutions",
    items: [
      {
        title: "Comprehensive Data Collection",
        content:
          "Collect data from various electronic sources, including emails, documents, social media, and more.",
        icon: <MdFreeBreakfast size={30} />,
      },
      {
        title: "Advanced Data Processing",
        content:
          "Utilize AI-powered algorithms to process large volumes of data, identifying relevant information quickly and accurately.",
        icon: <AiOutlineFileSearch size={30} />,
      },
      {
        title: "Powerful Search and Analysis",
        content:
          "Leverage advanced search and analysis tools to uncover key insights and relevant information efficiently.",
        icon: <RiComputerLine size={30} />,
      },
      {
        title: "Automated Data Categorization",
        content:
          "Automatically categorize and tag data, making it easier to organize and review.",
        icon: <GrDocumentTime size={30} />,
      },
      {
        title: "Secure Data Management",
        content:
          "Ensure the security and integrity of your data with our robust encryption and compliance measures.",
        icon: <BiNetworkChart size={30} />,
      },
    ],
  };

  const benefits = {
    title: "Benefits of Using Our E-Discovery Solutions",
    content:
      "Our e-discovery solutions offer numerous benefits, including:",
    items: [
      "Increased efficiency in data collection and processing.",
      "Enhanced accuracy with AI-driven identification of relevant data.",
      "Streamlined review process with powerful search and analysis tools.",
      "Improved compliance with secure data management and production.",
      "Significant time and cost savings on manual e-discovery tasks.",
    ],
    image: "path/to/benefits-image.jpg",
  };

  const useCases = {
    title: "Ideal Use Cases for E-Discovery Solutions",
    items: [
      {
        title: "Litigation Support",
        content:
          "Streamline the discovery process in litigation, ensuring you have all the necessary data for your case.",
        image: "path/to/litigation-support-image.jpg",
      },
      {
        title: "Regulatory Compliance",
        content:
          "Ensure compliance with regulatory requirements by efficiently managing and producing electronic data.",
        image: "path/to/compliance-dashboard-image.jpg",
      },
      {
        title: "Internal Investigations",
        content:
          "Conduct thorough internal investigations with comprehensive data collection and analysis tools.",
        image: "path/to/investigator-review-image.jpg",
      },
      {
        title: "Mergers and Acquisitions",
        content:
          "Facilitate due diligence in M&A transactions by quickly identifying relevant data.",
        image: "path/to/due-diligence-image.jpg",
      },
    ],
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
    title: "Ready to Transform Your E-Discovery Process?",
    content:
      "Contact us today to learn more about how our e-discovery solutions can benefit your legal practice.",
    cta: "Contact Us",
    image: "path/to/contact-us-image.jpg",
  };

  return (
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
  );
};

export default EDiscoveryPage;
