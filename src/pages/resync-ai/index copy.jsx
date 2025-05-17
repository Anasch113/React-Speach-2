import { FaTag, FaSyncAlt, FaBriefcase, FaUpload } from 'react-icons/fa'; // Import necessary icons
import transcription from "../../assets/transcription.jpeg"
import Footer from '@/components/layout/footer/Footer';
const ResyncAI = () => {
    return (
        <div className=''>
            <section>
                <div className="max-w-screen-xl mx-auto md:p-0 p-3">
                    {/* Introduction Section */}
                    <section className="text-white md:px-4 text-center py-12 flex justify-center items-center  flex-col">
                        <div className='flex gap-10 w-full justify-between items-center md:flex-row flex-col  md:text-left'>
                            <div className=' md:w-1/2'>
                                <p className="text-xl  mt-6 max-w-4xl md:text-3xl font-bold">
                                    Transcript-to-Video Syncing with One-Line SRT Output
                                </p>
                                <p className="text-base md:text-lg mt-4 max-w-4xl">
                                    Our syncing service enables you to align completed or edited transcripts with mp4 recordings, producing a one-line SRT output. This feature is currently in beta and available at a 50% discounted rate, providing a low-cost solution to integrate text and video seamlessly.
                                </p>

                            </div>
                            <img src={transcription} alt="Onsite CART" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-cover" />

                        </div>

                    </section>

                    {/* Features Section */}
                    <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                        <h2 className="text-2xl md:text-3xl font-bold">Key Features</h2>
                        <div className="flex flex-wrap mt-10 gap-10 justify-center">

                            {/* Easy-to-Use Platform */}
                            <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                        <FaUpload className="text-white" />
                                    </span>
                                    <h3 className="text-xl font-semibold">Easy-to-Use Platform</h3>
                                </div>
                                <p className="text-sm md:text-base">
                                    Clients can simply upload their mp4 recordings and finalized transcripts to our platform, and we handle the rest. Once syncing is complete, the SRT file is ready for download.
                                </p>
                            </div>

                            {/* Ideal for Legal, Corporate, and Media Use */}
                            <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                        <FaBriefcase className="text-white" />
                                    </span>
                                    <h3 className="text-xl font-semibold">Ideal for Legal, Corporate, and Media Use</h3>
                                </div>
                                <p className="text-sm md:text-base">
                                    This service is especially beneficial for legal teams, corporate meetings, or media professionals needing synced video and captions for accurate playback.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Why Choose Us Section */}
                    <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                        <h2 className="text-2xl md:text-3xl font-bold">Why Choose Us</h2>
                        <div className="flex flex-wrap mt-10 gap-10 justify-center">

                            {/* Cost-Effective Beta Offering */}
                            <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                        <FaTag className="text-white" />
                                    </span>
                                    <h3 className="text-xl font-semibold">Cost-Effective Beta Offering</h3>
                                </div>
                                <p className="text-sm md:text-base">
                                    Our one-line SRT syncing service is currently in beta and available at a 50% discount, making it an affordable option for early adopters.
                                </p>
                            </div>

                            {/* Accurate Syncing */}
                            <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                        <FaSyncAlt className="text-white" />
                                    </span>
                                    <h3 className="text-xl font-semibold">Accurate Syncing</h3>
                                </div>
                                <p className="text-sm md:text-base">
                                    Ensure your mp4 recordings are synced with finalized transcripts for clear, accurate playback.
                                </p>
                            </div>

                            {/* Multiple Use Cases */}
                            <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                        <FaBriefcase className="text-white" />
                                    </span>
                                    <h3 className="text-xl font-semibold">Multiple Use Cases</h3>
                                </div>
                                <p className="text-sm md:text-base">
                                    Ideal for legal teams, content creators, corporate meetings, and media producers needing synchronized captions and video.
                                </p>
                            </div>

                            {/* Simple Upload and Download Process */}
                            <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                        <FaUpload className="text-white" />
                                    </span>
                                    <h3 className="text-xl font-semibold">Simple Upload and Download Process</h3>
                                </div>
                                <p className="text-sm md:text-base">
                                    Upload your transcript and video, and receive a synchronized SRT file ready for use.
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

export default ResyncAI;
