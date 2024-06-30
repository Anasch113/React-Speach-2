import {AiOutlineFileSearch} from "react-icons/ai"

import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import img1 from "../../assets/automated-legal-hero.jpeg"
import img2 from "../../assets/automated-intro.jpeg"
import { MdFreeBreakfast } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { BiNetworkChart } from "react-icons/bi";
import { GrDocumentTime } from "react-icons/gr";

const DocumentReviewPage = () => {
  const heroSection = {
    headline: "Optimize Your Legal Document Review with Advanced Analysis Tools",
    subheadline:
      "Streamline Your Workflow and Ensure Accuracy with AI-Powered Document Review and Analysis",
    cta: "Start Your Free Trial",
    image: img2,
  };

  const introduction = {
    title: "Revolutionize Document Review with AI-Driven Analysis",
    content:
      "In the legal industry, thorough and accurate document review is essential. Our document review and analysis service leverages AI technology to streamline the review process, ensuring accuracy, efficiency, and compliance. Discover how our advanced tools can transform your legal practice.",
    image: img1,
  };

  const howItWorks = {
    title: "How Our Document Review and Analysis Service Works",
    steps:  [
      {
        id: 1,
        title: "Upload Documents",
        content:
          "Easily upload your legal documents, including contracts, briefs, and discovery materials, to our secure platform.",
        image: "path/to/step1-image.jpg",
      },
      {
        id: 2,
        title: "AI-Powered Review",
        content:
          "Our advanced AI engine analyzes the documents, identifying key information, potential issues, and relevant clauses.",
        image: "path/to/step2-image.jpg",
      },
      {
        id: 3,
        title: "Detailed Analysis",
        content:
          "Receive detailed analysis reports, highlighting crucial information, risk areas, and compliance issues.",
        image: "path/to/step3-image.jpg",
      },
      {
        id: 4,
        title: "Actionable Insights",
        content:
          "Utilize our insights to make informed decisions, streamline workflows, and enhance document accuracy and compliance.",
        image: "path/to/step4-image.jpg",
      },
    ],
  };

  const features = {
    title: "Key Features of Our Document Review and Analysis Service",
    items:  [
      {
        title: "Comprehensive Document Analysis",
        content:
          "Analyze a wide range of legal documents, including contracts, leases, and regulatory filings, with our AI-powered tools.",
        icon: <MdFreeBreakfast size={30} />,
      },
      {
        title: "Clause and Risk Identification",
        content:
          "Identify critical clauses, potential risks, and compliance issues quickly and accurately.",
        icon: <AiOutlineFileSearch size={30} />,
      },
      {
        title: "Real-Time Collaboration",
        content:
          "Collaborate with your team in real-time, making notes, comments, and edits directly within the platform.",
        icon: <RiComputerLine size={30} />,
      },
      {
        title: "Customizable Workflows",
        content:
          "Create and customize workflows to suit your specific document review processes and requirements.",
        icon: <GrDocumentTime size={30} />,
      },
      {
        title: "User-Friendly Dashboard",
        content:
          "Navigate with ease using our intuitive, user-friendly dashboard designed for legal professionals.",
        icon: <BiNetworkChart size={30} />,
      },
    ],
  };

  const benefits = {
    title: "Benefits of Automated Document Review and Analysis",
    content:
      "Our document review and analysis service offers numerous benefits, including:",
      items:  [
      "Increased efficiency in reviewing and analyzing legal documents.",
      "Enhanced accuracy with AI-driven identification of key clauses and risks.",
      "Streamlined collaboration with real-time editing and commenting.",
      "Customized workflows to fit your unique document review needs.",
      "Improved compliance and risk management through detailed analysis.",
    ],
    image: "path/to/benefits-image.jpg",
  };

  const useCases = {
    title: "Ideal Use Cases for Document Review and Analysis",
    items: [
      {
        title: "Contract Review",
        content:
          "Streamline the review of contracts by quickly identifying key clauses and potential risks.",
        image: "path/to/contract-review-image.jpg",
      },
      {
        title: "Due Diligence",
        content:
          "Enhance due diligence processes with thorough and accurate document analysis.",
        image: "path/to/due-diligence-image.jpg",
      },
      {
        title: "Compliance Monitoring",
        content:
          "Ensure compliance with regulatory requirements by identifying and addressing potential issues in your documents.",
        image: "path/to/compliance-monitoring-image.jpg",
      },
      {
        title: "Litigation Support",
        content:
          "Support litigation efforts with detailed analysis of discovery materials and other legal documents.",
        image: "path/to/litigation-support-image.jpg",
      },
    ],
  };

  
  const callToAction = {
    title: "Ready to Enhance Your Document Review Process?",
    content:
      "Contact us today to learn more about how our document review and analysis service can benefit your legal practice.",
    cta: "Contact Us",
    image: "path/to/call-to-action-image.jpg",
  };
const testimonials = null;
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

export default DocumentReviewPage;
