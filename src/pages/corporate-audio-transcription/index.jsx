import uploadImage from "../../assets/uploadImage.jpeg";
import aiTranscriptionImage from "../../assets/client-communication-hero.jpeg";
import formatImage from "../../assets/compliance-automation-hero.jpeg";
import { FaFileUpload, FaFileAlt, FaRobot, FaUserCheck, FaDesktop } from 'react-icons/fa';
import Footer from "@/components/layout/footer/Footer";
import { useNavigate } from "react-router-dom";
const CorporateAudioTranscription = () => {
    const navigate = useNavigate()
    return (
        <section>
            <div className="max-w-screen-xl mx-auto md:p-0 p-3 mt-10">
                {/* Header Section */}
                <section className="flex items-center justify-between w-full md:flex-row flex-col">
                    <div className="my-5 md:my-24 md:pr-20 text-white md:w-1/2">
                        <div className="text-3xl font-bold text-center md:text-left">
                            Audio Transcription Services for Government and Corporate Clients
                        </div>
                        <p className="lg:text-lg font-normal my-8 text-center md:text-left">
                            Our AI-powered online transcription application handles various file types, delivering fast and accurate transcripts. Clients can also request a human review for additional accuracy.
                        </p>
                        <button onClick={() => {
                            navigate("/contact-us")
                        }} className="mt-6 px-6 mx-auto md:mx-0 w-full md:w-auto py-3 bg-[#A100FF] text-white">
                            Contact
                        </button>
                    </div>
                    <img src={uploadImage} alt="Upload" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-bottom object-cover" />
                </section>

                {/* File Upload Section */}
                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">Upload & Transcription for Government and Corporate Audio Files</h2>
                    <p className="mt-4 text-sm md:text-base max-w-[800px]">
                        We support audio transcription for government and corporate clients, handling various file types including mp4 and mp3. Clients can upload up to 5 files at a time, with a maximum total size of 3 gigabytes.
                    </p>
                    <img src={aiTranscriptionImage} alt="AI Transcription" className="mt-6 rounded-2xl md:w-1/2 max-h-[480px] object-cover" />
                </section>

                {/* AI-Generated Transcription Section */}
                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">AI-Generated Transcription with Human Review Option</h2>
                    <p className="mt-4 text-sm md:text-base max-w-[800px]">
                        Our AI-powered transcription delivers fast, accurate results. If further refinement is needed, you can order a human review, and receive a final, precise version within 72 hours.
                    </p>
                    <img src={formatImage} alt="File Formats" className="mt-6 rounded-2xl md:w-1/2 max-h-[480px] object-cover" />
                </section>

                {/* Why Choose Us Section */}
                <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                    <h2 className="text-2xl md:text-3xl font-bold">Why Choose Us</h2>
                    <div className="flex flex-wrap mt-10 gap-10 justify-center">

                        {/* File Upload Flexibility */}
                        <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                            <div className="flex flex-col items-center gap-4">
                                <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                    <FaFileUpload className="text-white" />
                                </span>
                                <h3 className="text-xl font-semibold">File Upload Flexibility</h3>
                            </div>
                            <p className="text-sm md:text-base">
                                Our platform supports uploads of mp4, mp3, and FTR files, allowing up to 5 files or 3 gigabytes per batch.
                            </p>
                        </div>

                        {/* Multiple Output Formats */}
                        <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                            <div className="flex flex-col items-center gap-4">
                                <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                    <FaFileAlt className="text-white" />
                                </span>
                                <h3 className="text-xl font-semibold">Multiple Output Formats</h3>
                            </div>
                            <p className="text-sm md:text-base">
                                Once your transcript is ready for delivery, it’s available for download in various formats including Word (.docx), Plain Text (.txt), and PDF.
                            </p>
                        </div>

                        {/* AI-Powered Efficiency */}
                        <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                            <div className="flex flex-col items-center gap-4">
                                <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                    <FaRobot className="text-white" />
                                </span>
                                <h3 className="text-xl font-semibold">AI-Powered Efficiency</h3>
                            </div>
                            <p className="text-sm md:text-base">
                                Our AI transcription system provides quick, reliable transcripts, allowing your organization to process information faster and more efficiently.
                            </p>
                        </div>

                        {/* Human Review Option */}
                        <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                            <div className="flex flex-col items-center gap-4">
                                <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                    <FaUserCheck className="text-white" />
                                </span>
                                <h3 className="text-xl font-semibold">Secure Data Handling</h3>
                            </div>
                            <p className="text-sm md:text-base">
                                Our platform offers clients the option, on competion of their project, to delete all files - giving ultimate peace of mind that no data is accessible by third parties.

                            </p>
                        </div>

                        {/* User-Friendly Interface */}
                        <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                            <div className="flex flex-col items-center gap-4">
                                <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                    <FaDesktop className="text-white" />
                                </span>
                                <h3 className="text-xl font-semibold">User-Friendly Interface</h3>
                            </div>
                            <p className="text-sm md:text-base">
                                Our platform offers an intuitive interface for uploading, reviewing, and downloading your transcripts quickly and easily.
                            </p>
                        </div>

                    </div>
                </section>
            </div>
            <Footer />
        </section>
    );
};

export default CorporateAudioTranscription;
