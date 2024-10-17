import { FaGlobe, FaBuilding, FaRobot, FaFileAlt } from 'react-icons/fa'; // Import necessary icons
import flexx from "../../assets/flexvir.jpeg"; // Image for the main section
import transcriptImage from "../../assets/transcription.jpeg"
import Footer from '@/components/layout/footer/Footer';

const CorporateTranscriptSummarization = () => {
    return (
        <div className=''>
            <section>
                <div className="max-w-screen-xl mx-auto md:p-0 p-3">
                    {/* Introduction Section */}
                    <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                        <div className='flex gap-10 w-full justify-between items-center md:flex-row flex-col md:text-left'>
                            <div className='md:w-1/2'>
                                <p className="text-xl mt-6 max-w-4xl md:text-3xl font-bold">
                                    Narrative Summarization for Government and Corporate Transcripts
                                </p>
                                <p className="text-base md:text-lg mt-4 max-w-4xl">
                                    We specialize in summarizing government and corporate transcripts, offering narrative summaries for meetings, hearings, or other proceedings. Clients can choose between U.S. or Australian spelling, ensuring that the summaries are customized to your preferences. Our AI tools condense essential information, providing clear overviews of key discussions, decisions, and statements. Whether it’s an internal corporate meeting or a government hearing, our service helps you efficiently extract the most relevant points                                </p>
                            </div>
                            <img src={transcriptImage} alt="Meeting Recording" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-cover" />
                        </div>
                    </section>
                    <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                        <div className='flex gap-10 w-full justify-between items-center md:flex-row-reverse flex-col md:text-left'>
                            <div className='md:w-1/2'>
                                <p className="text-xl mt-6 max-w-4xl md:text-3xl font-bold">
                                    Page/Line Number Summarization for Government and Corporate Transcripts
                                </p>
                                <p className="text-base md:text-lg mt-4 max-w-4xl">
                                    For government and corporate proceedings, we offer detailed page/line number summaries, capturing the most important details from each page. This method allows you to quickly reference and locate specific sections of the transcript, making document review easier and more efficient.</p>
                            </div>
                            <img src={flexx} alt="Meeting Recording" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-cover" />
                        </div>
                    </section>


                    {/* Why Choose Us Section */}
                    <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                        <h2 className="text-2xl md:text-3xl font-bold">Why Choose Us</h2>
                        <div className="flex flex-wrap mt-10 gap-10 justify-center">

                            {/* AI-Powered Precision */}
                            <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                        <FaRobot className="text-white" /> {/* AI Icon */}
                                    </span>
                                    <h3 className="text-xl font-semibold">AI-Powered Precision</h3>
                                </div>
                                <p className="text-sm md:text-base">
                                    Our AI summarization technology delivers fast, accurate summaries that reduce review time while retaining critical details.
                                </p>
                            </div>

                            {/* Tailored for Government and Corporate Needs */}
                            <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                        <FaBuilding className="text-white" /> {/* Corporate Icon */}
                                    </span>
                                    <h3 className="text-xl font-semibold">Tailored for Government and Corporate Needs</h3>
                                </div>
                                <p className="text-sm md:text-base">
                                    Whether you require narrative or page/line number summaries, our services are designed to handle complex government and corporate transcripts efficiently.
                                </p>
                            </div>

                            {/* U.S. and Australian Coverage */}
                            <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                        <FaGlobe className="text-white" /> {/* Globe Icon */}
                                    </span>
                                    <h3 className="text-xl font-semibold">U.S. and Australian Coverage</h3>
                                </div>
                                <p className="text-sm md:text-base">
                                    We specialize in summarizing transcripts for both U.S. and Australian clients, ensuring that your summaries are tailored to regional and linguistic requirements.
                                </p>
                            </div>
                        {/* Adaptable for Various Transcripts */}
                        <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                            <div className="flex flex-col items-center gap-4">
                                <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                    <FaFileAlt className="text-white" /> {/* Document Icon */}
                                </span>
                                <h3 className="text-xl font-semibold">Adaptable for Various Transcripts</h3>
                            </div>
                            <p className="text-sm md:text-base">
                                Whether it’s a detailed government hearing or a corporate meeting, our AI summarization tools adapt to your specific needs, offering clarity and insight from even the most complex transcripts.
                            </p>
                        </div>
                        </div>
                    </section>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default CorporateTranscriptSummarization;
