import { FaTag, FaSyncAlt, FaBriefcase, FaUpload } from 'react-icons/fa'; // Import necessary icons
import meetingImage from "../../assets/meeting.jpeg"; // Image for the main section
import flexx from "../../assets/flexvir.jpeg"; // Image for the main section
import aiCaptioning from "../../assets/aiCaptioning.jpeg"; // Image for the main section
import Footer from '@/components/layout/footer/Footer';

const MeetingNote = () => {
    return (
        <div className=''>
            <section>
                <div className="max-w-screen-xl mx-auto md:p-0 p-3">
                    {/* Introduction Section */}
                    <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                        <div className='flex gap-10 w-full justify-between items-center md:flex-row flex-col md:text-left'>
                            <div className='md:w-1/2'>
                                <p className="text-xl mt-6 max-w-4xl md:text-3xl font-bold">
                                    Voice Recording and Live Transcription for Government and Corporate Meetings
                                </p>
                                <p className="text-base md:text-lg mt-4 max-w-4xl">
                                    Our File Note function enhances productivity during your meetings by recording discussions in mp3 format while generating live transcripts in real-time. With the option to choose either U.S. or Australian spelling, our service ensures your transcripts are customized to your preferences. Speaker diarization makes it easy to identify who said what during the conversation, simplifying follow-up and decision-making.
                                </p>
                            </div>
                            <img src={meetingImage} alt="Meeting Recording" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-cover" />
                        </div>
                    </section>
                    <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                        <div className='flex gap-10 w-full justify-between items-center md:flex-row-reverse flex-col md:text-left'>
                            <div className='md:w-1/2'>
                                <p className="text-xl mt-6 max-w-4xl md:text-3xl font-bold">
                                    AI-Powered Meeting Summaries and Insights
                                </p>
                                <p className="text-base md:text-lg mt-4 max-w-4xl">
                                    At the end of each recording, our General Notes feature generates a concise, AI-powered summary. In addition to recapping the meeting, it provides actionable steps, highlights key insights, and delivers everything straight to your email. Stay prepared for the next steps with clear documentation and AI-driven recommendations tailored to your spelling preferences.                                </p>
                            </div>
                            <img src={flexx} alt="Meeting Recording" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-cover" />
                        </div>
                    </section>
                    <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                        <div className='flex gap-10 w-full justify-between items-center md:flex-row flex-col md:text-left'>
                            <div className='md:w-1/2'>
                                <p className="text-xl mt-6 max-w-4xl md:text-3xl font-bold">
                                    Flexible for In-Person and Virtual Meetings
                                </p>
                                <p className="text-base md:text-lg mt-4 max-w-4xl">
                                    Whether your meetings are in person or virtual via platforms like Zoom, our voice recording and transcription service works seamlessly in both environments. You receive real-time transcription with the option to select U.S. or Australian spelling, along with insightful AI summaries for accurate and consistent documentation.                                </p>
                            </div>
                            <img src={aiCaptioning} alt="Meeting Recording" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-cover" />
                        </div>
                    </section>

                    {/* Why Choose Us Section */}
                    <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                        <h2 className="text-2xl md:text-3xl font-bold">Why Choose Us</h2>
                        <div className="flex flex-wrap mt-10 gap-10 justify-center">

                            {/* Real-Time Transcription */}
                            <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                        <FaSyncAlt className="text-white" />
                                    </span>
                                    <h3 className="text-xl font-semibold">Real-Time Transcription</h3>
                                </div>
                                <p className="text-sm md:text-base">
                                    Capture every word in real time with our transcription service, giving you instant access to a full transcript in your choice of U.S. or Australian spelling.
                                </p>
                            </div>

                            {/* Speaker Diarization */}
                            <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                        <FaTag className="text-white" />
                                    </span>
                                    <h3 className="text-xl font-semibold">Speaker Diarization</h3>
                                </div>
                                <p className="text-sm md:text-base">
                                    Identify who is speaking throughout the transcript with our speaker diarization feature for clear, organized documentation.
                                </p>
                            </div>

                            {/* AI-Powered Summaries and Insights */}
                            <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                        <FaBriefcase className="text-white" />
                                    </span>
                                    <h3 className="text-xl font-semibold">AI-Powered Summaries and Insights</h3>
                                </div>
                                <p className="text-sm md:text-base">
                                    Our General Notes feature not only summarizes the meeting but also offers actionable steps and AI-generated insights, delivered to your email with your preferred spelling.
                                </p>
                            </div>

                            {/* Support for In-Person and Virtual Meetings */}
                            <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                        <FaUpload className="text-white" />
                                    </span>
                                    <h3 className="text-xl font-semibold">Support for In-Person and Virtual Meetings</h3>
                                </div>
                                <p className="text-sm md:text-base">
                                    Enjoy the same high level of transcription accuracy, whether your meetings are conducted in person or virtually over Zoom.
                                </p>
                            </div>

                            {/* Effortless Documentation */}
                            <div className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">
                                        <FaBriefcase className="text-white" />
                                    </span>
                                    <h3 className="text-xl font-semibold">Effortless Documentation</h3>
                                </div>
                                <p className="text-sm md:text-base">
                                    Let our General Notes features handle all your documentation needs, so you can focus on the key objectives of your meetings.
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

export default MeetingNote;
