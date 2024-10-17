import transcriptImage from "../../assets/transcription.jpeg"; // Update this with the correct image path
import { FaClipboard, FaClock, FaGlobe } from 'react-icons/fa'; // Import appropriate icons
import Footer from "@/components/layout/footer/Footer";

const NewTranscriptSummarization = () => {
    return (
        <section>
            <div className="max-w-screen-xl mx-auto md:p-0 p-3">
                {/* <Header/> */}
                <section className="flex items-center justify-between w-full md:flex-row flex-col">
                    <div className="my-5 md:my-24 md:pr-20 text-white md:w-1/2">
                        <div className="text-2xl md:text-3xl font-bold text-center md:text-left">
                            Professional Transcript Summarization Services
                        </div>
                        <p className="lg:text-lg font-normal my-8 text-center md:text-left">
                            We specialize in summarizing U.S. deposition transcripts and English-language court transcripts, providing clear and concise overviews that capture essential information and critical legal details.
                        </p>
                        <button className="mt-6 px-6 mx-auto md:mx-0 w-full md:w-auto py-3 bg-[#A100FF] text-white ">Learn More</button>
                    </div>
                    <img src={transcriptImage} alt="Transcript Summarization" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-top object-cover" />
                </section>

                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">Our Services</h2>
                    <div className="mt-10 space-y-10 max-w-full bg-gradient-to-t from-purple-800 to-blue-400 p-4 md:p-10 rounded-3xl  text-sm md:text-base">
                        <h3 className="font-semibold text-2xl">Narrative Summarization for U.S. Depositions</h3>
                        <p>We specialize in summarizing U.S. deposition transcripts, offering narrative summaries for depositions featuring one witness per 25-line page. Our AI tools condense the essential information, providing you with clear overviews of key points, testimonies, and statements.</p>
                        
                        <h3 className="font-semibold text-2xl">Narrative Summarization for English-Language Court Transcripts</h3>
                        <p>Our AI system can handle English-language court transcripts with variable line numbers (from 1-55 lines per page). Whether it’s a lengthy hearing or a brief proceeding, our narrative summaries provide a succinct breakdown of events and critical legal information.</p>
                        
                        <h3 className="font-semibold text-2xl">Page/Line Number Summarization for U.S. Depositions</h3>
                        <p>For U.S. depositions, we offer detailed page/line number summaries, capturing the most important details from each 25-line page. This method helps you quickly reference and locate specific sections of the transcript during case review.</p>
                        
                        <h3 className="font-semibold text-2xl">Page/Line Number Summarization for English-Language Court Transcripts</h3>
                        <p>We provide flexible page/line number summaries for English-language court transcripts with varying line numbers (1-55 per page). Our AI-driven approach ensures accuracy and consistency across different transcript formats, helping you manage complex legal documents with ease.</p>
                    </div>
                </section>

                <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                    <h2 className="text-2xl md:text-3xl font-bold">Why Choose Us</h2>
                    <div className="flex flex-wrap mt-10 gap-10 justify-center">
                        <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                            <div className="flex flex-col items-center gap-4">
                                <FaClipboard className="text-3xl text-[#A100FF]" />
                                <h3 className="text-xl font-semibold">AI-Powered Precision</h3>
                            </div>
                            <p className="text-sm md:text-base">Our AI summarization technology delivers fast, accurate summaries that help you cut down on review time without losing critical details.</p>
                        </div>
                        
                        <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                            <div className="flex flex-col items-center gap-4">
                                <FaClock className="text-3xl text-[#A100FF]" />
                                <h3 className="text-xl font-semibold">Tailored for Legal Needs</h3>
                            </div>
                            <p className="text-sm md:text-base">Whether you need narrative or page/line number summaries, our services are specifically designed to handle legal transcripts, ensuring that your case preparation is both efficient and effective.</p>
                        </div>
                        
                        <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                            <div className="flex flex-col items-center gap-4">
                                <FaGlobe className="text-3xl text-[#A100FF]" />
                                <h3 className="text-xl font-semibold">U.S. and Australian Coverage</h3>
                            </div>
                            <p className="text-sm md:text-base">We specialize in summarizing transcripts for U.S. depositions and English-language court transcripts, catering to both American and Australian legal professionals.</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </section>
    );
}

export default NewTranscriptSummarization;
