import legalvideo from "../../assets/filenotehero.jpeg";
import legalvideointro from "../../assets/poweredmeetingssum.jpeg";
import flexvir from "../../assets/flexvir.jpeg";
import { FaGavel, FaMicrophone, FaPaperclip, FaTruck } from 'react-icons/fa'; // Import new icons if needed
import Footer from "@/components/layout/footer/Footer";

const LegalVoiceRecording = () => {
    const whyChooseUs = [
        {
            id: 1,
            icon: <FaMicrophone />,
            title: 'Real-Time Transcription',
            paragraph: 'Our live transcription feature ensures that every word from your client meeting is captured as it happens, giving you immediate access to a full transcript.',
        },
        {
            id: 2,
            icon: <FaGavel />,
            title: 'Speaker Diarization',
            paragraph: 'Easily identify who is speaking with our speaker diarization functionality, which tags each speaker throughout the transcript for clarity.',
        },
        {
            id: 3,
            icon: <FaPaperclip />,
            title: 'AI-Powered Summaries and Insights',
            paragraph: 'Our General Notes function goes beyond basic transcription by summarizing the meeting, offering action steps, and delivering AI-generated insights to your email for easy access and review.',
        },
        {
            id: 4,
            icon: <FaTruck />,
            title: 'In-Person and Virtual Support',
            paragraph: 'Whether your client meetings are conducted in person or via Zoom, we offer the same level of transcription accuracy and efficiency.',
        },
        {
            id: 5,
            icon: <FaGavel />,
            title: 'Effortless Documentation',
            paragraph: 'Let our File Note and General Notes functions take care of your documentation, so you can focus on what matters most—your clients.',
        },
    ];

    return (
        <section>
            <div className="max-w-screen-xl mx-auto md:p-0 p-3">
                {/* Header Section */}
                <section className="flex items-center justify-between w-full md:flex-row flex-col">
                    <div className="my-5 md:my-24 md:pr-20 text-white md:w-1/2">
                        <div className="text-2xl md:text-3xl font-bold text-center md:text-left">
                        Client Interview Recording and Live Transcription

                        </div>
                        <p className="lg:text-lg font-normal my-8 text-center md:text-left">
                        Our File Note function makes client meetings more productive by recording your discussions in mp3 format while generating live transcripts in real-time. With speaker diarisation, it’s easy to identify who said what during the conversation, streamlining your workflow and record keeping.


                        </p>
                        <a href="/contact-us" className="mt-6 px-6 mx-auto md:mx-0 w-full md:w-auto py-3 bg-[#A100FF] text-white">Contact</a>
                    </div>
                    <img src={legalvideo} alt="" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-bottom object-cover" />
                </section>

                {/* Expertise Section */}
                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">AI-Powered Meeting Summaries and Insights</h2>
                    <p className="mt-4 text-sm md:text-base max-w-[800px]">
                        At the end of each recording, our General Notes feature generates a concise AI-powered summary. It doesn’t just recap the meeting—it offers action steps, highlights key insights, and sends everything directly to your email. This way, you’re always ready to take the next step with your client, backed by clear documentation and AI recommendations.
                    </p>
                    <img src={legalvideointro} alt="" className="mt-6 rounded-2xl md:w-1/2 max-h-[480px] object-cover" />
                </section>
                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">Flexible for In-Person and Virtual Meetings
                    </h2>
                    <p className="mt-4 text-sm md:text-base max-w-[800px]">
                    Whether you’re meeting with clients face-to-face or through Zoom, our legal voice recording and transcription service is designed to work smoothly in both environments. You get the same accurate, real-time transcription and insightful AI summaries, no matter how your meeting is conducted. (virtual meeting bot is currently available via Zoom platform only)

                    </p>
                    <img src={flexvir} alt="" className="mt-6 rounded-2xl md:w-1/2 max-h-[480px] object-cover" />
                </section>

                {/* Why Choose Us Section */}
                <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                    <h2 className="text-2xl md:text-3xl font-bold">Why Choose Us</h2>
                    <div className="flex flex-wrap mt-10 gap-10 justify-center">
                        {whyChooseUs.map((step) => (
                            <div key={step.id} className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">{step.id}</span>
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

export default LegalVoiceRecording;
