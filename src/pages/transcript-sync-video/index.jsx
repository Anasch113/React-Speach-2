import PageLayout from "../../components/layout/pages-layout/PageLayout";
import Wrapper from "../../components/layout/wrapper/Wrapper";
import hero from "../../assets/video-sync.jpeg"
import { MdOutlineBrightness7 } from "react-icons/md";
import { TbMenuDeep, TbReportSearch } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GrIntegration } from "react-icons/gr";

const TranscriptSyncVideo = () => {
    const heroSection = {
        headline: "Seamless Transcript Synchronization with Video for Legal Cases",
        subheadline: "Enhance Your Legal Proceedings with Accurate and Synchronized Transcripts",
        cta: "Get Started",
        image: hero,
      };
    
      const introduction = {
        title: "Transform Your Legal Practice with Synchronized Video Transcripts",
        content: "In the legal field, the accuracy and clarity of evidence are paramount. Our transcript synchronization service aligns your video recordings with transcriptions, providing a powerful tool for legal professionals. Whether it's for court proceedings, depositions, or client consultations, synchronized transcripts enhance understanding and efficiency.",
        image: "path/to/introduction-image.jpg"
      };
    
      const howItWorks = {
        title: "How Our Transcript Synchronization Service Works",
        steps: [
          {id: 1, title: "Upload Your Video and Transcript", content: "Upload your video recordings and corresponding transcripts through our secure portal.", image: "path/to/step1-image.jpg" },
          {id: 2, title: "Automated Synchronization", content: "Our advanced AI technology synchronizes the transcript with the video, ensuring precise alignment.", image: "path/to/step2-image.jpg" },
          {id: 3, title: "Review and Edit", content: "Review the synchronized video and transcript, making any necessary adjustments for accuracy.", image: "path/to/step3-image.jpg" },
          {id: 4, title: "Download and Share", content: "Download the synchronized video and transcript in your preferred format and share it with your legal team.", image: "path/to/step4-image.jpg" }
        ]
      };
    
      const features = {
        title: "Key Features of Our Transcript Synchronization Service",
        items: [
          { title: "Accurate Synchronization", content: "Our AI ensures precise alignment of transcripts with video, maintaining accuracy throughout.", icon:<MdOutlineBrightness7 size={30} />  },
          { title: "Time-Stamps and Annotations", content: "Easily add time-stamps and annotations to highlight important segments in your video.", icon: <TbMenuDeep size={30}/>},
          { title: "Multiple Formats Supported", content: "Supports various video and transcript formats, providing flexibility for your legal needs.", icon: <TbReportSearch size={30}/> },
          { title: "Secure and Confidential", content: "Our service ensures that all data is secure and confidential, complying with legal standards.", icon: <RiSecurePaymentLine  size={30}/> },
          { title: "User-Friendly Interface", content: "Intuitive interface allows for easy upload, synchronization, review, and download processes.", icon: <GrIntegration size={30} /> }
        ]
      };
    
      const benefits = {
        title: "Benefits of Synchronized Video Transcripts for Legal Professionals",
        content: "Our transcript synchronization service offers numerous benefits, including:",
        items: [
          "Enhanced clarity and comprehension of video evidence.",
          "Efficient review and analysis of legal proceedings.",
          "Improved accuracy in documenting testimonies and statements.",
          "Facilitation of collaborative efforts with easy sharing.",
          "Reduction in time spent on manual synchronization."
        ],
        image: "path/to/benefits-image.jpg"
      };
    
      const useCases = null;
    
      const testimonials = null;
    
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

export default TranscriptSyncVideo