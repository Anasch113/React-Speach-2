
import { FaFileUpload, FaFileAlt, FaRobot, FaUserCheck, FaCloudDownloadAlt } from 'react-icons/fa';
import Footer from "@/components/layout/footer/Footer";
import uploadImage from "../../assets/uploadImage.jpeg";  // Example images
import aiTranscriptionImage from "../../assets/client-communication-hero.jpeg";
import downloadFormatsImage from "../../assets/compliance-automation-hero.jpeg";
// import whyChooseUsImage from "../../assets/whyChooseUs.jpeg";

const AudioTranscription = () => {
    const whyChooseUs = [
        {
            id: 1,
            icon: <FaFileUpload />,
            title: 'File Upload Flexibility',
            paragraph: 'Our platform supports the upload of mp4, mp3, and FTR files, allowing up to 5 files or 3 gigabytes per batch for transcription.',
        },
        {
            id: 2,
            icon: <FaFileAlt />,
            title: 'Multiple Output Formats',
            paragraph: 'We provide downloadable transcripts in Word, text, PDF, and SRT formats, allowing flexibility for your legal needs.',
        },
        {
            id: 3,
            icon: <FaRobot />,
            title: 'AI-Powered Efficiency',
            paragraph: 'Our AI transcription system delivers quick and reliable transcripts, saving you time and allowing for faster case preparation.',
        },
        {
            id: 4,
            icon: <FaUserCheck />,
            title: 'Human Review Option',
            paragraph: 'For more complex transcripts, order a human review for added accuracy, and receive the refined transcript within 72 hours.',
        },
        {
            id: 5,
            icon: <FaCloudDownloadAlt />,
            title: 'Secure Data Handling Protocols',
            paragraph: 'Clients have the option, once their project is delivered, to delete all audio files and transcripts, at the click of a button – ensuring ultimate peace of mind that important data is kept secure and not accessible to third parties.'
        },
    ];

    return (
        <section>
            <div className="max-w-screen-xl mx-auto md:p-0 p-3">
                {/* Header Section */}
                <section className="flex items-center justify-between w-full md:flex-row flex-col">
                    <div className="my-5 md:my-24 md:pr-20 text-white md:w-1/2">
                        <div className="text-2xl md:text-3xl font-bold text-center md:text-left">
                            Upload & Transcription for Legal Audio Files
                        </div>
                        <p className="lg:text-lg font-normal my-8 text-center md:text-left">
                            We support audio transcription from various file types including mp4, mp3, and FTR recordings. Clients can upload up to 5 files at a time, with a maximum total size of 3 gigabytes. Our platform handles complex legal terminology and produces accurate transcripts that can be tailored to your spelling preferences—whether U.S. or Australian.
                        </p>
                    </div>
                    <img src={uploadImage} alt="File Upload" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-cover" />
                </section>

                {/* Transcription Features Section */}
                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">AI-Generated Transcription with Human Review Option</h2>
                    <p className="mt-4 text-sm md:text-base max-w-[800px]">
                        Our AI-powered transcription delivers accurate, quick results, and you have the flexibility to review the AI-generated text immediately. If you require further refinement, you can order a human review of the transcript. Our professional team will fine-tune the transcript, delivering a final, precise version within 72 hours, depending on the length of the recording.
                    </p>
                    <img src={aiTranscriptionImage} alt="AI Transcription" className="mt-6 rounded-2xl md:w-1/2 max-h-[480px] object-cover" />
                </section>

                {/* Download Formats Section */}
                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">Download in Multiple Formats</h2>
                    <p className="mt-4 text-sm md:text-base max-w-[800px]">
                        Once your transcript is ready, it’s available for download in various formats including Word (.docx), Plain Text (.txt), and PDF.
                    </p>
                    <img src={downloadFormatsImage} alt="Download Formats" className="mt-6 rounded-2xl md:w-1/2 max-h-[480px] object-cover" />
                </section>

                {/* Why Choose Us Section */}
                <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                    <h2 className="text-2xl md:text-3xl font-bold">Why Choose Us</h2>
                    <div className="flex flex-wrap mt-10 gap-10 justify-center">
                        {whyChooseUs.map((step) => (
                            <div key={step.id} className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">{step.icon}</span>
                                    <h3 className="text-xl font-semibold">{step.title}</h3>
                                </div>
                                <p className="text-sm md:text-base">{step.paragraph}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </section>
    );
};

export default AudioTranscription;
